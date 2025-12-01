import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// default route
app.get("/", (req, res) => res.send("Portfolio Backend Running 🚀"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
