import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// =============== CORS FIX ===============
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-full-stack-silk.vercel.app" // your Vercel frontend URL
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
// =======================================

app.use(express.json());

// DB connect
connectDB();

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => res.send("Portfolio Backend Running 🚀"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
