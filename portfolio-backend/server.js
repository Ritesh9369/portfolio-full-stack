import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// ================== CORS FIX — 100% WORKING ==================
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-full-stack-silk.vercel.app", // Frontend (Vercel)
  "https://portfolio-full-stack-4lif.onrender.com" // Backend (Render)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Mobile/Postman allow
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("❌ Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST"],
    credentials: true
  })
);
// =============================================================

// Body Parser
app.use(express.json());

// Connect to Database
connectDB();

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Default route (optional)
app.get("/", (req, res) => res.send("Portfolio Backend Running 🚀"));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
