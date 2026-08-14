import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Courses.css";

const courses = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Learn HTML, CSS and JavaScript to build modern and interactive websites.",
    icon: "fa-solid fa-laptop-code",
  },
  {
    id: "java-programming",
    title: "Java Programming",
    description:
      "Learn Java programming, object-oriented concepts and application development.",
    icon: "fa-brands fa-java",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description:
      "Learn how to clean, analyze and visualize data to find useful insights.",
    icon: "fa-solid fa-chart-column",
  },
  {
    id: "python-programming",
    title: "Python Programming",
    description:
      "Learn Python fundamentals, control flow and important data structures.",
    icon: "fa-brands fa-python",
  },
  {
    id: "database-management",
    title: "Database Management",
    description:
      "Learn DBMS, SQL, database design, keys and data organization.",
    icon: "fa-solid fa-database",
  },
  {
    id: "cyber-security",
    title: "Cyber Security Fundamentals",
    description:
      "Learn the fundamentals of cyber security, network protection and online safety.",
    icon: "fa-solid fa-shield-halved",
  },
];

function Courses() {
  const navigate = useNavigate();

  const openCourse = (course) => {
    localStorage.setItem("selectedCourse", course.title);
    navigate("/course-details");
  };

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
        {/* Header Hero Section */}
        <section className="home-hero" style={{ padding: "64px 0 48px" }}>
          <div className="orb-container">
            <div className="orb orb-mint" style={{ top: "-100px", left: "20%" }}></div>
            <div className="orb orb-sky" style={{ bottom: "-100px", right: "20%" }}></div>
          </div>

          <div className="home-container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
            <div className="badge-pill">Our Curriculum</div>
            <h1 className="hero-title" style={{ fontSize: "48px", marginBottom: "12px" }}>Browse Courses</h1>
            <p className="hero-description" style={{ margin: "0 auto", maxWidth: "600px" }}>
              Explore our courses and build your skills with structured lessons, practical examples, and guided checkpoints.
            </p>
          </div>
        </section>

        {/* Courses Grid Section */}
        <section className="home-features" style={{ padding: "64px 0" }}>
          <div className="home-container">
            <div className="features-grid">
              {courses.map((course) => (
                <div
                  className="feature-card"
                  key={course.id}
                  onClick={() => openCourse(course)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <div className="feature-icon-wrapper">
                      <i className={course.icon}></i>
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                  <button
                    className="btn-outline"
                    onClick={(event) => {
                      event.stopPropagation();
                      openCourse(course);
                    }}
                    style={{ height: "32px", fontSize: "13px", padding: "0 14px", marginTop: "24px", alignSelf: "flex-start" }}
                  >
                    Explore Course →
                  </button>
                </div>
              ))}
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

export default Courses;