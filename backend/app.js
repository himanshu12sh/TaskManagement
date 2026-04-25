import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://task-management-iota-five-12.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("/{*splat}", cors(corsOptions)); // ✅ Express 5 wildcard syntax

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});