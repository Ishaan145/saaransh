// src/components/Navbar.jsx

import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../utilis/context";
import { motion, AnimatePresence } from "framer-motion";
import './Navbar.css'; // Import the new CSS file

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // The conditional logic to hide the navbar has been removed.
  const path = location.pathname.split("/")[1];

  const navLinkClass = ({ isActive }) =>
    isActive ? "navbar__link navbar__link--active" : "navbar__link";

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img src="/logo.png" alt="CivicTrack Logo" className="navbar__logo-img" />
            {/* The h1 tag with the text has been removed as requested */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar__desktop-nav">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/report" className={navLinkClass}>Report Issue</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          </nav>

          {/* CTA / User Section */}
          <div className="navbar__user-section">
             {currentUser ? (
              <Link to={`/dashboard`} className="btn">
                {currentUser.name || currentUser.firstName || 'Dashboard'}
              </Link>
            ) : (
              <Link to="/login" className="btn btn--outline">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="navbar__mobile-menu-button" onClick={() => setMenuOpen(true)}>
            <img src="/menu.png" alt="Menu" />
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-menu__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu__panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mobile-menu__header">
                <h2 className="mobile-menu__title">Menu</h2>
                <span className="mobile-menu__close" onClick={() => setMenuOpen(false)}>×</span>
              </div>
              <nav className="mobile-menu__nav">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/report" className={navLinkClass}>Report Issue</NavLink>
                <NavLink to="/about" className={navLinkClass}>About</NavLink>
                <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
                <hr className="mobile-menu__divider" />
                {currentUser ? (
                  <Link to={`/dashboard`} className="btn">
                    {currentUser.name || 'Dashboard'}
                  </Link>
                ) : (
                  <Link to="/login" className="btn">Login</Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
