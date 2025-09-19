import React, { useState, useEffect } from 'react';
import IssueCard from "../components/IssueCard";
import './Home.css'; // Import the CSS for the Home page

// Using more detailed dummy data to better showcase the design
const dummyIssues = [
  {
    id: 1,
    title: "Large Pothole on Elm Street",
    description: "A very large and dangerous pothole has formed near the intersection of Elm and Oak. It has already caused damage to several vehicles.",
    category: "Roads",
    image: "https://images.unsplash.com/photo-1515162816999-a0c474c8f1f7?q=80&w=2070&auto=format&fit=crop",
    status: "Reported",
    location: "Elm Street"
  },
  {
    id: 2,
    title: "Street Light Outage in Sector 7",
    description: "The main streetlight in the central park of Sector 7 has been out for three days, making the area unsafe at night.",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1620510942219-a2a0187428d9?q=80&w=1974&auto=format&fit=crop",
    status: "In Progress",
    location: "Sector 7 Park"
  },
  {
    id: 3,
    title: "Overflowing Garbage Bin",
    description: "The public garbage bin at the bus stop has not been emptied for over a week and is now overflowing, causing a bad smell.",
    category: "Cleanliness",
    image: "https://images.unsplash.com/photo-1579166453188-dfc613a7c337?q=80&w=1932&auto=format&fit=crop",
    status: "Resolved",
    location: "Main Bus Stop"
  },
   {
    id: 4,
    title: "Leaking Water Pipe",
    description: "A water supply pipe is leaking near the community hall, wasting a lot of water and creating a puddle on the road.",
    category: "Water Supply",
    image: "https://images.unsplash.com/photo-1559445262-63a585d8234e?q=80&w=1974&auto=format&fit=crop",
    status: "Reported",
    location: "Community Hall"
  },
];

function Home() {
  // State to hold the current filter values
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('5');
  
  // State to hold the issues that are displayed
  const [filteredIssues, setFilteredIssues] = useState(dummyIssues);

  // This effect runs whenever a filter changes
  useEffect(() => {
    let issuesToFilter = [...dummyIssues];

    // Apply status filter
    if (statusFilter !== 'all') {
      issuesToFilter = issuesToFilter.filter(issue => issue.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      issuesToFilter = issuesToFilter.filter(issue => issue.category === categoryFilter);
    }
    
    // NOTE: Distance filtering would require actual location data and calculations.
    // This is set up to be implemented later.

    setFilteredIssues(issuesToFilter);
  }, [statusFilter, categoryFilter, distanceFilter]);


  return (
    <div className="home-container">
      <h1 className="page-title">Community Issues</h1>
      <p className="page-subtitle">Browse and track issues reported by the community in your area.</p>

      {/* Filter Section */}
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select 
            id="status-filter" 
            className="form-control" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Reported">Reported</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select 
            id="category-filter" 
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Roads">Roads</option>
            <option value="Lighting">Lighting</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Water Supply">Water Supply</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="distance-filter">Distance</label>
          <select 
            id="distance-filter" 
            className="form-control"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
          >
            <option value="5">Up to 5km</option>
            <option value="3">Up to 3km</option>
            <option value="1">Up to 1km</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="issues-grid">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <p className="no-issues-message">No issues found matching your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
