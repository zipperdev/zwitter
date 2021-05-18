import express from "express";
import { login, signup } from "../controllers/userController";
import { tokenIsNull } from '../middlewares';

const globalRouter = express.Router();

globalRouter.post("/signup", tokenIsNull, signup);
globalRouter.post("/login", tokenIsNull, login);

export default globalRouter;