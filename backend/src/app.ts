import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import apiRoutes from "./routes/api.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 500
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/data", apiRoutes);
// ... add devices, ai, admin routes as needed

// Error handler
app.use(errorMiddleware);

export default app;