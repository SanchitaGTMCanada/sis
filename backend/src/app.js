
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Request parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PI-NC SIS Backend is running",
    status: "OK",
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to PI-NC Student Information System API",
  });
});

module.exports = app;
