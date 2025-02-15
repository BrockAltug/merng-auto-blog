const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // Prevents warnings

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/autoblog_app";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Shortens timeout if MongoDB is unreachable
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB isn't connecting
});

db.once("open", () => {
    console.log("✅ Connected to MongoDB!");
});

module.exports = db;