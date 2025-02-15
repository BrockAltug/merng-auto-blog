import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import BlogCard from "../../components/Blog/BlogCard";
import "./Blog.css"; // ✅ Import CSS

const GET_ALL_BLOGS = gql`
    query GetAllBlogs {
        getAllBlogs {
            id
            title
            content
            image
            createdAt
        }
    }
`;

const Blog = () => {
    const { loading, error, data } = useQuery(GET_ALL_BLOGS);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;

    if (loading) return <p className="text-center text-lg">Loading blogs...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    // Pagination logic
    const totalBlogs = data?.getAllBlogs.length || 0;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = data?.getAllBlogs.slice(startIndex, endIndex);

    return (
        <div className="blog-container">
            <h1 className="blog-title">Latest Blog Posts</h1>
            <div className="blog-grid">
                {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                        <BlogCard 
                            key={blog.id}
                            id={blog.id} // ✅ Pass ID for navigation
                            title={blog.title}
                            content={blog.content}
                            image={blog.image}
                            createdAt={blog.createdAt}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No blogs available.</p>
                )}
            </div>

            {/* ✅ Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        className="pagination-btn" 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1} // Disable if on first page
                    >
                        ← Previous
                    </button>
                    <span className="page-number">Page {currentPage} of {totalPages}</span>
                    <button 
                        className="pagination-btn" 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages} // Disable if on last page
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default Blog;