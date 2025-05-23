import { app } from "./app.js";
import connectDB from "./config/db.js";

import dotenv from "dotenv";
dotenv.config(); // must come before connectDB

const PORT = process.env.PORT || 8000;

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is up and running at PORT ${PORT}`);
  })
);
