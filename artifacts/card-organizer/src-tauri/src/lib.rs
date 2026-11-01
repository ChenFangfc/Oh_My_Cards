use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Mutex;
use std::time::{Duration, Instant};

use tauri::image::Image;
use tauri::menu::{Menu, MenuItem, MenuItemKind, PredefinedMenuItem};
use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
use tauri::window::{Effect, EffectState, EffectsBuilder};
use tauri::{
    AppHandle, Emitter, Manager, PhysicalPosition, Rect, RunEvent, WebviewUrl, WebviewWindow,
    WebviewWindowBuilder, WindowEvent, Wry,
};
use tauri_plugin_autostart::ManagerExt as _;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_global_shortcut::{GlobalShortcutExt, ShortcutState};
use tauri_plugin_updater::UpdaterExt;

const MAIN_WINDOW: &str = "main";
const QUICK_WINDOW: &str = "quick";
const TRAY_ID: &str = "menu-bar";
/// Logical size of the menu bar panel.
const QUICK_SIZE: (f64, f64) = (380.0, 560.0);
/// Gap between the menu bar and the panel, in points.
const QUICK_GAP: f64 = 6.0;
/// Passed by the login item, so a start at login stays quietly in the menu bar.
const LAUNCHED_AT_LOGIN_ARG: &str = "--launched-at-login";

/// Where the menu bar panel stands, shared between the tray and window events.
#[derive(Default)]
struct QuickPanelState {
    /// Clicking the menu bar icon while the panel is open first takes focus
    /// away from the panel, which hides it; that same click must not then
    /// reopen it. This records when the panel last hid itself.
    hidden_at: Mutex<Option<Instant>>,
    /// The icon's last known position, so "Quick Log…" from the tray menu can
    /// open the panel in the same place a click would.
    tray_rect: Mutex<Option<Rect>>,
    /// Whether the menu bar icon is showing; when it is not, the shortcut
    /// opens the panel near the pointer instead of under the icon.
    tray_visible: AtomicBool,
    /// The tray menu's "Quick Log…" item, which displays the current shortcut.
    quick_menu_item: Mutex<Option<MenuItem<Wry>>>,
    /// Menu items whose labels follow the app language: open, quick, quit,
    /// and "Settings…" in the app menu.
    labelled_items: Mutex<Vec<(String, MenuItem<Wry>)>>,
}

/// Shows the native save panel and writes `contents` to the chosen file.
///
/// The webview cannot save files on its own: WKWebView drops `<a download>`
/// clicks, so backups and CSV exports go through this command instead. The
/// frontend never gets general filesystem access — only a path the user just
/// picked in a system dialog is written. Returns `None` when the user cancels.
#[tauri::command]
async fn save_text_file(
    app: AppHandle,
    suggested_name: String,
    contents: String,
    filter_name: Option<String>,
    extensions: Option<Vec<String>>,
) -> Result<Option<String>, String> {
    let mut dialog = app.dialog().file().set_file_name(&suggested_name);
    if let (Some(name), Some(extensions)) = (filter_name, extensions) {
        let extensions: Vec<&str> = extensions.iter().map(String::as_str).collect();
        dialog = dialog.add_filter(name, &extensions);
    }

    let picked = tauri::async_runtime::spawn_blocking(move || dialog.blocking_save_file())
        .await
        .map_err(|error| error.to_string())?;

    let Some(picked) = picked else {
        return Ok(None);
    };
    let path = picked.into_path().map_err(|error| error.to_string())?;
    std::fs::write(&path, contents).map_err(|error| error.to_string())?;
    Ok(Some(path.display().to_string()))
}

/// Brings the main window forward, optionally at a route such as "/activity".
#[tauri::command]
fn open_main_window(app: AppHandle, path: Option<String>) {
    show_main_window(&app, path.as_deref());
}

#[tauri::command]
fn hide_quick_panel(app: AppHandle) {
    if let Some(window) = app.get_webview_window(QUICK_WINDOW) {
        let _ = window.hide();
    }
}

/// Text next to the menu bar icon (a count of payments due soon) and its
/// tooltip. `None` clears the text, leaving just the icon.
#[tauri::command]
fn set_menu_bar_status(
    app: AppHandle,
    title: Option<String>,
    tooltip: Option<String>,
) -> Result<(), String> {
    let Some(tray) = app.tray_by_id(TRAY_ID) else {
        return Ok(());
    };
    tray.set_title(title.as_deref())
        .map_err(|error| error.to_string())?;
    tray.set_tooltip(Some(tooltip.as_deref().unwrap_or("Oh My Cards")))
        .map_err(|error| error.to_string())
}

/// The menu bar icon is on by default; people who never use it can turn it off.
#[tauri::command]
fn set_menu_bar_enabled(app: AppHandle, enabled: bool) -> Result<(), String> {
    if let Some(tray) = app.tray_by_id(TRAY_ID) {
        tray.set_visible(enabled)
            .map_err(|error| error.to_string())?;
    }
    app.state::<QuickPanelState>()
        .tray_visible
        .store(enabled, Ordering::Relaxed);
    if !enabled {
        hide_quick_panel(app);
    }
    Ok(())
}

/// Registers the system-wide shortcut that opens the quick panel, replacing
/// any previous one. `None` turns it off. Fails if another app owns the keys.
#[tauri::command]
fn set_quick_shortcut(app: AppHandle, shortcut: Option<String>) -> Result<(), String> {
    let manager = app.global_shortcut();
    manager
        .unregister_all()
        .map_err(|error| error.to_string())?;

    let shortcut = shortcut.filter(|text| !text.trim().is_empty());
    if let Some(text) = shortcut.as_deref() {
        manager
            .register(text)
            .map_err(|error| error.to_string())?;
    }

    let item = app
        .state::<QuickPanelState>()
        .quick_menu_item
        .lock()
        .ok()
        .and_then(|item| item.clone());
    if let Some(item) = item {
        let _ = item.set_accelerator(shortcut.as_deref());
    }
    Ok(())
}

/// A newer version published on GitHub Releases.
#[derive(Clone, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct AppUpdate {
    version: String,
    current_version: String,
    notes: Option<String>,
    date: Option<String>,
}

/// Asks the release feed whether a newer version exists. The feed is a static
/// `latest.json` on GitHub Releases; every download is checked against the
/// public key in tauri.conf.json before it is installed.
#[tauri::command]
async fn check_app_update(app: AppHandle) -> Result<Option<AppUpdate>, String> {
    let update = app
        .updater()
        .map_err(|error| error.to_string())?
        .check()
        .await
        .map_err(|error| error.to_string())?;
    Ok(update.map(|update| AppUpdate {
        version: update.version.clone(),
        current_version: update.current_version.clone(),
        notes: update.body.clone(),
        date: update.date.map(|date| date.to_string()),
    }))
}

/// Downloads and installs the newest version (reporting progress as
/// `app-update-progress` events). It takes effect on the next launch;
/// `restart_app` applies it now. Returns the installed version, if any.
#[tauri::command]
async fn install_app_update(app: AppHandle) -> Result<Option<String>, String> {
    let updater = app.updater().map_err(|error| error.to_string())?;
    let Some(update) = updater.check().await.map_err(|error| error.to_string())? else {
        return Ok(None);
    };
    let version = update.version.clone();
    let handle = app.clone();
    let mut received: usize = 0;
    update
        .download_and_install(
            move |chunk, total| {
                received += chunk;
                let _ = handle.emit("app-update-progress", (received, total));
            },
            || {},
        )
        .await
        .map_err(|error| error.to_string())?;
    Ok(Some(version))
}

#[tauri::command]
fn restart_app(app: AppHandle) {
    app.restart();
}

/// Relabels the menus this app creates when the user switches language.
#[tauri::command]
fn set_native_menu_labels(
    app: AppHandle,
    open: String,
    quick: String,
    quit: String,
    settings: String,
) -> Result<(), String> {
    let items = app
        .state::<QuickPanelState>()
        .labelled_items
        .lock()
        .map(|items| items.clone())
        .unwrap_or_default();
    for (id, item) in items {
        let text = match id.as_str() {
            "open" => &open,
            "quick" => &quick,
            "quit" => &quit,
            "settings" => &settings,
            _ => continue,
        };
        item.set_text(text).map_err(|error| error.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn get_launch_at_login(app: AppHandle) -> Result<bool, String> {
    app.autolaunch()
        .is_enabled()
        .map_err(|error| error.to_string())
}

/// Adds or removes the login item; returns what macOS reports afterwards.
#[tauri::command]
fn set_launch_at_login(app: AppHandle, enabled: bool) -> Result<bool, String> {
    let launcher = app.autolaunch();
    let result = if enabled {
        launcher.enable()
    } else {
        launcher.disable()
    };
    result.map_err(|error| error.to_string())?;
    launcher.is_enabled().map_err(|error| error.to_string())
}

fn show_main_window(app: &AppHandle, path: Option<&str>) {
    if let Some(quick) = app.get_webview_window(QUICK_WINDOW) {
        let _ = quick.hide();
    }
    if let Some(main) = app.get_webview_window(MAIN_WINDOW) {
        let _ = main.unminimize();
        let _ = main.show();
        let _ = main.set_focus();
        if let Some(path) = path {
            let _ = main.emit("navigate", path);
        }
    }
}

/// Centers the panel under the menu bar icon, kept inside that display.
fn place_quick_panel(window: &WebviewWindow, rect: &Rect) {
    let scale = window.scale_factor().unwrap_or(1.0);
    let icon = rect.position.to_physical::<f64>(scale);
    let icon_size = rect.size.to_physical::<f64>(scale);
    let Ok(panel) = window.outer_size() else {
        return;
    };
    let panel_width = f64::from(panel.width);

    let mut x = icon.x + icon_size.width / 2.0 - panel_width / 2.0;
    let mut y = icon.y + icon_size.height + QUICK_GAP * scale;

    if let Ok(monitors) = window.available_monitors() {
        let containing = monitors.iter().find(|monitor| {
            let origin = monitor.position();
            let size = monitor.size();
            icon.x >= f64::from(origin.x)
                && icon.x < f64::from(origin.x) + f64::from(size.width)
                && icon.y >= f64::from(origin.y)
                && icon.y < f64::from(origin.y) + f64::from(size.height)
        });
        if let Some(monitor) = containing {
            let margin = 8.0 * monitor.scale_factor();
            let left = f64::from(monitor.position().x) + margin;
            let right =
                f64::from(monitor.position().x) + f64::from(monitor.size().width) - panel_width - margin;
            x = x.clamp(left, right.max(left));
            // The icon sits in the menu bar at the top of its display.
            y = y.max(f64::from(monitor.position().y));
        }
    }

    let _ = window.set_position(PhysicalPosition::new(x.round() as i32, y.round() as i32));
}

/// Without a menu bar icon to hang under, the panel opens just below the menu
/// bar of whichever display the pointer is on.
fn place_quick_panel_near_pointer(app: &AppHandle, window: &WebviewWindow) {
    let (Ok(pointer), Ok(panel), Ok(monitors)) = (
        app.cursor_position(),
        window.outer_size(),
        window.available_monitors(),
    ) else {
        let _ = window.center();
        return;
    };
    let Some(monitor) = monitors.iter().find(|monitor| {
        let origin = monitor.position();
        let size = monitor.size();
        pointer.x >= f64::from(origin.x)
            && pointer.x < f64::from(origin.x) + f64::from(size.width)
            && pointer.y >= f64::from(origin.y)
            && pointer.y < f64::from(origin.y) + f64::from(size.height)
    }) else {
        let _ = window.center();
        return;
    };

    let scale = monitor.scale_factor();
    let x = f64::from(monitor.position().x)
        + (f64::from(monitor.size().width) - f64::from(panel.width)) / 2.0;
    // Below the menu bar (24pt) plus the usual gap.
    let y = f64::from(monitor.position().y) + (24.0 + QUICK_GAP) * scale;
    let _ = window.set_position(PhysicalPosition::new(x.round() as i32, y.round() as i32));
}

fn toggle_quick_panel(app: &AppHandle, rect: Option<Rect>) {
    let Some(window) = app.get_webview_window(QUICK_WINDOW) else {
        return;
    };
    if window.is_visible().unwrap_or(false) {
        let _ = window.hide();
        return;
    }

    let state = app.state::<QuickPanelState>();
    let just_hidden = state
        .hidden_at
        .lock()
        .ok()
        .and_then(|hidden_at| *hidden_at)
        .is_some_and(|at| at.elapsed() < Duration::from_millis(300));
    if just_hidden {
        return;
    }

    let tray_visible = state.tray_visible.load(Ordering::Relaxed);
    let rect = rect.or_else(|| {
        if !tray_visible {
            return None;
        }
        // Opened by the shortcut: ask the icon where it is right now.
        app.tray_by_id(TRAY_ID)
            .and_then(|tray| tray.rect().ok().flatten())
            .or_else(|| state.tray_rect.lock().ok().and_then(|stored| *stored))
    });
    match rect {
        Some(rect) => place_quick_panel(&window, &rect),
        None => place_quick_panel_near_pointer(app, &window),
    }
    let _ = window.show();
    let _ = window.set_focus();
    let _ = window.emit("quick-panel-shown", ());
}

fn build_quick_panel(app: &tauri::App) -> tauri::Result<()> {
    let window = WebviewWindowBuilder::new(app, QUICK_WINDOW, WebviewUrl::App("index.html".into()))
        .title("Oh My Cards")
        .inner_size(QUICK_SIZE.0, QUICK_SIZE.1)
        .resizable(false)
        .maximizable(false)
        .minimizable(false)
        .decorations(false)
        // Transparent so the system popover material shows through, which is
        // what makes it read as a native menu bar panel in light and dark.
        .transparent(true)
        .effects(
            EffectsBuilder::new()
                .effect(Effect::Popover)
                .state(EffectState::Active)
                .radius(12.0)
                .build(),
        )
        .shadow(true)
        .always_on_top(true)
        .visible_on_all_workspaces(true)
        .skip_taskbar(true)
        .visible(false)
        .focused(false)
        .build()?;

    let handle = app.handle().clone();
    window.on_window_event(move |event| match event {
        // Like any menu bar extra: it goes away when you click elsewhere.
        WindowEvent::Focused(false) => {
            if let Some(panel) = handle.get_webview_window(QUICK_WINDOW) {
                if panel.is_visible().unwrap_or(false) {
                    let _ = panel.hide();
                    if let Ok(mut hidden_at) = handle.state::<QuickPanelState>().hidden_at.lock() {
                        *hidden_at = Some(Instant::now());
                    }
                }
            }
        }
        WindowEvent::CloseRequested { api, .. } => {
            api.prevent_close();
            if let Some(panel) = handle.get_webview_window(QUICK_WINDOW) {
                let _ = panel.hide();
            }
        }
        _ => {}
    });

    Ok(())
}

/// The standard macOS app menu, plus "Settings…" (⌘,) where Mac users look
/// for it.
fn build_app_menu(app: &tauri::App) -> tauri::Result<()> {
    let menu = Menu::default(app.handle())?;
    if let Some(MenuItemKind::Submenu(app_menu)) = menu.items()?.into_iter().next() {
        let settings = MenuItem::with_id(app, "settings", "Settings…", true, Some("CmdOrCtrl+,"))?;
        if let Ok(mut items) = app.state::<QuickPanelState>().labelled_items.lock() {
            items.push(("settings".into(), settings.clone()));
        }
        let separator = PredefinedMenuItem::separator(app)?;
        // After "About Oh My Cards" and its separator.
        app_menu.insert_items(&[&settings, &separator], 2)?;
    }
    app.set_menu(menu)?;
    app.on_menu_event(|app, event| {
        if event.id().as_ref() == "settings" {
            show_main_window(app, Some("/settings"));
        }
    });
    Ok(())
}

fn build_tray(app: &tauri::App) -> tauri::Result<()> {
    let open = MenuItem::with_id(app, "open", "Open Oh My Cards", true, None::<&str>)?;
    let quick = MenuItem::with_id(app, "quick", "Quick Log…", true, None::<&str>)?;
    let separator = PredefinedMenuItem::separator(app)?;
    let quit = MenuItem::with_id(app, "quit", "Quit Oh My Cards", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&open, &quick, &separator, &quit])?;
    if let Ok(mut stored) = app.state::<QuickPanelState>().quick_menu_item.lock() {
        *stored = Some(quick.clone());
    }
    if let Ok(mut items) = app.state::<QuickPanelState>().labelled_items.lock() {
        items.push(("open".into(), open.clone()));
        items.push(("quick".into(), quick.clone()));
        items.push(("quit".into(), quit.clone()));
    }

    TrayIconBuilder::with_id(TRAY_ID)
        .icon(Image::from_bytes(include_bytes!("../icons/tray-template.png"))?)
        .icon_as_template(true)
        .tooltip("Oh My Cards")
        .menu(&menu)
        // Left click opens the panel; the menu is for right click.
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id().as_ref() {
            "open" => show_main_window(app, None),
            "quick" => toggle_quick_panel(app, None),
            "quit" => app.exit(0),
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            let app = tray.app_handle();
            match event {
                TrayIconEvent::Click {
                    rect,
                    button: MouseButton::Left,
                    button_state: MouseButtonState::Up,
                    ..
                } => {
                    if let Ok(mut stored) = app.state::<QuickPanelState>().tray_rect.lock() {
                        *stored = Some(rect);
                    }
                    toggle_quick_panel(app, Some(rect));
                }
                TrayIconEvent::Enter { rect, .. } | TrayIconEvent::Move { rect, .. } => {
                    if let Ok(mut stored) = app.state::<QuickPanelState>().tray_rect.lock() {
                        *stored = Some(rect);
                    }
                }
                _ => {}
            }
        })
        .build(app)?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(|app, _shortcut, event| {
                    if event.state == ShortcutState::Pressed {
                        toggle_quick_panel(app, None);
                    }
                })
                .build(),
        )
        .plugin(
            tauri_plugin_autostart::Builder::new()
                .args([LAUNCHED_AT_LOGIN_ARG])
                .build(),
        )
        .plugin(tauri_plugin_updater::Builder::new().build())
        .manage(QuickPanelState {
            tray_visible: AtomicBool::new(true),
            ..QuickPanelState::default()
        })
        .invoke_handler(tauri::generate_handler![
            save_text_file,
            open_main_window,
            hide_quick_panel,
            set_menu_bar_status,
            set_menu_bar_enabled,
            set_quick_shortcut,
            set_native_menu_labels,
            get_launch_at_login,
            set_launch_at_login,
            check_app_update,
            install_app_update,
            restart_app
        ])
        .setup(|app| {
            build_app_menu(app)?;
            build_quick_panel(app)?;
            build_tray(app)?;
            // Started by the login item: stay in the menu bar. The main
            // window is created hidden (tauri.conf.json) and only shown here
            // when the user opened the app themselves.
            let launched_at_login = std::env::args().any(|arg| arg == LAUNCHED_AT_LOGIN_ARG);
            if !launched_at_login {
                if let Some(main) = app.get_webview_window(MAIN_WINDOW) {
                    let _ = main.show();
                    let _ = main.set_focus();
                }
            }
            Ok(())
        })
        .on_window_event(|window, event| {
            // With the menu bar panel the app stays useful without its main
            // window, so closing the window puts it away instead of quitting.
            // Quit with ⌘Q or from the menu bar icon's menu.
            if window.label() == MAIN_WINDOW {
                if let WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    let _ = window.hide();
                }
            }
        })
        .build(tauri::generate_context!())
        .expect("error while building Oh My Cards");

    app.run(|app, event| {
        // Clicking the Dock icon brings back a hidden main window.
        #[cfg(target_os = "macos")]
        if let RunEvent::Reopen { .. } = event {
            show_main_window(app, None);
        }
        #[cfg(not(target_os = "macos"))]
        let _ = (app, event);
    });
}
