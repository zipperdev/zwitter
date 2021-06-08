import express from "express";
import { login, signup } from "../controllers/userController";
import { tokenIsNull, uploadAvatar } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => {
    return res.status(200).json({
        title: "Zwitter Private RestAPI", 
        warning: "This API is for Zwitter Web Application.", 
        createdBy: "zipperdev", 
        license: "MIT"
    });
});
globalRouter.post("/signup", tokenIsNull, uploadAvatar.single("avatar"), signup);
globalRouter.post("/login", tokenIsNull, login);

export default globalRouter;