import express from "express";
import { users, userDetail, userFollow, userRemove, userEdit } from "../controllers/userController";
import { tokenVerify, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/:id", userDetail);
userRouter.post("/:id/follow", tokenVerify, userFollow);
userRouter.post("/:id/edit", tokenVerify, uploadAvatar.single("avatar"), userEdit);
userRouter.delete("/:id/delete", tokenVerify, userRemove);

export default userRouter;