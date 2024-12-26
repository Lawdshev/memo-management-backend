import {  Response,Request } from "express";
import memoQueries from "../../utils/memo-queries";
import { validateRequest } from "../../middlewares/validation";
import createMemoSchema from "../../validation-schemas/create-memo";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtils";
import { AuthedRequest } from "../../types";

const createMemo = async (req: Request, res: Response) => {
  const { title, content, tags,sharedWith,isDraft } = req.body;
  try {
    const error = validateRequest(createMemoSchema, req);
    if (error) {
      sendErrorResponse(res, "Validation Error", error.details[0].message, 400);
      return;
    }
    const draft = (sharedWith && sharedWith?.length === 0) ? true : isDraft ?? false; 
    console.log({ user: (req as AuthedRequest).user });
    const newMemo = await memoQueries.createMemo(title, content, tags, (req as AuthedRequest)?.user, draft);
    return sendSuccessResponse(res, "Memo created successfully", newMemo, 201);     
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, "Failed to create memo", error, 500);
    return;
  }
};

export default createMemo;
