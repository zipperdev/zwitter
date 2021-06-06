import express from "express";
import { create, edit, remove, search, zweetDetail, comment, reaction, zweets } from "../controllers/zweetController";
import { tokenVerify, uploadZweet } from "../middlewares";

const zweetRouter = express.Router();

zweetRouter.get("/", zweets);
zweetRouter.post("/create", tokenVerify, uploadZweet.single("image"), create);
zweetRouter.get("/search", search);
zweetRouter.get("/:id", zweetDetail);
zweetRouter.post("/:id/comment", tokenVerify, comment);
zweetRouter.post("/:id/reaction", tokenVerify, reaction);
zweetRouter.post("/:id/edit", tokenVerify, uploadZweet.single("image"), edit);
zweetRouter.post("/:id/delete", tokenVerify, remove);

export default zweetRouter;