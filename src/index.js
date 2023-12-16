import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import v1Router from "./v1/routes/index.js";
import {resError} from "./utils/resError.js";
import swaggerUi from "swagger-ui-express";
import {createRequire} from "module";

export const app = express();

const require = createRequire(import.meta.url);
const swaggerDoc = require("./config/swagger-output.json");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", v1Router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
/* app.use("/api-docs", appSwagger); */
app.use((err, req, res, next) => {
    resError(res, err.statusCode, err.message);
});
