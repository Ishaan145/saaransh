// src/pages/AboutUs.jsx

import React from 'react';
import './About.css'; // Import the new CSS file

const teamMembers = [
  { name: 'Alex Johnson', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Maria Garcia', role: 'UX/UI Designer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Sam Lee', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
];

function About() {
  return (
    <div className="about-container">
      <div className="hero-section">
        <h1 className="page-title">Empowering Communities, One Report at a Time.</h1>
        <p className="page-subtitle">
          CivicTrack is a community-driven platform dedicated to making our neighborhoods better, safer, and cleaner by connecting citizens directly with local authorities.
        </p>
      </div>

      <div className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>See & Report</h3>
            <p>Spot a civic issue like a pothole or a broken streetlight? Snap a photo and report it in seconds through our simple form.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Track & Engage</h3>
            <p>Your report is instantly visible to your neighbors and local authorities. Track its status from "Reported" to "Resolved".</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Resolve & Improve</h3>
            <p>Authorities get clear, actionable data to address problems efficiently, leading to a better community for everyone.</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <img src={member.image} alt={member.name} className="team-member-image" />
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
