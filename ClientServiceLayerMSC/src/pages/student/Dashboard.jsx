import React, { useState } from "react";
import "../../App.css";
import "./Dashboard.css";
import courseData from "../common/courseData";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const openCourse = (course) => {
    localStorage.setItem("selectedCourseId", course.id);
    localStorage.setItem("selectedCourse", course.title);

    window.location.href = `/course-details?id=${course.id}`;
  };

  const averageProgress = Math.round(
    courseData.reduce((total, course) => {
      const savedProgress = localStorage.getItem(
        `progress-${course.id}`
      );

      return total + (savedProgress ? Number(savedProgress) : 0);
    }, 0) / courseData.length
  );

  const getProgress = (course, index) => {
    const savedProgress = localStorage.getItem(
      `progress-${course.id}`
    );

    if (savedProgress) {
      return Number(savedProgress);
    }

    const defaultProgress = [75, 50, 40, 30, 25, 20];

    return defaultProgress[index] || 0;
  };

  /* =========================
     DASHBOARD HOME
  ========================= */

  const renderDashboard = () => {
    const continueCourses = courseData.slice(0, 3);

    return (
      <>
        <section className="dashboard-welcome">

          <div className="welcome-content">

            <span className="dashboard-label">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back, Student! 👋
            </h1>

            <p>
              Continue your learning journey, explore your
              courses and keep making progress toward your goals.
            </p>

          </div>

          <div className="welcome-icon">
            🎓
          </div>

        </section>


        {/* =========================
            STATISTICS
        ========================= */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon">
              📚
            </div>

            <div>
              <span>Enrolled Courses</span>
              <strong>{courseData.length}</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📈
            </div>

            <div>
              <span>Average Progress</span>
              <strong>{averageProgress}%</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📝
            </div>

            <div>
              <span>Assignments</span>
              <strong>{courseData.length}</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🏆
            </div>

            <div>
              <span>Certificates</span>
              <strong>0</strong>
            </div>

          </div>

        </section>


        {/* =========================
            CONTINUE LEARNING
        ========================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>
              <h2>Continue Learning</h2>

              <p>
                Pick up where you left off.
              </p>
            </div>

            <button
              className="dashboard-link-button"
              onClick={() => setActiveSection("courses")}
            >
              View All Courses →
            </button>

          </div>


          <div className="learning-cards">

            {continueCourses.map((course, index) => {

              const progress = getProgress(course, index);

              return (
                <div
                  className="learning-card"
                  key={course.id}
                >

                  <div className="learning-card-icon">
                    {getCourseIcon(course.id)}
                  </div>

                  <div className="learning-card-content">

                    <span className="course-category-small">
                      {course.category}
                    </span>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.description}
                    </p>


                    <div className="progress-info">

                      <span>
                        Progress
                      </span>

                      <strong>
                        {progress}%
                      </strong>

                    </div>


                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>

                    </div>


                    <button
                      className="continue-btn"
                      onClick={() => openCourse(course)}
                    >
                      Continue Learning
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* =========================
            RECENT ACTIVITY
        ========================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>
              <h2>Recent Activity</h2>

              <p>
                Your latest learning activities.
              </p>
            </div>

          </div>


          <div className="activity-list">

            <button
              className="activity-item"
              onClick={() =>
                openCourse(courseData[0])
              }
            >

              <span className="activity-icon">
                ✅
              </span>

              <div>

                <strong>
                  Completed HTML Fundamentals
                </strong>

                <p>
                  Web Development • 2 hours ago
                </p>

              </div>

              <span className="activity-arrow">
                →
              </span>

            </button>


            <button
              className="activity-item"
              onClick={() =>
                openCourse(courseData[1])
              }
            >

              <span className="activity-icon">
                📝
              </span>

              <div>

                <strong>
                  Continued Java Programming
                </strong>

                <p>
                  Java Programming • Yesterday
                </p>

              </div>

              <span className="activity-arrow">
                →
              </span>

            </button>


            <button
              className="activity-item"
              onClick={() =>
                openCourse(courseData[4])
              }
            >

              <span className="activity-icon">
                📊
              </span>

              <div>

                <strong>
                  Started Data Analytics
                </strong>

                <p>
                  Data Analytics • 2 days ago
                </p>

              </div>

              <span className="activity-arrow">
                →
              </span>

            </button>

          </div>

        </section>
      </>
    );
  };


  /* =========================
     MY COURSES
  ========================= */

  const renderMyCourses = () => {
    return (
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>My Courses</h2>

            <p>
              All your enrolled courses.
            </p>
          </div>

        </div>


        <div className="learning-cards">

          {courseData.map((course, index) => {

            const progress = getProgress(course, index);

            return (
              <div
                className="learning-card"
                key={course.id}
              >

                <div className="learning-card-icon">
                  {getCourseIcon(course.id)}
                </div>

                <div className="learning-card-content">

                  <span className="course-category-small">
                    {course.category}
                  </span>

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {course.description}
                  </p>


                  <div className="progress-info">

                    <span>
                      Progress
                    </span>

                    <strong>
                      {progress}%
                    </strong>

                  </div>


                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    ></div>

                  </div>


                  <button
                    className="continue-btn"
                    onClick={() => openCourse(course)}
                  >
                    Open Course →
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </section>
    );
  };


  /* =========================
     MY PROGRESS
  ========================= */

  const renderProgress = () => {
    return (
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>My Progress</h2>

            <p>
              Track your learning progress across all courses.
            </p>
          </div>

        </div>


        <div className="progress-course-list">

          {courseData.map((course, index) => {

            const progress = getProgress(course, index);

            return (
              <div
                className="progress-course-card"
                key={course.id}
              >

                <div className="progress-course-header">

                  <div>

                    <span className="progress-course-icon">
                      {getCourseIcon(course.id)}
                    </span>

                    <strong>
                      {course.title}
                    </strong>

                  </div>

                  <strong>
                    {progress}%
                  </strong>

                </div>


                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>

                </div>


                <p className="progress-course-text">
                  {progress === 0
                    ? "Not started yet"
                    : progress === 100
                    ? "Course completed"
                    : "Course in progress"}
                </p>

              </div>
            );
          })}

        </div>

      </section>
    );
  };


  /* =========================
     ASSIGNMENTS
  ========================= */

  const renderAssignments = () => {
    return (
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Assignments 📝</h2>

            <p>
              View assignments for all your enrolled courses.
            </p>
          </div>

        </div>


        <div className="dashboard-items-grid">

          {courseData.map((course) => (

            <div
              className="dashboard-info-card"
              key={course.id}
            >

              <div className="dashboard-item-icon">
                {getCourseIcon(course.id)}
              </div>

              <div className="dashboard-item-content">

                <span className="course-category-small">
                  {course.category}
                </span>

                <h3>
                  {course.title}
                </h3>

                <p>
                  Complete the assignments provided in
                  this course.
                </p>

                <span className="status-badge pending">
                  Pending
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>
    );
  };


  /* =========================
     QUIZZES
  ========================= */

  const renderQuizzes = () => {
    return (
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Quizzes 🧠</h2>

            <p>
              Test your knowledge across all six courses.
            </p>
          </div>

        </div>


        <div className="dashboard-items-grid">

          {courseData.map((course) => (

            <div
              className="dashboard-info-card"
              key={course.id}
            >

              <div className="dashboard-item-icon">
                {getCourseIcon(course.id)}
              </div>

              <div className="dashboard-item-content">

                <span className="course-category-small">
                  {course.category}
                </span>

                <h3>
                  {course.title}
                </h3>

                <p>
                  Take the quiz after completing the
                  related lessons.
                </p>

                <button
                  className="continue-btn"
                  onClick={() => openCourse(course)}
                >
                  Open Course Quiz →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>
    );
  };


  /* =========================
     CERTIFICATES
  ========================= */

  const renderCertificates = () => {
    return (
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Certificates 🏆</h2>

            <p>
              Your course certificates will appear here
              after successful completion.
            </p>
          </div>

        </div>


        <div className="dashboard-items-grid">

          {courseData.map((course, index) => {

            const progress = getProgress(course, index);
            const completed = progress === 100;

            return (
              <div
                className="dashboard-info-card certificate-card"
                key={course.id}
              >

                <div className="certificate-icon">
                  🏆
                </div>

                <div className="dashboard-item-content">

                  <span className="course-category-small">
                    {course.category}
                  </span>

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {completed
                      ? "You have completed this course and can receive a certificate."
                      : `Complete the course to unlock your certificate. Current progress: ${progress}%`}
                  </p>

                  <span
                    className={
                      completed
                        ? "status-badge"
                        : "status-badge pending"
                    }
                  >
                    {completed
                      ? "Certificate Available"
                      : "Not Earned Yet"}
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </section>
    );
  };


  /* =========================
     PROFILE & SETTINGS
  ========================= */

  const renderProfile = () => {
    return (
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Profile & Settings ⚙️</h2>

            <p>
              Manage your student profile and account.
            </p>
          </div>

        </div>


        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <div className="profile-information">

            <h3>
              Student
            </h3>

            <p>
              Student Account
            </p>

            <p>
              E-Learning Platform
            </p>

          </div>

        </div>


        <div className="dashboard-info-card">

          <div className="dashboard-item-content">

            <h3>
              Account Settings
            </h3>

            <p>
              Your account settings and profile information
              can be managed from this section.
            </p>

          </div>

        </div>

      </section>
    );
  };


  /* =========================
     CONTENT CONTROLLER
  ========================= */

  const renderContent = () => {

    if (activeSection === "courses") {
      return renderMyCourses();
    }

    if (activeSection === "progress") {
      return renderProgress();
    }

    if (activeSection === "assignments") {
      return renderAssignments();
    }

    if (activeSection === "quizzes") {
      return renderQuizzes();
    }

    if (activeSection === "certificates") {
      return renderCertificates();
    }

    if (activeSection === "profile") {
      return renderProfile();
    }

    return renderDashboard();
  };


  return (
    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="dashboard-header">

        <div className="dashboard-logo">
          E-Learning Platform
        </div>


        <div className="dashboard-user">

          <div className="user-avatar">
            👤
          </div>

          <div>
            <strong>
              Student
            </strong>

            <p>
              Welcome back!
            </p>
          </div>

        </div>

      </header>


      {/* =========================
          LAYOUT
      ========================= */}

      <div className="dashboard-layout">

        {/* SIDEBAR */}

        <aside className="dashboard-sidebar">

          <nav className="dashboard-nav">

            <button
              className={
                activeSection === "dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("dashboard")
              }
            >
              🏠 Dashboard
            </button>


            <button
              onClick={() =>
                (window.location.href = "/courses")
              }
            >
              📚 Browse Courses
            </button>


            <button
              className={
                activeSection === "courses"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("courses")
              }
            >
              🎓 My Courses
            </button>


            <button
              className={
                activeSection === "progress"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("progress")
              }
            >
              📈 My Progress
            </button>


            <button
              className={
                activeSection === "assignments"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("assignments")
              }
            >
              📝 Assignments
            </button>


            <button
              className={
                activeSection === "quizzes"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("quizzes")
              }
            >
              🧠 Quizzes
            </button>


            <button
              className={
                activeSection === "certificates"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("certificates")
              }
            >
              🏆 Certificates
            </button>


            <button
              className={
                activeSection === "profile"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("profile")
              }
            >
              ⚙️ Profile & Settings
            </button>

          </nav>


          <div className="dashboard-logout">

            <a href="/login">
              🚪 Logout
            </a>

          </div>

        </aside>


        {/* MAIN CONTENT */}

        <main className="dashboard-main">
          {renderContent()}
        </main>

      </div>

    </div>
  );
}


/* =========================
   COURSE ICONS
========================= */

function getCourseIcon(courseId) {

  const icons = {
    "web-development": "💻",
    "java-programming": "☕",
    "database-management": "🗄️",
    "python-programming": "🐍",
    "data-analytics": "📊",
    "cyber-security": "🔐",
  };

  return icons[courseId] || "📚";
}


export default Dashboard; 