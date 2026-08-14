import { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./Home.css";

function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState("0:00");
  const [progressVal, setProgressVal] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Simple simulator for the play button waveform state
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressVal((prev) => {
          const next = prev + 1;
          if (next >= 195) {
            setIsPlaying(false);
            return 0;
          }
          // Format minutes and seconds
          const mins = Math.floor(next / 60);
          const secs = next % 60;
          setTimer(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
          return next;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Generate waveform bars with heights that fluctuate when playing
  const baseHeights = [
    20, 35, 15, 40, 25, 50, 30, 45, 10, 35, 25, 40, 15, 30, 25, 45, 20, 35, 15, 50, 
    25, 40, 10, 35, 20, 45, 30, 40, 15, 30, 25, 50, 20, 35, 15, 40, 30, 45, 10, 35
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <ReactLenis root>
      <div className="home-page-wrapper">
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
        {/* Hero Section */}
        <section className="home-hero">
          <div className="orb-container">
            <div className="orb orb-mint"></div>
            <div className="orb orb-lavender"></div>
          </div>

          <div className="home-container hero-inner-container">
            <motion.div 
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="badge-pill" variants={fadeInUp}>
                A New Way to Learn
              </motion.div>
              
              <motion.h1 className="hero-title" variants={fadeInUp}>
                Learn at the
                <br />
                speed of thought.
              </motion.h1>

              <motion.p className="hero-description" variants={fadeInUp}>
                Explore structural modules, engage with self-paced checkpoints, 
                and follow a learning methodology designed like a quietly editorial magazine.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeInUp}>
                <a href="/courses">
                  <button className="btn-primary">Explore Courses</button>
                </a>

                <a href="/signup">
                  <button className="btn-outline">Get Started</button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-media"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              {/* Audio Waveform Card - Signature Component */}
              <div className="audio-waveform-card">
                <div className="waveform-header">
                  <button 
                    className="play-button-circular" 
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause audio lecture" : "Play audio lecture"}
                  >
                    {isPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                        <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    )}
                  </button>
                  <div className="track-info">
                    <span className="track-label">Sample Lesson</span>
                    <span className="track-title">Introduction to Quantum Theory</span>
                  </div>
                </div>

                <div className="waveform-visualization">
                  {baseHeights.map((height, i) => {
                    // If playing, fluctuate the heights slightly
                    const progressPct = (progressVal / 195) * 40;
                    const isActive = i <= progressPct;
                    let visualHeight = height;
                    if (isPlaying) {
                      visualHeight = Math.max(10, Math.min(50, height + Math.sin(progressVal + i) * 8));
                    }
                    return (
                      <div 
                        key={i} 
                        className={`waveform-bar ${isActive ? "active" : ""}`}
                        style={{ 
                          height: `${visualHeight}%`,
                          opacity: isPlaying ? 0.7 + Math.sin(progressVal * 0.5 + i) * 0.3 : 1
                        }}
                      />
                    );
                  })}
                </div>

                <div className="waveform-timer">
                  <span>{timer}</span>
                  <span>3:15</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="home-features">
          <div className="home-container">
            <motion.div 
              className="features-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
            >
              <h2 className="features-title">Why choose our platform?</h2>
              <p className="features-sub">We focus on depth and retention, eliminating the noise of traditional online platforms.</p>
            </motion.div>

            <motion.div 
              className="features-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div 
                className="feature-card"
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="feature-icon-wrapper">
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <h3>Structured Modules</h3>
                  <p>Access carefully curated modules and reading paths designed to mimic a clean print magazine layout.</p>
                </div>
                <a href="/courses" className="btn-outline" style={{ height: "32px", fontSize: "13px", padding: "0 14px", marginTop: "16px", alignSelf: "flex-start" }}>
                  Read Guide
                </a>
              </motion.div>

              <motion.div 
                className="feature-card"
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="feature-icon-wrapper">
                    <i className="fa-solid fa-pen-fancy"></i>
                  </div>
                  <h3>Quiet Checkpoints</h3>
                  <p>Interact with low-stress quizzes and worksheets built directly into the sidebar to test understanding.</p>
                </div>
                <a href="/courses" className="btn-outline" style={{ height: "32px", fontSize: "13px", padding: "0 14px", marginTop: "16px", alignSelf: "flex-start" }}>
                  Try Quiz
                </a>
              </motion.div>

              {/* Special Gradient Orb Card */}
              <motion.div 
                className="gradient-orb-card"
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-orb"></div>
                <div className="gradient-orb-card-content">
                  <div className="feature-icon-wrapper">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <h3>Progress Insight</h3>
                  <p>Understand your learning curve through photographic, clear analytical charts rather than gamified numbers.</p>
                </div>
                <a href="/signup" className="btn-outline" style={{ height: "32px", fontSize: "13px", padding: "0 14px", marginTop: "16px", alignSelf: "flex-start", position: "relative", zIndex: 5 }}>
                  View Dashboard
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Editorial Philosophy Section */}
        <section className="home-philosophy">
          <motion.div 
            className="home-container philosophy-inner-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div className="philosophy-left" variants={fadeInUp}>
              <h2>
                Our Philosophy.
                <br />
                Learning is not a race,
                <br />
                it is a practice.
              </h2>
            </motion.div>
            <motion.div className="philosophy-right" variants={fadeInUp}>
              <p>
                Traditional learning platforms gamify education to increase session lengths, rewarding raw speed over deep comprehension. We reject the constant noise of notifications and badges.
              </p>
              <p>
                By borrowing layout principles from editorial magazines, we cultivate a digital reading space where your attention is protected. We present information clearly, respect whitespace, and rely on quality content rather than flashing lights.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Pre-footer CTA */}
        <section className="home-cta-band">
          <div className="orb-container">
            <div className="orb orb-peach" style={{ top: "10%", left: "30%" }}></div>
          </div>
          <motion.div 
            className="home-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <h2 className="cta-title">Begin your learning practice today.</h2>
            <div className="cta-button-container">
              <a href="/signup">
                <button className="btn-primary" style={{ padding: "12px 28px", height: "46px" }}>
                  Start Learning Free
                </button>
              </a>
            </div>
          </motion.div>
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
    </ReactLenis>
  );
}

export default Home;