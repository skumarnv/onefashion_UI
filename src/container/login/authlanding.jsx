// src/AuthLanding.jsx
import React, { useState } from "react";
import "../../AuthLanding.css";

const AuthLanding = () => {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"

  const toggleMode = () => {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle login / signup submit here
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        {/* LEFT PANEL */}
        <div className="auth-left">
          {/* Logo */}
          {/* <div className="auth-logo">
            <div className="auth-logo-icon" />
            <div className="auth-logo-text">
              <span className="logo-main">Template</span>
              <span className="logo-sub">Design</span>
            </div>
          </div> */}

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
                      placeholder="Enter username"
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">••</span>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="auth-input"
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
