import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import morgan from "morgan";
import xss from "xss-clean";

import contactRoutes from "./routes/contact.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  limit: Number(process.env.RATE_LIMIT_MAX || 200),
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.use((err, req, res, next) => {
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS: origin not allowed",
    });
  }

  if (err?.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  console.error("Global Error:", err.message);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const jwtSecret = process.env.JWT_SECRET || "";

    if (!mongoUri) {
      throw new Error("MONGO_URI is not set in environment variables");
    }

    if (jwtSecret.length < 32) {
      throw new Error("JWT_SECRET must be set and at least 32 characters long");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
