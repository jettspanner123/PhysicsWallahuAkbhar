import "./MyCourses.css";
import courseData from "../common/courseData.js";

const courseIcons = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};

const courseProgress = {
  "web-development": 75,
  "java-programming": 50,
  "database-management": 35,
  "python-programming": 25,
  "data-analytics": 30,
  "cyber-security": 15,
};

function MyCourses() {
  return (
    <main className="my-courses-main">

      {/* Page Heading */}
      <section className="my-courses-heading">
        <div>
          <span className="dashboard-label">
            STUDENT AREA
          </span>
          <h1>
            My Courses
          </h1>
          <p>
            Manage your enrolled courses and continue
            your learning journey.
          </p>
        </div>
      </section>

      {/* =========================
          COURSE GRID
      ========================= */}
      <section className="my-course-grid">
        {courseData.map((course) => {
          const progress = courseProgress[course.id] || 0;
          const iconClass = courseIcons[course.id] || "fa-solid fa-book";

          return (
            <div
              className="my-course-card"
              key={course.id}
            >
              {/* Course Icon */}
              <div className="my-course-icon">
                <i className={iconClass}></i>
              </div>

              {/* Course Content */}
              <div className="my-course-content">
                <span className="course-category-small">
                  {course.category}
                </span>

                <h2>
                  {course.title}
                </h2>

                <p>
                  {course.description}
                </p>

                {/* Course Information */}
                <div className="my-course-info">
                  <span>
                    <i className="fa-solid fa-book"></i> {course.lessons}
                  </span>
                  <span>
                    <i className="fa-solid fa-clock"></i> {course.duration}
                  </span>
                  <span>
                    <i className="fa-solid fa-star"></i> {course.rating}
                  </span>
                </div>

                {/* Progress */}
                <div className="progress-info">
                  <span>
                    Your Progress
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

                {/* Continue Button */}
                <a
                  href={`/course-details?id=${course.id}`}
                  className="continue-btn"
                >
                  Continue Course →
                </a>
              </div>
            </div>
          );
        })}
      </section>

    </main>
  );
}

export default MyCourses;