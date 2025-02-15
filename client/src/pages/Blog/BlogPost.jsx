import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./BlogPost.css"; // ✅ Import CSS

const GET_BLOG = gql`
    query GetBlog($id: ID!) {
        getBlog(id: $id) {
            title
            content
            image
            createdAt
        }
    }
`;

const cleanText = (text) => {
    return text.replace(/[#*_~`]/g, "").trim(); // ✅ Removes unwanted markdown symbols
};

const BlogPost = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_BLOG, { variables: { id } });

    if (loading) return <p className="loading-text">Loading blog post...</p>;
    if (error) return <p className="error-text">Error: {error.message}</p>;

    const { title, content, image, createdAt } = data.getBlog;

    return (
        <div className="blog-post-container">
            <Link to="/blog" className="back-button">← Back to Blog</Link> {/* ✅ Added Back Button */}
            <h1 className="blog-post-title">{cleanText(title)}</h1>
            <p className="blog-post-date">Published on {new Date(parseInt(createdAt)).toLocaleDateString()}</p>
            <img className="blog-post-image" src={image} alt={title} />
            <div className="blog-post-content">
                <p>{cleanText(content)}</p>
            </div>
        </div>
    );
};

export default BlogPost;