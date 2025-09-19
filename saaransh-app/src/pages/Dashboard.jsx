// src/pages/Dashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the new CSS file

// Dummy data for the user's reported issues
const userIssues = [
  { id: '101', title: 'Broken swing in park', status: 'Resolved', date: '2025-07-20' },
  { id: '102', title: 'Flickering streetlight on 5th Ave', status: 'In Progress', date: '2025-07-28' },
  { id: '103', title: 'Uncollected garbage near school', status: 'Reported', date: '2025-08-01' },
];

// Dummy data for a user
const currentUser = {
    name: 'John Doe',
    joinDate: '2025-06-15'
}

const Dashboard = () => {
  const getStatusClass = (status) => {
    return `status--${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">My Dashboard</h1>
      <p className="page-subtitle">Welcome back, {currentUser.name}! Here's a summary of your activity.</p>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__value">3</div>
          <div className="stat-card__label">Issues Reported</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">1</div>
          <div className="stat-card__label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">1</div>
          <div className="stat-card__label">Resolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">48</div>
          <div className="stat-card__label">Community Rank</div>
        </div>
      </div>

      {/* User's Issues Table */}
      <div className="issues-table-container">
        <h2 className="section-title">Your Reported Issues</h2>
        <table className="issues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Reported</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userIssues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.title}</td>
                <td>{issue.date}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(issue.status)}`}>
                    {issue.status}
                  </span>
                </td>
                <td>
                  <Link to={`/issue/${issue.id}`} className="btn btn--small">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
