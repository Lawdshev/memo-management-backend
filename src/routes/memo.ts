import createMemo from "../controllers/memo/create-memo";
import { Router } from "express";
const memoRouter = Router();

memoRouter.post("/send", createMemo);

export default memoRouter;
