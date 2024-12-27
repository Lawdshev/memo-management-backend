import createMemo from "../controllers/memo/create-memo";
import { Router } from "express";
import deleteMemo from "../controllers/memo/delete-memo";
import editMemo from "../controllers/memo/edit-memo";
import getInbox from "../controllers/memo/inbox";
import getDraftMemos from "../controllers/memo/drafts";
import getSentMemos from "../controllers/memo/get-sent-memos";
import getMemoById from "../controllers/memo/get-memo";
import { memo } from "react";
import deleteMemoForUser from "../controllers/memo/delete-for-user";
import permanentDelete from "../controllers/memo/delete-memo";
const memoRouter = Router();

memoRouter.post("/send", createMemo);
memoRouter.put("/edit/:id", editMemo);
memoRouter.delete("/delete/:id", deleteMemoForUser);
memoRouter.delete("/permanent-delete/:id", permanentDelete);
memoRouter.get("/inbox", getInbox);
memoRouter.get("/drafts", getDraftMemos);
memoRouter.get("/sent", getSentMemos);
memoRouter.get("/:id", getMemoById);


export default memoRouter;
