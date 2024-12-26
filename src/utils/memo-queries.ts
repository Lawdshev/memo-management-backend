import Memo from "../models/memo";
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
      isDraft,
    });
  },
  getMemoById: async (id: string) => {
    const memo = await Memo.findById(id);
    return memo;
  },
  getMemosByOwner: async (owner: IUser, page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    const memos = await Memo.find({ owner: owner._id, isDraft: false })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return memos;
  },
  getDraftMemos: async (page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    const memos = await Memo.find({ isDraft: true })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return memos;
  },
  getMemoOwner: async (memoId: string) => {
    const memo = await Memo.findById(memoId);
    return memo?.owner;
  },
  deleteMemo: async (memoId: string) => {
    const memo = await Memo.findByIdAndDelete(memoId);
    return memo;
  },
  getMemosSentToUser: async (user: IUser, page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    const memos = await Memo.find({ sharedWith: user._id })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return memos;
  },
  getDraftsByOwner: async (owner: IUser, page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    const memos = await Memo.find({ owner: owner._id, isDraft: true })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return memos;
  },
  findMemosCount: async (filter: object) => {
    return await Memo.countDocuments(filter);
  },
  getUserMemoById: async (id: string, userId: string) => {
    return await Memo.findOne({
      _id: id,
      $or: [
        { owner: userId }, // User owns the memo
        { sharedWith: userId }, // Memo is shared with the user
      ],
    });
  },
};

export default memoQueries;
