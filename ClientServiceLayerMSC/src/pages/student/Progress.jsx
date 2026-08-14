import "../common/Progress.css";
import courseData from "../common/courseData.js";

const courseProgress = {
  "web-development": 75,
  "java-programming": 50,
  "database-management": 35,
  "python-programming": 25,
  "data-analytics": 30,
  "cyber-security": 15,
};

const completedLessons = {
  "web-development": 24,
  "java-programming": 20,
  "database-management": 10,
  "python-programming": 9,
  "data-analytics": 9,
  "cyber-security": 4,
};

function Progress() {
  const totalProgress = Math.round(
    Object.values(courseProgress).reduce(
      (total, progress) => total + progress,
      0
    ) / courseData.length
  );

  return (
    <main className="progress-container">

      {/* =========================
          PAGE HEADING
      ========================= */}

      <section className="progress-heading">

        <div>

          <span className="progress-label">
            STUDENT AREA
          </span>

          <h1>
            My Progress
          </h1>

          <p>
            Track your learning progress across
            E-Learning Platform and stay on top of
            your learning goals.
          </p>

        </div>

      </section>


      {/* =========================
          OVERALL PROGRESS
      ========================= */}

      <section className="overall-progress-card">

        <div className="overall-progress-top">

          <div>

            <span className="progress-card-label">
              OVERALL PERFORMANCE
            </span>

            <h2>
              Overall Learning Progress
            </h2>

            <p>
              Keep learning and complete your courses
              to achieve your goals.
            </p>

          </div>

          <div className="overall-progress-number">
            {totalProgress}%
          </div>

        </div>


        <div className="overall-progress-info">

          <span>
            Overall Progress
          </span>

          <strong>
            {totalProgress}%
          </strong>

        </div>


        <div className="overall-progress-bar">

          <div
            className="overall-progress-fill"
            style={{
              width: `${totalProgress}%`,
            }}
          ></div>

        </div>

      </section>


      {/* =========================
          COURSE-WISE PROGRESS
      ========================= */}

      <section className="course-progress-section">

        <div className="course-progress-heading">

          <div>

            <span className="progress-label">
              YOUR COURSES
            </span>

            <h2>
              Course-wise Progress
            </h2>

            <p>
              View your progress in each enrolled course.
            </p>

          </div>

          <span className="course-count">
            {courseData.length} Courses
          </span>

        </div>


        <div className="course-progress-grid">

          {courseData.map((course) => {

            const progress =
              courseProgress[course.id] || 0;

            const completed =
              completedLessons[course.id] || 0;

            const totalLessons =
              parseInt(course.lessons) || 0;

            const courseIcons = {
              "web-development": "fa-solid fa-laptop-code",
              "java-programming": "fa-solid fa-mug-hot",
              "database-management": "fa-solid fa-database",
              "python-programming": "fa-solid fa-code",
              "data-analytics": "fa-solid fa-chart-bar",
              "cyber-security": "fa-solid fa-shield-halved",
            };

            return (

              <article
                className="course-progress-card"
                key={course.id}
              >

                {/* Card Header */}

                <div className="course-progress-card-top">

                  <div>

                    <span className="course-progress-category">
                      {course.category}
                    </span>

                    <h3>
                      <i className={courseIcons[course.id] || "fa-solid fa-book"}></i> {course.title}
                    </h3>

                  </div>

                  <div className="course-progress-percent">
                    {progress}%
                  </div>

                </div>


                {/* Progress Bar */}

                <div className="course-progress-bar">

                  <div
                    className="course-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>

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
                    <span className="status-completed">
                      ✓ Course Completed
                    </span>
                  ) : progress >= 50 ? (
                    <span className="status-progress">
                      ● In Progress
                    </span>
                  ) : (
                    <span className="status-started">
                      ○ Getting Started
                    </span>
                  )}

                  <a
                    href={`/course-details?id=${course.id}`}
                    className="progress-course-btn"
                  >
                    Continue <i className="fa-solid fa-arrow-right"></i>
                  </a>

                </div>

              </article>

            );

          })}

        </div>

      </section>

    </main>
  );
}

export default Progress;