import React from "react";
import "../common/Home.css";
import "./Login.css";

function Signup() {
  return (
    <div className="home-page-wrapper">
      <div className="auth-page-main">
        <div className="auth-card auth-card-wide">
          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Join E-Learn and start your learning journey.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/login";
            }}
          >
            {/* Side by side row 1: Name and Email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Side by side row 2: Password and Confirm Password */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <label className="remember-me signup-terms" style={{ textAlign: "left", marginTop: "4px" }}>
              <input type="checkbox" required />
              <span>I agree to the platform's terms and conditions.</span>
            </label>

            <button type="submit" className="btn-primary auth-submit">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}
            <a href="/login">Login here</a>
          </p>

          <a href="/" className="back-home">
            ← Back to E-Learn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;