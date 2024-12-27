import User from "../models/user";

const userQueries = {
  findUserByEmail: async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  },
  findUserById: async (id: string) => {
    const user = await User.findById(id).select("-password");
    return user;
  },
  softDeleteMemoForUser: async (userId: string, memoId: string) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { hiddenMemos: memoId } }, // Avoid duplicates
      { new: true }
    );
    return user;
  },
  searchUsers: async (query: string, page = 1, pageSize = 50) => {
    const skip = (page - 1) * pageSize;
    const users = await User.find({
      softDelete: false,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(pageSize)
      .select("name email");
    return users;
  },
  getAllUsers: async (page = 1, pageSize = 20) => {
    const skip = (page - 1) * pageSize;
    const users = await User.find({ softDelete: false })
      .skip(skip)
      .limit(pageSize)
      .select("name email");
    return users;
  },
  updateUserProfile: async (userId: string, updateData: any) => {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return user;
  },
};

export default userQueries; 