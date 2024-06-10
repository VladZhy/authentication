import { CORS_OPTIONS, URLENCODED_OPTIONS, PRIMARY_ROUTE } from "./config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import { pageNotFound } from "./middleware/pageNotFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded(URLENCODED_OPTIONS));
app.use(cookieParser());
app.use(PRIMARY_ROUTE, router);
app.use(pageNotFound);
app.use(errorHandler);

export { app };
