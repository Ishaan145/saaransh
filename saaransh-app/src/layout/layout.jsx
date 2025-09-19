// src/layout/Layout.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// We need to import our main stylesheet here to make the classes available.
import '../App.css';

function Layout() {
  return (
    // This container will manage the overall page structure.
    <div className="app-container">
      <Navbar />
      {/* The Outlet will render the current page's content. */}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
