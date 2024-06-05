import express from "express";
import form from "./routes/forms";
import dotenv from "dotenv";
dotenv.config();
const dbconfig = require("./config/database");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/forms", form);

// const PORT: number = process.env.PORT || 8000;

(async () => {
    try {
      app.listen(8000, () => {
        console.log(`Server is running on http://localhost:${8000}`);
      });
    } catch (error) {
      console.error("Error connecting or using MongoDB:", error);
      process.exit(1);
    }
  })();