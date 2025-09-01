import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const server = express();

mongoose
  .connect(process.env.DB_URL)
  .then((val) => {
    server.listen(5000, () => {
      console.log(
        "Database is Connected server is listening at http://localhost:5000"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
server.use(morgan("dev"));
server.use(express.json());
server.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);
server.use(express.static("uploads"));
server.use(cors());

server.use("/api/users", userRoutes);
server.use("/api", productRoutes);
server.use("/api/orders", orderRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: "welcomem to backend" });
});
