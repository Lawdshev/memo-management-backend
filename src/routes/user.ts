import { Router } from "express";
import searchUsers from "../controllers/user/search-users";
import getUserProfile from "../controllers/user/profile";
import getAllUsers from "../controllers/user/get-all";
import { updateUserProfile } from "../controllers/user/update-profile";

const userRouter = Router();

userRouter.get("/search", searchUsers);
userRouter.get("/profile", getUserProfile);
userRouter.get("/all", getAllUsers);
userRouter.put("/update", updateUserProfile);

export default userRouter;
