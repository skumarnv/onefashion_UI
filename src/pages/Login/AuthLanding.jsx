// src/pages/Login/AuthLanding.jsx
import React, { useState } from "react";
import "./AuthLanding.css";

const AuthLanding = ({ onLogin }) => {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  
  // Controlled form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setError("");
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signin") {
      if (!username || !password) {
        setError("Please enter both username and password.");
        return;
      }

      // Dummy credentials check: admin / password123
      if (username === "admin" && password === "password123") {
        if (onLogin) {
          onLogin({ name: "Admin User", username: username });
        }
      } else {
        setError("Invalid credentials! Try admin / password123");
      }
    } else {
      if (!fullName || !email || !signupPassword) {
        setError("Please fill in all registration fields.");
        return;
      }

      // Successful dummy sign up automatically logs the user in
      if (onLogin) {
        onLogin({ name: fullName, username: email });
      }
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        {/* LEFT PANEL */}
        <div className="auth-left">
          {/* Avatar */}
          <div className="auth-avatar">
            <div className="auth-avatar-circle">
              <span className="auth-avatar-icon">👤</span>
            </div>
          </div>

          {/* Title text based on mode */}
          <h2 className="auth-title">
            {mode === "signin" ? "Sign in to your account" : "Create a new account"}
          </h2>

          {/* Error Message Alert */}
          {error && (
            <div style={{
              color: "#ef4444",
              fontSize: "12px",
              textAlign: "center",
              marginBottom: "12px",
              padding: "6px",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "8px",
              fontWeight: "500"
            }}>
              {error}
            </div>
          )}

          {/* SLIDER WRAPPER */}
          <div className="auth-form-outer">
            <div
              className={`auth-form-slider ${
                mode === "signup" ? "auth-form-slider--signup" : ""
              }`}
            >
              {/* SIGN IN FORM */}
              <form className="auth-form auth-panel" onSubmit={handleSubmit}>
                <div className="auth-input-group">
                  <label className="auth-label">Username</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">@</span>
                    <input
                      type="text"
                      placeholder="Enter username (admin)"
                      className="auth-input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">••</span>
                    <input
                      type="password"
                      placeholder="Enter password (password123)"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-options">
                  <label className="auth-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="auth-forgot">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="auth-btn">
                  Sign in
                </button>
              </form>

              {/* SIGN UP FORM */}
              <form className="auth-form auth-panel" onSubmit={handleSubmit}>
                <div className="auth-input-group">
                  <label className="auth-label">Full name</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">👤</span>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="auth-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-label">Email</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">@</span>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="auth-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">••</span>
                    <input
                      type="password"
                      placeholder="Create password"
                      className="auth-input"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="auth-btn">
                  Sign up
                </button>
              </form>
            </div>
          </div>

          {/* Dots */}
          <div className="auth-dots">
            <span className={`dot ${mode === "signin" ? "active" : ""}`} />
            <span className={`dot ${mode === "signup" ? "active" : ""}`} />
            <span className="dot" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          {/* Top nav */}
          <div className="auth-right-header">
            <div className="nav-links">
              <button className="nav-link active">Home</button>
              <button className="nav-link">Services</button>
              <button className="nav-link">About</button>
              <button className="nav-link">Contact</button>
            </div>

            {/* Button text changes based on current mode */}
            <button className="nav-signin" onClick={toggleMode}>
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </div>

          {/* Main text */}
          <div className="auth-right-content">
            <h1 className="welcome-title">
              {mode === "signin" ? "Welcome back." : "Join us."}
            </h1>
            <p className="welcome-text">
              {mode === "signin"
                ? "Sign in to continue exploring your personalized dashboard and features."
                : "Create an account in a few seconds and start your journey with us."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
