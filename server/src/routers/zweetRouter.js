import express from "express";
import multer from "multer";
import { create, edit, remove, search, zweetDetail, zweetReaction, zweets } from "../controllers/zweetController";
import { tokenVerify } from "../middlewares";

const zweetRouter = express.Router();

zweetRouter.get("/", zweets);
zweetRouter.post("/create", tokenVerify, create);
zweetRouter.get("/search", search);
zweetRouter.get("/:id", zweetDetail);
zweetRouter.post("/:id/reaction", tokenVerify, zweetReaction);
zweetRouter.post("/:id/edit", tokenVerify, edit);
zweetRouter.post("/:id/delete", tokenVerify, remove);

export default zweetRouter;