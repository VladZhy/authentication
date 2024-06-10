import { Router } from "express";
import { userRouter } from "./routers/userRouter";
import { USERS_ROUTE } from "./config";

const router = Router();

router.use(USERS_ROUTE, userRouter);

export { router };
