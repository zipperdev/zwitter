import express from "express";
import { create, edit, remove, search, storyDetail, storys } from "../controllers/storyRouter";

const storyRouter = express.Router();

storyRouter.get("/", storys);
storyRouter.post("/create", create);
storyRouter.get("/search", search);
storyRouter.get("/:id", storyDetail);
storyRouter.post("/:id/edit", edit);
storyRouter.delete("/:id/delete", remove);

export default storyRouter;