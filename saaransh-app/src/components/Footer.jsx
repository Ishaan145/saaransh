// src/components/Footer.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Footer.css'; // Import the new CSS file

function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleClick = () => {
    if (!name || !email) return toast.error("Please fill in all the details.");
    if (!/^[a-zA-Z ]+$/.test(name)) return toast.error("Please enter a valid name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email.");

    console.log("Submitted data:", { name, email });
    toast.success("Thank you for subscribing!");
    setEmail("");
    setName("");
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          {/* Contact Form Section */}
          <div className="footer__section">
            <h2 className="footer__title">Stay Connected</h2>
            <p className="footer__subtitle">Get the latest updates and news from us.</p>
            <div className="footer__form">
              <input
                type="text"
                placeholder="Your Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button className="btn" onClick={handleClick}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer__section">
            <h2 className="footer__title">Quick Links</h2>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/report">Report an Issue</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer__section footer__section--contact">
            <h2 className="footer__title">Contact Info</h2>
            <p>📞 +91 73029 25785</p>
            <p>📧 support@civictracker.com</p>
            <div className="footer__socials">
              <Link to="https://www.instagram.com/" target="_blank"><img src="/insta.png" alt="Instagram" /></Link>
              <Link to="https://www.linkedin.com/" target="_blank"><img src="/linkedin.png" alt="LinkedIn" /></Link>
              <Link to="https://x.com/" target="_blank"><img src="/twitter.png" alt="Twitter" /></Link>
              <Link to="https://www.youtube.com/" target="_blank"><img src="/you.png" alt="YouTube" /></Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom-bar">
          &copy; {new Date().getFullYear()} CivicTracker. All rights reserved.
        </div>
      </footer>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default Footer;
