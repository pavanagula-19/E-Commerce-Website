const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Config
dotenv.config({ path: "backend/config/.env" });

// Connect to the database
const connectDatabase = require("./config/database")
connectDatabase()

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error, ${err.message}`);
  console.log("shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

const PORT = process.env.PORT;

const startServer = async () => {
  try {

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server is working on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
