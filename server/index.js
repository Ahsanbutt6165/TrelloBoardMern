import express from "express";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectToMongo from "./database/db.js";
import cardRoutes from "./routes/cardRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/card", cardRoutes);

const __dirname = path.resolve("/Users/hp/Desktop/New folder");
app.use(express.static(path.join(__dirname, "/vite-project/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "vite-project", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Both frontend and backend running on http://localhost:${PORT}`);
});
