import express from "express";
import multer from "multer";
import { create, edit, remove, search, zweetDetail, zweets } from "../controllers/zweetController";
import { tokenVerify } from "../middlewares";

const ZweetRouter = express.Router();

ZweetRouter.get("/", zweets);
ZweetRouter.post("/create", tokenVerify, create);
ZweetRouter.get("/search", search);
ZweetRouter.get("/:id", zweetDetail);
ZweetRouter.post("/:id/edit", tokenVerify, edit);
ZweetRouter.post("/:id/delete", tokenVerify, remove);

export default ZweetRouter;