import { Router, type IRouter } from "express";
import healthRouter from "./health";
import cardsRouter from "./cards";
import walletRouter from "./wallet";
import transactionsRouter from "./transactions";
import benefitsRouter from "./benefits";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(cardsRouter);
router.use(walletRouter);
router.use(transactionsRouter);
router.use(benefitsRouter);
router.use(dashboardRouter);

export default router;
