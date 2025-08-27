import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import zoomRoutes from "./routes/zoom.js";
import fileUpload from "express-fileupload";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import dbConnection from "./database/dbConnection.js";
import countRouter from "./routes/totalCounts.js";
import inviteRoutes from "./routes/inviteRoute.js";
import applicationRouter from "./routes/applicationRouter.js";

dotenv.config();
const app = express();
dbConnection();

app.use(cors({
  origin: 'https://gettingplaced.netlify.app',
  // origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    // can use multer also
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/job", jobRouter);
app.use("/api/zoom", zoomRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/totalCounts", countRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});
export default app;
