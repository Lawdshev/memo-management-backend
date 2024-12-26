import { Router } from "express";
import registerUser from "../controllers/auth/register";
import loginUser from "../controllers/auth/login";
import forgotPassword from "../controllers/auth/forgot-password";
import resetPassword from "../controllers/auth/reset-password";
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
