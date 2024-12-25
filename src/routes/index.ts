import  { Express } from "express";
import authRouter from "./auth";

const injectRoutes = (app: Express) => {
    app.use("/api/auth", authRouter);
};

export default injectRoutes;