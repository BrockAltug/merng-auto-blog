const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true }, // Ensures unique titles and trims spaces
    content: { type: String, required: true },
    image: { type: String, required: false, default: "" }, // Allows empty image instead of required
    createdAt: { type: Date, default: Date.now },
    seo_keywords: { type: [String], default: [] } // Ensures seo_keywords is always an array
});

// Ensures the collection name remains `blogs` instead of pluralizing in an unexpected way
const Blog = mongoose.model("Blog", blogSchema, "blogs");

module.exports = Blog;