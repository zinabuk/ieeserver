import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Middleware that allows the client-side application to make requests
// even if they are on different domains or ports
app.use(cors());
// Middleware that parses JSON data
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// app.use((req, res, next, err){

// })

export default app;
