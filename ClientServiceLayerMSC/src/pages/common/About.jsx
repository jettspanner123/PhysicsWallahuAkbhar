import React from "react";
import "./Home.css";
import "./About.css";

function About() {
  return (
    <div className="home-page-wrapper">
      {/* Top Navbar */}
      <header className="home-navbar">
        <div className="home-container nav-inner-container">
          <div className="home-logo">E-Learn</div>

          <nav className="home-nav">
            <a href="/" className="home-nav-link">Home</a>
            <a href="/courses" className="home-nav-link">Courses</a>
            <a href="/about" className="home-nav-link">About Us</a>
            <a href="/contact" className="home-nav-link">Contact</a>
          </nav>

          <div className="home-nav-buttons">
            <a href="/login">
              <button className="btn-outline">Login</button>
            </a>

            <a href="/signup">
              <button className="btn-primary">Sign Up</button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* About Hero Section */}
        <section className="home-hero" style={{ padding: "64px 0 48px" }}>
          <div className="orb-container">
            <div className="orb orb-mint" style={{ top: "-100px", left: "20%" }}></div>
            <div className="orb orb-lavender" style={{ bottom: "-100px", right: "20%" }}></div>
          </div>

          <div className="home-container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
            <div className="badge-pill">About Us</div>
            <h1 className="hero-title" style={{ fontSize: "48px", marginBottom: "12px" }}>Learn. Grow. Achieve.</h1>
            <p className="hero-description" style={{ margin: "0 auto", maxWidth: "600px" }}>
              E-Learn is an online learning platform designed to provide students with a quiet, structured, and organized learning experience.
            </p>
          </div>
        </section>

        {/* Content Split Grid & Features */}
        <section className="about-page-main">
          <div className="home-container">
            {/* Split Grid: Our Platform / Our Goal */}
            <div className="about-split-grid">
              <div className="about-box-card">
                <h2>Our Platform</h2>
                <p>
                  E-Learn brings courses, lessons, assessments and learning progress together in one platform. Students can explore courses, enroll in suitable programs, complete lessons and evaluate their knowledge through assessments and quiet checks.
                </p>
              </div>

              <div className="about-box-card">
                <h2>Our Goal</h2>
                <p>
                  Our goal is to create a simple, accessible and engaging learning environment where students can develop their skills and instructors can manage educational content effectively without the noise of gamified numbers and badges.
                </p>
              </div>
            </div>

            {/* Features section: What We Offer */}
            <div className="about-offers-section">
              <h2>What We Offer</h2>
              
              <div className="about-features-grid">
                <div className="about-feature-card">
                  <div className="feature-icon-wrapper" style={{ marginBottom: "16px" }}>
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <h3>Online Courses</h3>
                  <p>Structured, modular courses with distinct lessons designed for deep retention.</p>
                </div>

                <div className="about-feature-card">
                  <div className="feature-icon-wrapper" style={{ marginBottom: "16px" }}>
                    <i className="fa-solid fa-bullseye"></i>
                  </div>
                  <h3>Learning Goals</h3>
                  <p>Configure quiet, personalized learning metrics to focus on progress instead of speed.</p>
                </div>

                <div className="about-feature-card">
                  <div className="feature-icon-wrapper" style={{ marginBottom: "16px" }}>
                    <i className="fa-solid fa-pen-fancy"></i>
                  </div>
                  <h3>Assessments</h3>
                  <p>Low-stress checks and guided checkpoints built directly inside the reading canvas.</p>
                </div>

                <div className="about-feature-card">
                  <div className="feature-icon-wrapper" style={{ marginBottom: "16px" }}>
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <h3>Progress Tracking</h3>
                  <p>Visual, clean analytical curves mapping your personal learning curves.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="home-footer">
        <div className="home-container">
          <div className="footer-grid">
            <div className="footer-brand-column">
              <span className="footer-logo">E-Learn</span>
              <p className="footer-desc">A quietly focused space for self-paced online education.</p>
            </div>
            
            <div className="footer-column">
              <h4>Product</h4>
              <div className="footer-links">
                <a href="/courses" className="footer-link">Courses</a>
                <a href="/about" className="footer-link">Features</a>
                <a href="/courses" className="footer-link">Checkpoints</a>
                <a href="/about" className="footer-link">Methodology</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <div className="footer-links">
                <a href="/about" className="footer-link">Documentation</a>
                <a href="/about" className="footer-link">Research</a>
                <a href="/about" className="footer-link">Guides</a>
                <a href="/about" className="footer-link">Community</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <div className="footer-links">
                <a href="/about" className="footer-link">About Us</a>
                <a href="/about" className="footer-link">Careers</a>
                <a href="/contact" className="footer-link">Contact</a>
                <a href="/about" className="footer-link">Press</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <div className="footer-links">
                <a href="/about" className="footer-link">Privacy Policy</a>
                <a href="/about" className="footer-link">Terms of Service</a>
                <a href="/about" className="footer-link">Accessibility</a>
                <a href="/about" className="footer-link">Security</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 E-Learn. All Rights Reserved.</span>
            <span>Designed under editorial brand guidelines.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;