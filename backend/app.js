import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({ path: "./config/config.env" }); //now port 4000 is working

app.use(
  cors({
    // cors helps us to connect frontend to backend or multi port problem resolved
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser()); //used for authorization of user
app.use(express.json()); // parse the json data only
app.use(express.urlencoded({ extended: true })); //means string provided ko json formate me kr deta hai

app.use(
  fileUpload({
    //multer can also be used
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/job", jobRouter);

dbConnection();

app.use(errorMiddleware); //put at the last.... dont call

export default app;
