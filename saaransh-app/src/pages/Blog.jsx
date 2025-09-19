// src/pages/Blog.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; // Import the new CSS file

const blogPosts = [
  {
    id: 1,
    title: '5 Tips for Writing an Effective Issue Report',
    excerpt: 'A great report gets faster results. Learn how to provide the right information to help authorities understand and act on your issue quickly.',
    author: 'Priya Sharma',
    date: 'July 28, 2025',
    image: 'https://images.unsplash.com/photo-1618080943039-8c4a836267a8?q=80&w=1974&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'How CivicTracker Data is Helping Local Municipalities',
    excerpt: 'We take a look at how the data collected on our platform provides valuable insights for city planning and resource allocation in Indian cities.',
    author: 'Rohan Mehta',
    date: 'July 22, 2025',
    image: 'https://images.unsplash.com/photo-1620714223084-86c9df242d53?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Community Spotlight: The Changemakers of Jayanagar',
    excerpt: 'Meet the residents of Jayanagar, Bengaluru, who have reported over 50 issues, leading to a cleaner and safer neighborhood for everyone.',
    author: 'Ananya Reddy',
    date: 'July 15, 2025',
    image: 'https://images.unsplash.com/photo-1599495882399-569474e375c3?q=80&w=2074&auto=format&fit=crop',
  },
    {
    id: 4,
    title: 'New Feature: Anonymous Reporting',
    excerpt: 'Your privacy matters. We are excited to announce that you can now report issues anonymously. Learn more about how it works.',
    author: 'Vikram Singh',
    date: 'July 10, 2025',
    image: 'https://images.unsplash.com/photo-1554224324-481352630134?q=80&w=2070&auto=format&fit=crop',
  },
];

const featuredPost = blogPosts.find(p => p.featured);
const otherPosts = blogPosts.filter(p => !p.featured);

function Blog() {
  return (
    <div className="blog-container">
      <h1 className="page-title">CivicTrack Blog</h1>
      <p className="page-subtitle">Updates, stories, and insights from the community.</p>

      {/* Featured Post */}
      {featuredPost && (
        <div className="featured-post-card">
          <img src={featuredPost.image} alt={featuredPost.title} className="featured-post-image" />
          <div className="featured-post-content">
            <h2 className="featured-post-title">
              <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
            </h2>
            <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
            <div className="post-meta">
              <span>By {featuredPost.author}</span> | <span>{featuredPost.date}</span>
            </div>
            <Link to={`/blog/${featuredPost.id}`} className="btn btn--small">Read More</Link>
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <h2 className="section-title">Recent Posts</h2>
      <div className="posts-grid">
        {otherPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-card-image" />
            <div className="post-card-content">
              <h3 className="post-card-title">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              <div className="post-meta">
                <span>By {post.author}</span> | <span>{post.date}</span>
              </div>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="post-card-link">Read More →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
