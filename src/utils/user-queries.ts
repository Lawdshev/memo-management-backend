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
};

export default userQueries; 