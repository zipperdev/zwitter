import express from "express";
import multer from "multer";
import { create, edit, remove, search, storyDetail, storys } from "../controllers/storyController";
import { tokenVerify } from "../middlewares";

const storyRouter = express.Router();

storyRouter.get("/", storys);
storyRouter.post("/create", tokenVerify, create);
storyRouter.get("/search", search);
storyRouter.get("/:id", storyDetail);
storyRouter.post("/:id/edit", tokenVerify, edit);
storyRouter.post("/:id/delete", tokenVerify, remove);

export default storyRouter;