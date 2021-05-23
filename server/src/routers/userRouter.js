import express from "express";
import { users, userDetail, userFollow, userRemove } from "../controllers/userController";
import { tokenVerify } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/:id", userDetail);
userRouter.post("/:id/follow", tokenVerify, userFollow);
userRouter.get("/:id/delete", tokenVerify, userRemove);

export default userRouter;