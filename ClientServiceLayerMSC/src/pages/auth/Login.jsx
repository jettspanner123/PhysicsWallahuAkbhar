import React from "react";
import "../common/Home.css";
import "./Login.css";

function Login() {
  return (
    <div className="home-page-wrapper">
      <div className="auth-page-main">
        <div className="auth-card auth-card-wide">
          <h1>Welcome Back</h1>

          <p className="auth-subtitle">
            Login to continue your learning journey.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <div className="form-row">
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

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn-primary auth-submit">
              Login
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a href="/signup">Create an account</a>
          </p>

          <a href="/" className="back-home">
            ← Back to E-Learn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;