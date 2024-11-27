import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgetpass.css"; // Import the CSS file

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(""); // Clear any previous message

    try {
      // Simulated API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      setMessage("If the email exists, a reset link has been sent.");
    } catch (error) {
      setLoading(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forget-password-container">
      <h2 className="text">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forget-password-form">
        <div className="form-group">
          <label className="form-label">Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`form-button ${loading ? "button-disabled" : ""}`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
