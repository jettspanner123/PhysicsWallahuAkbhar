import React from "react";
import "./Home.css";
import "./Contact.css";

function Contact() {
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
        {/* Contact Hero */}
        <section className="home-hero" style={{ padding: "64px 0 48px" }}>
          <div className="orb-container">
            <div className="orb orb-mint" style={{ top: "-100px", left: "20%" }}></div>
            <div className="orb orb-sky" style={{ bottom: "-100px", right: "20%" }}></div>
          </div>

          <div className="home-container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
            <div className="badge-pill">Get In Touch</div>
            <h1 className="hero-title" style={{ fontSize: "48px", marginBottom: "12px" }}>Contact E-Learn</h1>
            <p className="hero-description" style={{ margin: "0 auto", maxWidth: "600px" }}>
              Have a question about our courses, enrollment, learning resources or your account? Our support team is here to help.
            </p>
          </div>
        </section>

        {/* Contact info grid & Form */}
        <section className="contact-page-main">
          <div className="home-container">
            <div className="contact-main-grid">
              {/* Left Column: Info */}
              <div className="contact-info-box">
                <h2>How Can We Help You?</h2>
                <p>
                  E-Learn is designed to provide students, instructors and administrators with a smooth and organized online learning experience. If you need assistance with any part of the platform, you can contact us through the details below or use the contact form.
                </p>

                <div className="contact-details-list">
                  <div className="contact-detail-card">
                    <div className="feature-icon-wrapper" style={{ margin: 0, minWidth: "44px" }}>
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="contact-detail-content">
                      <h3>Email Support</h3>
                      <p>support@elearn.com</p>
                      <small>For account, course and technical assistance.</small>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="feature-icon-wrapper" style={{ margin: 0, minWidth: "44px" }}>
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="contact-detail-content">
                      <h3>Support Team</h3>
                      <p>+91 98765 43210</p>
                      <small>Available for general platform support.</small>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="feature-icon-wrapper" style={{ margin: 0, minWidth: "44px" }}>
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="contact-detail-content">
                      <h3>Office</h3>
                      <p>Learning & Development Centre</p>
                      <small>Our support and administration centre.</small>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="feature-icon-wrapper" style={{ margin: 0, minWidth: "44px" }}>
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="contact-detail-content">
                      <h3>Support Hours</h3>
                      <p>Monday – Saturday</p>
                      <small>10:00 AM – 6:00 PM</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="contact-form-card">
                <h2>Send Us a Message</h2>
                <p>Fill in the form below and our team will respond to your query.</p>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-input" placeholder="Enter your full name" />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-input" placeholder="Enter your email address" />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" className="form-input" placeholder="Enter your subject" />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea className="form-textarea" rows="6" placeholder="Write your message here..."></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: "12px 24px", height: "44px", alignSelf: "flex-start", marginTop: "8px" }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Support Areas Grid */}
            <div className="support-section-box">
              <h2>What Can You Contact Us About?</h2>

              <div className="support-grid">
                <div className="feature-card">
                  <div>
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h3>Course & Enrollment</h3>
                    <p>Get help with course information, enrollment, access to learning materials and course-related questions.</p>
                  </div>
                </div>

                <div className="feature-card">
                  <div>
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-user-lock"></i>
                    </div>
                    <h3>Account & Login</h3>
                    <p>Contact our team if you experience problems with account access, login, registration or password recovery.</p>
                  </div>
                </div>

                <div className="feature-card">
                  <div>
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-laptop-code"></i>
                    </div>
                    <h3>Technical Support</h3>
                    <p>Report technical problems related to the platform, lessons, quizzes or other learning features.</p>
                  </div>
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

export default Contact;