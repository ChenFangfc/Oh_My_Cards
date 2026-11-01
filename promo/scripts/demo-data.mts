// demo-data.mts — the wallet the film is shot on.
//
//   tsx scripts/demo-data.mts > .cache/demo-state.json
//
// Five popular US cards — Chase, Amex and Capital One, the ones the film
// opens on — and two months of everyday purchases, dated relative to today.
// Each purchase goes on whichever card the app itself ranks first for it, and
// is priced by the same reward engine, so every number on screen is one the
// app really computes.
const store = new Map<string, string>();
(globalThis as any).window = {
  localStorage: {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
  },
  addEventListener: () => {},
  location: { href: "http://localhost/" },
};

const engine = await import("../../lib/api-client-react/src/local/local-first.ts");

const today = new Date();
const at = (offset: number, hour = 12) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset, hour).toISOString();
const dayOfMonth = (offset: number) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset).getDate();
const opened = (inDays: number, yearsAgo: number) =>
  new Date(today.getFullYear() - yearsAgo, today.getMonth(), today.getDate() + inDays)
    .toISOString()
    .slice(0, 10);

let state: any = {
  schemaVersion: 1,
  ruleSetVersion: "demo",
  nextWalletCardId: 6,
  nextTransactionId: 1,
  walletCards: [
    // Chase Sapphire Reserve: payment due in 3 days, annual fee posts in 11.
    { id: 1, cardId: 2, addedAt: at(-700), statementClosingDay: dayOfMonth(-25), paymentDueDay: dayOfMonth(3), creditLimit: 30000, openedAt: opened(11, 2) },
    // American Express Platinum
    { id: 2, cardId: 9, addedAt: at(-1000), statementClosingDay: dayOfMonth(-4), paymentDueDay: dayOfMonth(21), openedAt: opened(140, 3) },
    // American Express Gold Card
    { id: 3, cardId: 8, addedAt: at(-500), statementClosingDay: dayOfMonth(-16), paymentDueDay: dayOfMonth(9), openedAt: opened(60, 1) },
    // Chase Freedom Unlimited
    { id: 4, cardId: 3, addedAt: at(-900), statementClosingDay: dayOfMonth(-12), paymentDueDay: dayOfMonth(14), creditLimit: 12000, openedAt: opened(200, 4) },
    // Capital One Venture X
    { id: 5, cardId: 12, addedAt: at(-900), statementClosingDay: dayOfMonth(-8), paymentDueDay: dayOfMonth(18), creditLimit: 20000, openedAt: opened(90, 2) },
  ],
  transactions: [] as any[],
  benefitUsage: [] as any[],
};

const save = () =>
  engine.importLocalDataBackup({
    app: "Oh My Cards",
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    ruleSetVersion: "demo",
    state,
  });
save();

// [days ago (negative), category, amount, merchant, description]
const purchases: Array<[number, string, number, string, string]> = [
  // Each lands on whichever card the app ranks first for it: groceries on
  // the Gold card, dining and travel on the Reserve, the rest spread out.
  [-54, "Dining", 146.2, "Nopa", "Dinner"],
  [-52, "Groceries", 72.4, "Whole Foods", "Groceries"],
  [-50, "Gas", 52.1, "Shell", "Fill-up"],
  [-47, "Streaming", 15.49, "Netflix", "Subscription"],
  [-45, "Flights", 612, "United Airlines", "Flight to Seattle"],
  [-44, "Dining", 34.5, "Tartine", "Lunch"],
  [-41, "Groceries", 54.3, "Trader Joe's", "Groceries"],
  [-40, "Flights", 420, "Amex Travel", "Flight to Denver"],
  [-39, "Drugstores", 23.8, "CVS", "Pharmacy"],
  [-37, "Online Retail", 74.99, "Amazon", "Online order"],
  [-36, "Rideshare", 18.6, "Uber", "Ride home"],
  [-34, "Hotels", 389, "Hilton", "Hotel stay"],
  [-31, "Dining", 132.4, "Zuni Cafe", "Dinner"],
  [-30, "Gas", 58.3, "Chevron", "Fill-up"],
  [-29, "Groceries", 96.75, "Safeway", "Groceries"],
  [-27, "Dining", 6.45, "Starbucks", "Coffee"],
  [-24, "Entertainment", 32, "AMC Theatres", "Movie night"],
  [-22, "Dining", 41.2, "Dumpling Home", "Dinner"],
  [-20, "Gas", 49.8, "Shell", "Fill-up"],
  [-18, "Groceries", 64.1, "Whole Foods", "Groceries"],
  [-17, "Streaming", 11.99, "Spotify", "Subscription"],
  [-15, "Dining", 58.7, "Burma Superstar", "Dinner"],
  [-13, "Rideshare", 22.4, "Lyft", "Ride"],
  [-12, "Flights", 284, "Delta", "Flight to LA"],
  [-11, "Drugstores", 17.25, "Walgreens", "Pharmacy"],
  [-9, "Dining", 7.1, "Starbucks", "Coffee"],
  [-8, "Warehouse Clubs", 212.4, "Costco", "Stock-up"],
  [-7, "Gas", 46.9, "Costco Gas", "Fill-up"],
  [-6, "Dining", 28.9, "Tartine", "Lunch"],
  [-5, "Online Retail", 39.99, "Amazon", "Online order"],
  [-4, "Utilities", 96.3, "PG&E", "Electric bill"],
  [-3, "Phone and Internet", 70, "Comcast", "Internet"],
  [-2, "Dining", 64.2, "Nopa", "Dinner"],
  [-1, "Groceries", 58.6, "Trader Joe's", "Groceries"],
  [0, "Dining", 6.75, "Blue Bottle", "Coffee"],
];

let id = 1;
for (const [offset, category, amount, merchant, description] of purchases) {
  const date = at(offset, offset === 0 ? 9 : 13);
  const plan = engine.planQuickEntry(`${amount} ${description} at ${merchant}`, { category, date }, state);
  const best = plan.options[0];
  state = {
    ...state,
    nextTransactionId: id + 1,
    transactions: [
      ...state.transactions,
      {
        id: id++,
        walletCardId: best.walletCardId,
        transactionType: "purchase",
        description,
        amount,
        category,
        cashbackEarned: best.cashbackEarned ?? 0,
        cashbackRate: best.cashbackRate,
        date,
        cardName: "",
        merchantName: merchant,
        locationName: null,
        latitude: null,
        longitude: null,
      },
    ],
  };
  save();
}

// Two statement payments.
for (const [walletCardId, offset, amount] of [[1, -20, 412.3], [2, -10, 890]] as const) {
  state = {
    ...state,
    nextTransactionId: id + 1,
    transactions: [
      ...state.transactions,
      { id: id++, walletCardId, transactionType: "payment", description: "Payment", amount, category: "Payment", cashbackEarned: 0, cashbackRate: 0, date: at(offset), cardName: "", merchantName: null, locationName: null, latitude: null, longitude: null },
    ],
  };
}

// Credits already used this year.
const used = (walletCardId: number, benefitId: number, ...offsets: number[]) => ({
  walletCardId,
  benefitId,
  used: true,
  usedAt: at(offsets[offsets.length - 1]),
  history: offsets.map((offset) => at(offset)),
});
state = {
  ...state,
  benefitUsage: [
    used(2, 873, -29, 0), // Platinum: Uber Cash, October and November
    used(2, 282, -27), // Platinum: Digital Entertainment, October
    used(2, 283, -19), // Platinum: Resy, this quarter
    used(2, 872, -200), // Platinum: airline fee credit, this year
    used(3, 277, -28), // Gold: Uber Cash, October
    used(3, 278, -24), // Gold: dining credit, October
    used(1, 273, -150), // Reserve: annual travel credit, this cardmember year
    used(5, 39, -60), // Venture X: travel credit, this cardmember year
  ],
};
save();

process.stdout.write(store.get("oh-my-card:local-state:v1")!);
