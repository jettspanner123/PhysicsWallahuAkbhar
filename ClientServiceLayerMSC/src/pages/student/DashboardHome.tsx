import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CourseServices } from "../../Services/CourseServices";
import { AuthServices } from "../../Services/AuthServices";
import { EnrollmentModel } from "../../Models/EnrollmentModel";
import "./DashboardHome.css";

const courseIcons: Record<string, string> = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};

function DashboardHome(): React.JSX.Element {
  const navigate = useNavigate();
  const courseServices = CourseServices.getInstance();
  const authServices = AuthServices.getInstance();
  const { name } = authServices.getUserInfo();

  // Fetch enrolled courses
  const { data: enrolledResponse, isLoading } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => courseServices.getEnrolledCourses(),
  });

  const enrolled = enrolledResponse?.data || [];

  const averageProgress = enrolled.length > 0
    ? Math.round(enrolled.reduce((total: number, e: EnrollmentModel) => total + e.progress, 0) / enrolled.length)
    : 0;

  const continueCourses = enrolled.slice(0, 3);

  const getIconClass = (title: string): string => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return courseIcons[slug] || "fa-solid fa-book";
  };

  const openCourse = (courseId: string, courseTitle: string) => {
    localStorage.setItem("selectedCourseId", courseId);
    localStorage.setItem("selectedCourse", courseTitle);
    window.location.href = `/course-details?id=${courseId}`;
  };

  return (
    <>
      {/* ========================= WELCOME BANNER ========================= */}
      <section className="dash-welcome">
        <div className="dash-welcome-content">
          <h1>Welcome back, {name || "Student"} 👋</h1>
          <p>
            Continue your learning journey, explore your courses and keep making progress toward your goals.
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
            <strong>{enrolled.length}</strong>
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
            <strong>{enrolled.length}</strong>
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

        {isLoading ? (
          <div className="dash-loading">
            <div className="spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        ) : enrolled.length === 0 ? (
          <div className="dash-empty-state">
            <i className="fa-regular fa-compass"></i>
            <h3>No Enrolled Courses</h3>
            <p>You haven't enrolled in any courses yet. Start your journey by exploring our available catalog.</p>
            <button
              className="dash-primary-btn-empty"
              onClick={() => navigate("/dashboard/courses")}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="dash-course-grid">
            {continueCourses.map((enrollment: EnrollmentModel) => {
              const course = enrollment.course;
              if (!course) return null;
              const progress = enrollment.progress;
              const iconClass = getIconClass(course.title);

              return (
                <div className="dash-course-card" key={enrollment.id}>
                  <div className="dash-course-icon">
                    <i className={iconClass}></i>
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
                    onClick={() => openCourse(course.id, course.title)}
                  >
                    Continue Learning
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default DashboardHome;
