import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CourseServices } from "../../Services/CourseServices";
import { EnrollmentModel } from "../../Models/EnrollmentModel";
import "../common/Progress.css";

const courseIcons: Record<string, string> = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};

function Progress(): React.JSX.Element {
  const courseServices = CourseServices.getInstance();

  // Fetch enrolled courses
  const { data: enrolledResponse, isLoading } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => courseServices.getEnrolledCourses(),
  });

  const enrolled = enrolledResponse?.data || [];

  const totalProgress = enrolled.length > 0
    ? Math.round(enrolled.reduce((total: number, e: EnrollmentModel) => total + e.progress, 0) / enrolled.length)
    : 0;

  const getSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const getIconClass = (title: string): string => {
    return courseIcons[getSlug(title)] || "fa-solid fa-book";
  };

  return (
    <main className="progress-container">
      {/* =========================
          PAGE HEADING
      ========================= */}
      <section className="progress-heading">
        <div>
          <span className="progress-label">STUDENT AREA</span>
          <h1>My Progress 📈</h1>
          <p>
            Track your learning progress across E-Learning Platform and stay on top of your learning goals.
          </p>
        </div>
      </section>

      {isLoading ? (
        <section className="overall-progress-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <div className="spinner"></div>
          <p style={{ marginLeft: '12px' }}>Loading progress tracking...</p>
        </section>
      ) : enrolled.length === 0 ? (
        <section className="overall-progress-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '40px', color: 'var(--muted-soft)', marginBottom: '16px' }}>
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h2 style={{ fontFamily: 'EB Garamond, serif', fontSize: '24px', margin: '0 0 8px', color: 'var(--ink)' }}>No Progress Found</h2>
          <p style={{ color: 'var(--body)', fontSize: '13px', maxWidth: '400px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            You aren't enrolled in any courses yet, so there is no progress to track.
          </p>
          <a href="/dashboard/courses" className="progress-course-btn" style={{ display: 'inline-flex', padding: '10px 20px', borderRadius: '20px', background: 'var(--primary)', color: 'var(--on-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '12.5px' }}>
            Browse Courses
          </a>
        </section>
      ) : (
        <>
          {/* =========================
              OVERALL PROGRESS
          ========================= */}
          <section className="overall-progress-card">
            <div className="overall-progress-top">
              <div>
                <span className="progress-card-label">OVERALL PERFORMANCE</span>
                <h2>Overall Learning Progress</h2>
                <p>Keep learning and complete your courses to achieve your goals.</p>
              </div>
              <div className="overall-progress-number">{totalProgress}%</div>
            </div>

            <div className="overall-progress-info">
              <span>Overall Progress</span>
              <strong>{totalProgress}%</strong>
            </div>

            <div className="overall-progress-bar">
              <div className="overall-progress-fill" style={{ width: `${totalProgress}%` }}></div>
            </div>
          </section>

          {/* =========================
              COURSE-WISE PROGRESS
          ========================= */}
          <section className="course-progress-section">
            <div className="course-progress-heading">
              <div>
                <span className="progress-label">YOUR COURSES</span>
                <h2>Course-wise Progress</h2>
                <p>View your progress in each enrolled course.</p>
              </div>
              <span className="course-count">{enrolled.length} Courses</span>
            </div>

            <div className="course-progress-grid">
              {enrolled.map((enrollment: EnrollmentModel) => {
                const course = enrollment.course;
                if (!course) return null;
                const progress = enrollment.progress;
                const totalLessons = parseInt(course.lessons) || 0;
                const completed = Math.round((progress / 100) * totalLessons);
                const iconClass = getIconClass(course.title);

                return (
                  <article className="course-progress-card" key={enrollment.id}>
                    {/* Card Header */}
                    <div className="course-progress-card-top">
                      <div>
                        <span className="course-progress-category">{course.category}</span>
                        <h3>
                          <i className={iconClass}></i> {course.title}
                        </h3>
                      </div>
                      <div className="course-progress-percent">{progress}%</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="course-progress-bar">
                      <div className="course-progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>

                    {/* Course Details */}
                    <div className="course-progress-details">
                      <span>
                        <i className="fa-solid fa-book"></i> {completed} of {totalLessons} lessons
                      </span>
                      <span>
                        <i className="fa-solid fa-clock"></i> {course.duration}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="course-progress-status">
                      {progress >= 100 ? (
                        <span className="status-completed">✓ Course Completed</span>
                      ) : progress >= 50 ? (
                        <span className="status-progress">● In Progress</span>
                      ) : (
                        <span className="status-started">○ Getting Started</span>
                      )}

                      <a href={`/course-details?id=${course.id}`} className="progress-course-btn">
                        Continue <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Progress;
