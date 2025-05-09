import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";

import logger from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import path from "path";

//routers import
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js"

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

//routes
app.use("/api/v4/users", userRouter);
app.use("/api/v4/products", productRouter);

// errorHandler
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
