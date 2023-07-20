const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database Connected Sucessfully");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };

module.exports = connectDatabase;
