import User from "../models/user";

const userQueries = {
  findUserByEmail: async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  },
};

export default userQueries;