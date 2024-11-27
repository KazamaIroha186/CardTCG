import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavbarUnauth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  // Function to log the user out
  const handleLogout = () => {
    localStorage.removeItem("user-login");
    setUsername(""); // Clear username or handle logout appropriately
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Optional space for logo or navigation links */}
        <h1>TCG</h1> {/* Example logo or title */}
      </div>

      <div className="nav-right">
        {localStorage.getItem("user-login") ? (
          // If the user is logged in, show the logged-in navbar
          <>
            <button className="btn add-card" onClick={() => navigate('/home')}>
              Add Card
            </button>
            <span className="username">{username}</span>
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // If the user is not logged in, show login/signup buttons
          <>
            <button className="btn login" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn signup" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarUnauth;
