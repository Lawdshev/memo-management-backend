import  { Express } from "express";
import authRouter from "./auth";
import memoRouter from "./memo";
import userRouter from "./user";
import { protect } from "../middlewares/auth";

const injectRoutes = (app: Express) => {
    app.use("/api/auth", authRouter);
    app.use("/api/memo", protect, memoRouter);
    app.use("/api/user", protect, userRouter);
};

export default injectRoutes;