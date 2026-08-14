import "../../App.css";
import "./MyCourses.css";
import courseData from "../common/courseData.js";

const courseIcons = {
  "web-development": "💻",
  "java-programming": "☕",
  "database-management": "🗄️",
  "python-programming": "🐍",
  "data-analytics": "📊",
  "cyber-security": "🔐",
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
    <div className="my-courses-page">

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
            <strong>Student</strong>
            <p>My Learning</p>
          </div>

        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="my-courses-main">

        {/* Page Heading */}

        <div className="my-courses-heading">

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

          <a
            href="/dashboard"
            className="back-dashboard"
          >
            ← Dashboard
          </a>

        </div>


        {/* =========================
            COURSE GRID
        ========================= */}

        <section className="my-course-grid">

          {courseData.map((course) => {

            const progress =
              courseProgress[course.id] || 0;

            const icon =
              courseIcons[course.id] || "📚";

            return (

              <div
                className="my-course-card"
                key={course.id}
              >

                {/* Course Icon */}

                <div className="my-course-icon">
                  {icon}
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
                      📚 {course.lessons}
                    </span>

                    <span>
                      ⏱️ {course.duration}
                    </span>

                    <span>
                      ⭐ {course.rating}
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

    </div>
  );
}

export default MyCourses;