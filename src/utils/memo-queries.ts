import Memo from "../models/memo";
import { Schema } from "mongoose";
import { IUser } from "../models/user";

const memoQueries = {
  createMemo: async (
    title: string,
    content: string,
    tags: string[],
    owner: IUser,
    isDraft?: boolean
  ) => {
    return await Memo.create({
      title,
      content,
      tags,
      owner: owner._id,
      isDraft
    });
  },
};

export default memoQueries;