import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import zweetRouter from "./routers/zweetRouter";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/zweets", zweetRouter);

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => app.listen(PORT, () => console.log(`✅ Server : http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));