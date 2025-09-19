require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and then load routes
const startServer = async () => {
  await connectDB(); // ✅ Wait until DB is connected

  // API Routes
  const chatRoutes = require("./routes/chatRoutes");
  const userRoutes = require("./routes/userRoutes");
  const adminRoutes = require("./routes/adminRoutes");

  app.use("/api/chat", chatRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);

  // Static files
  app.use(express.static(path.join(__dirname, 'public')));

  // SPA fallback
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n✅ Server running at: http://localhost:${PORT}\n`);
  });
};

startServer();
