import express from "express";
import { users, userDetail, follow, remove, edit, changePassword } from "../controllers/userController";
import { tokenVerify, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/:id", userDetail);
userRouter.post("/:id/follow", tokenVerify, follow);
userRouter.put("/:id/edit", tokenVerify, uploadAvatar.single("avatar"), edit);
userRouter.put("/:id/edit/password", tokenVerify, changePassword);
userRouter.delete("/:id/delete", tokenVerify, remove);

export default userRouter;