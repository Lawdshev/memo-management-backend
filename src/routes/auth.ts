import { Router } from "express";
import registerUser from "../controllers/auth/register";
import loginUser from "../controllers/auth/login";
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
