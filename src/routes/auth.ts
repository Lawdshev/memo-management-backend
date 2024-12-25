import { Router } from "express";
import registerUser from "../controllers/auth/register";
const authRouter = Router();

authRouter.post("/register", registerUser);

export default authRouter;
