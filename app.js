import express, { urlencoded } from "express";
import { route } from "./route/Route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://fresh-veg-frontend.vercel.app"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join("uploads")));
app.use("", route); // ✅ এখন route ঠিকভাবে CORS-enabled হয়ে যাবে
// In your Express server (usually app.js or server.js)
app.use("/uploads", express.static("uploads"));
export default app;
