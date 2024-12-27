import Memo from "../models/memo";
import User from "../models/user";
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
    const userDoc = await User.findById(owner._id).select("hiddenMemos");
    const hiddenMemos = userDoc?.hiddenMemos || [];

    const memos = await Memo.find({
      owner: owner._id,
      isDraft: false,
      _id: { $nin: hiddenMemos },
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return memos;
  },

  getDraftMemos: async (page = 1, pageSize = 20, userId: string) => {
    const skip = (page - 1) * pageSize;
    const user = await User.findById(userId).select("hiddenMemos");
    const hiddenMemos = user?.hiddenMemos || [];

    const memos = await Memo.find({
      isDraft: true,
      _id: { $nin: hiddenMemos },
    })
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
    const userDoc = await User.findById(user._id).select("hiddenMemos");
    const hiddenMemos = userDoc?.hiddenMemos || [];

    const memos = await Memo.find({
      sharedWith: user._id,
      _id: { $nin: hiddenMemos },
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return memos;
  },

  getDraftsByOwner: async (owner: IUser, page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    const user = await User.findById(owner._id).select("hiddenMemos");
    const hiddenMemos = user?.hiddenMemos || [];

    const memos = await Memo.find({
      owner: owner._id,
      isDraft: true,
      _id: { $nin: hiddenMemos },
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return memos;
  },

  findMemosCount: async (filter: object, user: IUser) => {
    const userDoc = await User.findById(user._id).select("hiddenMemos");
    const hiddenMemos = userDoc?.hiddenMemos || [];

    return await Memo.countDocuments({ ...filter, _id: { $nin: hiddenMemos } });
  },

  getUserMemoById: async (id: string, user: IUser) => {
    const userDoc = await User.findById(user._id).select("hiddenMemos");
    const hiddenMemos = userDoc?.hiddenMemos || [];

    return await Memo.findOne({
      $and: [
        { _id: id },
        { _id: { $nin: hiddenMemos } },
        {
          $or: [{ owner: user._id }, { sharedWith: user._id }],
        },
      ],
    });
  },
};

export default memoQueries;
