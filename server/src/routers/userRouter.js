import express from "express";
import { users, userDetail, userRemove } from "../controllers/userController";
import { tokenVerify } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/:id", userDetail);
userRouter.get("/:id/delete", tokenVerify, userRemove);

export default userRouter;