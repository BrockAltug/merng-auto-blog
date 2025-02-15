import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css"; // ✅ Import CSS for BlogCard

const cleanText = (text) => {
    return text.replace(/[#*_~`]/g, "").trim(); // ✅ Remove markdown characters
};

const BlogCard = ({ id, title, content, image, createdAt }) => {
    return (
        <div className="blog-card">
            <img className="blog-card-image" src={image} alt={title} />
            <div className="blog-card-content">
                <h2 className="blog-card-title">{cleanText(title)}</h2>
                <p className="blog-card-date">{new Date(parseInt(createdAt)).toLocaleDateString()}</p>
                <p className="blog-card-text">{cleanText(content).substring(0, 150)}...</p>
                <Link to={`/blog/${id}`} className="blog-read-more">Read More →</Link> {/* ✅ Link to single post */}
            </div>
        </div>
    );
};

export default BlogCard;