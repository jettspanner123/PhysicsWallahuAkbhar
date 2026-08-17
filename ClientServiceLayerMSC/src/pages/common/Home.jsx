import { useState, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import GradientWaves from "../../Animations/GradientWaves";
import "./Home.css";
import SpringOptions from "../../Animations/SpringOptions";
import LightRays from "../../Animations/LightRays";

function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState("0:00");
  const [progressVal, setProgressVal] = useState(0);

  const heroSectionRef = useRef();
  const secondSectoinRef = useRef();
  const ctaButtonSectionRef = useRef();
  const descriptionSectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start 10%", "end start"],
  });
  const { scrollYProgress: secondSectionScrollYProgress } = useScroll({
    target: secondSectoinRef,
    offset: ["start 80%", "start 20%"],
  });
  const { scrollYProgress: ctaButtonSectionScrollYProgress } = useScroll({
    target: ctaButtonSectionRef,
    offset: ["start end", "start 50%"],
  });

  const { scrollYProgress: descriptionSectionScrollYProgress } = useScroll({
    target: descriptionSectionRef,
    offset: ["start end", "start 40%"],
  });
  const { scrollYProgress: rootScrollProgress } = useScroll();

  const navbarBackgroundColorTransform = useSpring(
    useTransform(rootScrollProgress, [0, 0.2], [0, 0.5]),
    SpringOptions,
  );

  // MARK: Description Section Transforms
  const darkScreenWidthTransform = useSpring(
    useTransform(descriptionSectionScrollYProgress, [0, 1], [60, 100]),
    SpringOptions,
  );

  // MARK: CTA Button Section Transform
  const ctaButtonTransform = useSpring(
    useTransform(ctaButtonSectionScrollYProgress, [0, 1], [150, 0]),
    SpringOptions,
  );

  // MARK: Second Section Transform
  const secondSectionFirstCardTransform = useSpring(
    useTransform(secondSectionScrollYProgress, [0, 1], [200, 0]),
    SpringOptions,
  );

  const secondSectionSecondCardTransform = useSpring(
    useTransform(secondSectionScrollYProgress, [0, 1], [400, 0]),
    SpringOptions,
  );

  const secondSectionThirdCardTransform = useSpring(
    useTransform(secondSectionScrollYProgress, [0, 1], [600, 0]),
    SpringOptions,
  );

  // MARK: Hero Section Transform
  const heroSectionExampleCardColorTransform = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5],
      ["rgb(255,255,255)", "rgb(245,245,245)"],
    ),
    SpringOptions,
  );

  const heroSectionTopPilTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -450]),
    SpringOptions,
  );

  const heroSectionHeadingLineOneTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -300]),
    SpringOptions,
  );

  const heroSectionHeadingLineTwoTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -180]),
    SpringOptions,
  );

  const heroSectionDescriptionTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    SpringOptions,
  );

  const heroSectionButtonRightTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 250]),
    SpringOptions,
  );

  const heroSectionButtonRightBlurTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]),
    SpringOptions,
  );

  const heroSectionButtonRightOpacityTransform = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [1, 0]),
    SpringOptions,
  );

  const heroSectionButtonLeftTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -250]),
    SpringOptions,
  );

  const heroSectionButtonLeftBlurTransform = useSpring(
    useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]),
    SpringOptions,
  );

  const heroSectionButtonLeftOpacityTransform = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [1, 0]),
    SpringOptions,
  );

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
    20, 35, 15, 40, 25, 50, 30, 45, 10, 35, 25, 40, 15, 30, 25, 45, 20, 35, 15,
    50, 25, 40, 10, 35, 20, 45, 30, 40, 15, 30, 25, 50, 20, 35, 15, 40, 30, 45,
    10, 35,
  ];

  return (
    <ReactLenis root>
      <div className="home-page-wrapper">
        <motion.header
          style={{
            backgroundColor: useMotionTemplate`rgba(255,255,255, ${navbarBackgroundColorTransform})`,
          }}
          className="home-navbar"
        >
          <div className="home-container nav-inner-container">
            <div className="home-logo">E-Learn</div>

            <nav className="home-nav">
              <a href="/" className="home-nav-link">
                Home
              </a>
              <a href="/courses" className="home-nav-link">
                Courses
              </a>
              <a href="/about" className="home-nav-link">
                About Us
              </a>
              <a href="/contact" className="home-nav-link">
                Contact
              </a>
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
        </motion.header>

        <main>
          {/* Hero Section */}
          <section className="home-hero" ref={heroSectionRef}>
            <div className="hero-gradient-bg">
              <GradientWaves
                horizonColor="#2f00ea"
                waveColor="#ff00f7"
                crestColor="#00ff36"
                speed={0.4}
                amplitude={2.5}
                waveScale={0.6}
                waveRatio={0.9}
                swell={35}
                turbulence={20}
                tilt={1.11}
                zoom={1}
                height={5.5}
                fogDepth={15}
                detail="medium"
                brightness={1}
                opacity={1}
                grain
                grainIntensity={0.05}
                mouseInteraction
                parallaxStrength={0.5}
              />
            </div>

            <div className="home-container hero-inner-container">
              <div className="hero-content">
                <motion.div
                  style={{ translateY: heroSectionTopPilTransform }}
                  className="badge-pill"
                >
                  A New Way to Learn
                </motion.div>

                <motion.h1
                  style={{
                    translateY: heroSectionHeadingLineOneTransform,
                    lineHeight: "3rem",
                  }}
                  className="hero-title"
                >
                  Learn at the
                </motion.h1>
                <motion.h1
                  style={{
                    translateY: heroSectionHeadingLineTwoTransform,
                  }}
                  className="hero-title"
                >
                  speed of thought.
                </motion.h1>

                <motion.p
                  style={{
                    translateY: heroSectionDescriptionTransform,
                  }}
                  className="hero-description inline-block"
                >
                  Explore structural modules, engage with self-paced
                  checkpoints, and follow a learning methodology designed like a
                  quietly editorial magazine.
                </motion.p>

                <div className="hero-actions">
                  <a href="/courses">
                    <motion.button
                      style={{
                        translateX: heroSectionButtonLeftTransform,
                        filter: heroSectionButtonLeftBlurTransform,
                        opacity: heroSectionButtonLeftOpacityTransform,
                      }}
                      className="btn-primary"
                    >
                      Explore Courses
                    </motion.button>
                  </a>

                  <a href="/signup">
                    <motion.button
                      style={{
                        translateX: heroSectionButtonRightTransform,
                        filter: heroSectionButtonRightBlurTransform,
                        opacity: heroSectionButtonRightOpacityTransform,
                      }}
                      className="btn-outline backdrop-blur-3xl"
                    >
                      Get Started
                    </motion.button>
                  </a>
                </div>
              </div>

              <div className="hero-media">
                {/* Audio Waveform Card - Signature Component */}
                <motion.div
                  style={{
                    backgroundColor: heroSectionExampleCardColorTransform,
                  }}
                  className="audio-waveform-card"
                >
                  <div className="waveform-header">
                    <button
                      className="play-button-circular"
                      onClick={togglePlay}
                      aria-label={
                        isPlaying ? "Pause audio lecture" : "Play audio lecture"
                      }
                    >
                      {isPlaying ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="14"
                            y="4"
                            width="4"
                            height="16"
                            rx="1"
                          ></rect>
                          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z"></path>
                        </svg>
                      )}
                    </button>
                    <div className="track-info">
                      <span className="track-label">Sample Lesson</span>
                      <span className="track-title">
                        Introduction to Quantum Theory
                      </span>
                    </div>
                  </div>

                  <div className="waveform-visualization">
                    {baseHeights.map((height, i) => {
                      // If playing, fluctuate the heights slightly
                      const progressPct = (progressVal / 195) * 40;
                      const isActive = i <= progressPct;
                      let visualHeight = height;
                      if (isPlaying) {
                        visualHeight = Math.max(
                          10,
                          Math.min(50, height + Math.sin(progressVal + i) * 8),
                        );
                      }
                      return (
                        <div
                          key={i}
                          className={`waveform-bar ${isActive ? "active" : ""}`}
                          style={{
                            height: `${visualHeight}%`,
                            opacity: isPlaying
                              ? 0.7 + Math.sin(progressVal * 0.5 + i) * 0.3
                              : 1,
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="waveform-timer">
                    <span>{timer}</span>
                    <span>3:15</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="home-features">
            <div className="home-container">
              <div className="features-header" ref={secondSectoinRef}>
                <h2 className="features-title">Why choose our platform?</h2>
                <p className="features-sub">
                  We focus on depth and retention, eliminating the noise of
                  traditional online platforms.
                </p>
              </div>

              <div className="features-grid">
                <motion.div
                  style={{
                    translateY: secondSectionFirstCardTransform,
                  }}
                  className="feature-card"
                >
                  <div>
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-book-open"></i>
                    </div>
                    <h3>Structured Modules</h3>
                    <p>
                      Access carefully curated modules and reading paths
                      designed to mimic a clean print magazine layout.
                    </p>
                  </div>
                  <a
                    href="/courses"
                    className="btn-outline"
                    style={{
                      height: "32px",
                      fontSize: "13px",
                      padding: "0 14px",
                      marginTop: "16px",
                      alignSelf: "flex-start",
                    }}
                  >
                    Read Guide
                  </a>
                </motion.div>

                <motion.div
                  className="feature-card"
                  style={{
                    translateY: secondSectionSecondCardTransform,
                  }}
                >
                  <div>
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-pen-fancy"></i>
                    </div>
                    <h3>Quiet Checkpoints</h3>
                    <p>
                      Interact with low-stress quizzes and worksheets built
                      directly into the sidebar to test understanding.
                    </p>
                  </div>
                  <a
                    href="/courses"
                    className="btn-outline"
                    style={{
                      height: "32px",
                      fontSize: "13px",
                      padding: "0 14px",
                      marginTop: "16px",
                      alignSelf: "flex-start",
                    }}
                  >
                    Try Quiz
                  </a>
                </motion.div>

                {/* Special Gradient Orb Card */}
                <motion.div
                  className="gradient-orb-card"
                  style={{
                    translateY: secondSectionThirdCardTransform,
                  }}
                >
                  <div className="card-orb"></div>
                  <div className="gradient-orb-card-content">
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <h3>Progress Insight</h3>
                    <p>
                      Understand your learning curve through photographic, clear
                      analytical charts rather than gamified numbers.
                    </p>
                  </div>
                  <a
                    href="/signup"
                    className="btn-outline"
                    style={{
                      height: "32px",
                      fontSize: "13px",
                      padding: "0 14px",
                      marginTop: "16px",
                      alignSelf: "flex-start",
                      position: "relative",
                      zIndex: 5,
                    }}
                  >
                    View Dashboard
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Editorial Philosophy Section */}
          <section className="home-philosophy">
            <div className="home-container philosophy-inner-container">
              <div className="philosophy-left">
                <h2>
                  Our Philosophy.
                  <br />
                  Learning is not a race,
                  <br />
                  it is a practice.
                </h2>
              </div>
              <div className="philosophy-right">
                <p>
                  Traditional learning platforms gamify education to increase
                  session lengths, rewarding raw speed over deep comprehension.
                  We reject the constant noise of notifications and badges.
                </p>
                <p>
                  By borrowing layout principles from editorial magazines, we
                  cultivate a digital reading space where your attention is
                  protected. We present information clearly, respect whitespace,
                  and rely on quality content rather than flashing lights.
                </p>
              </div>
            </div>
          </section>

          {/* Pre-footer CTA */}
          <section ref={ctaButtonSectionRef} className="home-cta-band">
            <div className="orb-container">
              <div
                className="orb orb-peach"
                style={{ top: "10%", left: "30%" }}
              ></div>
            </div>
            <div className="home-container">
              <h2 className="cta-title">Begin your learning practice today.</h2>
              <div className="cta-button-container">
                <a href="/signup">
                  <motion.button
                    className="btn-primary"
                    style={{
                      padding: "12px 28px",
                      height: "46px",
                      translateY: ctaButtonTransform,
                    }}
                  >
                    Start Learning Free
                  </motion.button>
                </a>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section
            ref={descriptionSectionRef}
            className="relative h-[300vh] w-full bg-white"
          >
            <div className="sticky top-0 flex justify-center">
              <motion.div
                style={{
                  width: useMotionTemplate`${darkScreenWidthTransform}%`,
                }}
                className="h-screen bg-black relative"
              >
                <LightRays
                  raysOrigin="top-center"
                  raysColor="#ffffff"
                  raysSpeed={1}
                  lightSpread={0.5}
                  rayLength={3}
                  followMouse={true}
                  mouseInfluence={0.1}
                  noiseAmount={0}
                  distortion={0}
                  className="custom-rays"
                  pulsating={false}
                  fadeDistance={1}
                  saturation={1}
                />
              </motion.div>
            </div>
          </section>
        </main>

        {/* Editorial Footer */}
        <footer className="home-footer">
          <div className="home-container">
            <div className="footer-grid">
              <div className="footer-brand-column">
                <span className="footer-logo">E-Learn</span>
                <p className="footer-desc">
                  A quietly focused space for self-paced online education.
                </p>
              </div>

              <div className="footer-column">
                <h4>Product</h4>
                <div className="footer-links">
                  <a href="/courses" className="footer-link">
                    Courses
                  </a>
                  <a href="/about" className="footer-link">
                    Features
                  </a>
                  <a href="/courses" className="footer-link">
                    Checkpoints
                  </a>
                  <a href="/about" className="footer-link">
                    Methodology
                  </a>
                </div>
              </div>

              <div className="footer-column">
                <h4>Resources</h4>
                <div className="footer-links">
                  <a href="/about" className="footer-link">
                    Documentation
                  </a>
                  <a href="/about" className="footer-link">
                    Research
                  </a>
                  <a href="/about" className="footer-link">
                    Guides
                  </a>
                  <a href="/about" className="footer-link">
                    Community
                  </a>
                </div>
              </div>

              <div className="footer-column">
                <h4>Company</h4>
                <div className="footer-links">
                  <a href="/about" className="footer-link">
                    About Us
                  </a>
                  <a href="/about" className="footer-link">
                    Careers
                  </a>
                  <a href="/contact" className="footer-link">
                    Contact
                  </a>
                  <a href="/about" className="footer-link">
                    Press
                  </a>
                </div>
              </div>

              <div className="footer-column">
                <h4>Legal</h4>
                <div className="footer-links">
                  <a href="/about" className="footer-link">
                    Privacy Policy
                  </a>
                  <a href="/about" className="footer-link">
                    Terms of Service
                  </a>
                  <a href="/about" className="footer-link">
                    Accessibility
                  </a>
                  <a href="/about" className="footer-link">
                    Security
                  </a>
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
