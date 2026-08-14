import React from "react";
import { useNavigate } from "react-router-dom";
import courseData from "../common/courseData";
import "./DashboardHome.css";


/* =========================
   COURSE ICON MAP
========================= */

const courseIcons = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};


/* =========================
   DASHBOARD HOME
========================= */

function DashboardHome() {
  const navigate = useNavigate();

  const getProgress = (course, index) => {
    const saved = localStorage.getItem(`progress-${course.id}`);
    if (saved) return Number(saved);
    const defaults = [75, 50, 40, 30, 25, 20];
    return defaults[index] || 0;
  };

  const averageProgress = Math.round(
    courseData.reduce((total, course) => {
      const saved = localStorage.getItem(`progress-${course.id}`);
      return total + (saved ? Number(saved) : 0);
    }, 0) / courseData.length
  );

  const continueCourses = courseData.slice(0, 3);

  const openCourse = (course) => {
    localStorage.setItem("selectedCourseId", course.id);
    localStorage.setItem("selectedCourse", course.title);
    window.location.href = `/course-details?id=${course.id}`;
  };


  return (
    <>
      {/* ========================= WELCOME BANNER ========================= */}

      <section className="dash-welcome">
        <div className="dash-welcome-content">
          <h1>Welcome back, Student 👋</h1>
          <p>
            Continue your learning journey, explore your courses
            and keep making progress toward your goals.
          </p>
        </div>

        <div className="dash-welcome-icon">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
      </section>


      {/* ========================= STATS ROW ========================= */}

      <section className="dash-stats">

        <div className="dash-stat-card">
          <div className="dash-stat-icon">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <div>
            <span>Enrolled Courses</span>
            <strong>{courseData.length}</strong>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon">
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div>
            <span>Average Progress</span>
            <strong>{averageProgress}%</strong>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon">
            <i className="fa-solid fa-clipboard-list"></i>
          </div>
          <div>
            <span>Assignments</span>
            <strong>{courseData.length}</strong>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <span>Certificates</span>
            <strong>0</strong>
          </div>
        </div>

      </section>


      {/* ========================= CONTINUE LEARNING ========================= */}

      <section className="dash-section-card">

        <div className="dash-section-heading">
          <div>
            <h2>Continue Learning</h2>
            <p>Pick up where you left off.</p>
          </div>

          <button
            className="dash-text-link"
            onClick={() => navigate("/dashboard/courses")}
          >
            View All Courses →
          </button>
        </div>

        <div className="dash-course-grid">
          {continueCourses.map((course, index) => {
            const progress = getProgress(course, index);

            return (
              <div className="dash-course-card" key={course.id}>

                <div className="dash-course-icon">
                  <i className={courseIcons[course.id] || "fa-solid fa-book"}></i>
                </div>

                <span className="dash-course-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <p>{course.description}</p>

                <div className="dash-progress-info">
                  <span>Progress</span>
                  <strong>{progress}%</strong>
                </div>

                <div className="dash-progress-bar">
                  <div
                    className="dash-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <button
                  className="dash-primary-btn"
                  onClick={() => openCourse(course)}
                >
                  Continue Learning
                </button>

              </div>
            );
          })}
        </div>

      </section>
    </>
  );
}


export default DashboardHome;
