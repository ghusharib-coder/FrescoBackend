import express from "express";
import cors from "cors";
import dbConnect from "./dbConnection.js";
import UserRoutes from "./Router.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Default route (important for Vercel)
app.get("/", (req, res) => {
  res.send("Backend is running on Vercel!");
});

// API routes
app.use("/api/users", UserRoutes);

// Connect to database
dbConnect();

// Export for Vercel (ESM)
export default app;
