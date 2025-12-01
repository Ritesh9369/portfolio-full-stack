import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// ================= CORS FIX (100% Working) =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-full-stack-silk.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (like mobile apps / curl / postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
// ===========================================================

app.use(express.json());

// DB connect
connectDB();

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => res.send("Portfolio Backend Running 🚀"));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
