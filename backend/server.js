const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

dotenv.config();
const app = express();

const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const primaryMongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shop-ease";
const fallbackMongoUri = "mongodb://127.0.0.1:27017/shop-ease";

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✓ MongoDB Connected to ${uri.substring(0, 50)}...`);
  } catch (err) {
    if (uri !== fallbackMongoUri) {
      console.warn("⚠ Primary MongoDB connection failed, trying local fallback...");
      await connectToDatabase(fallbackMongoUri);
      return;
    }

    console.error("✗ MongoDB connection error:", err.message);
    console.warn("⚠ Running without database. Set MONGO_URI environment variable for full functionality.");
  }
};

connectToDatabase(primaryMongoUri);

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/dist");
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  }
}

const PORT = process.env.PORT || 6000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const fallbackPort = Number(PORT) + 1;
      console.warn(`Port ${PORT} is busy. Trying ${fallbackPort} instead.`);
      app.listen(fallbackPort, () => {
        console.log(`Server running on port ${fallbackPort}`);
      });
    } else {
      console.error(err);
      process.exit(1);
    }
  });
};

startServer();
