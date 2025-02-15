const axios = require("axios");
const cron = require("node-cron");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
require("dotenv").config({ path: __dirname + "/../.env" });

console.log("🔍 GOOGLE_GEMINI_API_KEY:", process.env.GOOGLE_GEMINI_API_KEY ? "Loaded" : "Missing");
console.log("🔍 NEWS_API_KEY:", process.env.NEWS_API_KEY ? "Loaded" : "Missing");
console.log("🔍 PEXELS_API_KEY:", process.env.PEXELS_API_KEY ? "Loaded" : "Missing");

// Ensure API keys are available
if (!process.env.GOOGLE_GEMINI_API_KEY || !process.env.NEWS_API_KEY || !process.env.PEXELS_API_KEY) {
    throw new Error("❌ Missing required API keys. Please check your .env file.");
}

// Connect to MongoDB (Optimized for faster execution)
async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/autoblog_app", {
                serverSelectionTimeoutMS: 5000, // Avoid long connection waits
                bufferCommands: false, // Prevents Mongoose from buffering queries
            });
            console.log("✅ MongoDB Connected Successfully!");
        } catch (error) {
            console.error("❌ MongoDB Connection Error:", error.message);
            process.exit(1);
        }
    }
}

// Fetch trending news from multiple categories (Ensures variety)
async function fetchNews() {
    await connectDB(); // Ensure MongoDB is connected before queries

    const apiKey = process.env.NEWS_API_KEY;
    const categories = ["technology", "health", "business", "science", "sports"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${randomCategory}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;

        if (!articles || articles.length === 0) {
            console.error("❌ No news articles found!");
            return null;
        }

        // Select a random article from the top 5 for better variety
        for (let i = 0; i < 5; i++) {
            const selectedArticle = articles[Math.floor(Math.random() * articles.length)];

            await connectDB();
            const existingBlog = await Blog.findOne({ title: selectedArticle.title });

            if (!existingBlog) {
                return selectedArticle; // Return the first unique article found
            }

            console.log("⚠️ Duplicate topic detected, trying another article...");
        }

        console.log("⚠️ All top 5 articles are duplicates. Fetching again...");
        return fetchNews(); // Recursively fetch a new topic
    } catch (error) {
        console.error("❌ Error fetching news:", error.message);
        return null;
    }
}

// Generate SEO-optimized blog post using Google Gemini
async function generateArticle(news) {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: `Write a detailed, engaging, and SEO-optimized blog post on the topic: "${news.title}".
                The article should include:
                - A compelling introduction that hooks the reader.
                - A well-structured body with valuable insights.
                - Use of bullet points or numbered lists where applicable.
                - A conclusion with a call to action.
                - Relevant SEO keywords: ${news.title}, latest news, trending, ${news.source.name}.
                - Meta description: "${news.description}" (expand on this in the post).
                `
            }]
        }]
    };

    try {
        const response = await axios.post(url, requestBody);
        return response.data.candidates[0].content.parts[0].text; // Extract AI-generated content
    } catch (error) {
        console.error("❌ Error generating article:", error.response ? error.response.data : error.message);
        return null;
    }
}

// Generate a high-quality image using Pexels
async function generateImage(title) {
    const apiKey = process.env.PEXELS_API_KEY;
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(title)}&per_page=1`;

    try {
        const response = await axios.get(url, {
            headers: { Authorization: apiKey },
        });

        if (response.data.photos.length > 0) {
            return response.data.photos[0].src.large; // Get a high-quality image
        } else {
            console.error("❌ No images found, using fallback.");
            return "https://via.placeholder.com/1024"; // Fallback image
        }
    } catch (error) {
        console.error("❌ Error generating image:", error.message);
        return "https://via.placeholder.com/1024"; // Fallback image
    }
}

// Create and save an AI-generated blog post
async function createBlogPost() {
    console.log("🔄 Fetching trending news...");
    const news = await fetchNews();
    if (!news) return;

    console.log("✍️ Generating AI-written blog post...");
    const article = await generateArticle(news);
    if (!article) return;

    console.log("🖼️ Generating AI-powered image...");
    const imageUrl = await generateImage(news.title);

    await connectDB(); // Ensure MongoDB is connected before saving

    console.log("💾 Saving blog post to database...");
    const newBlog = new Blog({
        title: news.title,
        content: article,
        image: imageUrl,
        seo_keywords: [news.title, news.source.name, "trending", "latest news"],
        meta_description: news.description,
        createdAt: new Date(),
    });

    try {
        await newBlog.save();
        console.log("✅ New AI-generated blog posted successfully!");
    } catch (error) {
        console.error("❌ Error saving blog to database:", error.message);
    }
}

// Run the AI Blog Generator immediately (for testing)
(async () => {
    await createBlogPost();
})();

// **🚀 Run the AI Blog Generator every 10 minutes instead of 3 hours**
cron.schedule("*/10 * * * *", async () => {
    console.log("⏳ Scheduled task: Running AI Blog Generation...");
    await createBlogPost();
});