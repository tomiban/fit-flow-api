import "dotenv/config";

// In src/index.js
import express from "express";
import cors from "cors";
import v1Router from "./v1/routes/index.js";
import morgan from "morgan";


export const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", v1Router);
