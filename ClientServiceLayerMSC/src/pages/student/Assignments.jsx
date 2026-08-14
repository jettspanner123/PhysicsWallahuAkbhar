import "./Assignments.css";
import courseData from "../common/courseData.js";

const assignmentData = {
  "web-development": [
    {
      title: "HTML Fundamentals Assignment",
      module: "Module 2 — HTML Fundamentals",
      due: "12 Aug 2026",
      marks: "20 Marks",
      status: "Submitted",
    },
    {
      title: "CSS Responsive Design Task",
      module: "Module 3 — CSS Fundamentals",
      due: "15 Aug 2026",
      marks: "25 Marks",
      status: "Pending",
    },
  ],

  "java-programming": [
    {
      title: "Java Basics Programming Task",
      module: "Module 2 — Java Fundamentals",
      due: "13 Aug 2026",
      marks: "20 Marks",
      status: "Pending",
    },
    {
      title: "OOP Concepts Assignment",
      module: "Module 3 — Object-Oriented Programming",
      due: "18 Aug 2026",
      marks: "25 Marks",
      status: "Pending",
    },
  ],

  "database-management": [
    {
      title: "DBMS Fundamentals Assignment",
      module: "Module 1 — Introduction to DBMS",
      due: "14 Aug 2026",
      marks: "20 Marks",
      status: "Pending",
    },
    {
      title: "SQL Query Practice",
      module: "Module 3 — SQL Fundamentals",
      due: "19 Aug 2026",
      marks: "25 Marks",
      status: "Pending",
    },
  ],

  "python-programming": [
    {
      title: "Python Fundamentals Task",
      module: "Module 1 — Introduction to Python",
      due: "16 Aug 2026",
      marks: "20 Marks",
      status: "Pending",
    },
    {
      title: "Python Data Structures Assignment",
      module: "Module 4 — Functions and Data Structures",
      due: "21 Aug 2026",
      marks: "25 Marks",
      status: "Pending",
    },
  ],

  "data-analytics": [
    {
      title: "Data Preparation Assignment",
      module: "Module 2 — Data Collection & Preparation",
      due: "17 Aug 2026",
      marks: "20 Marks",
      status: "Pending",
    },
    {
      title: "Data Visualization Task",
      module: "Module 4 — Data Visualization",
      due: "22 Aug 2026",
      marks: "25 Marks",
      status: "Pending",
    },
  ],

  "cyber-security": [
    {
      title: "Cyber Security Fundamentals Task",
      module: "Module 1 — Introduction to Cyber Security",
      due: "18 Aug 2026",
      marks: "20 Marks",
      status: "Pending",
    },
    {
      title: "Cyber Threats & Attacks Assignment",
      module: "Module 2 — Cyber Threats & Attacks",
      due: "23 Aug 2026",
      marks: "25 Marks",
      status: "Pending",
    },
  ],
};

const courseIcons = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};

function Assignments() {
  const allAssignments = courseData.flatMap((course) =>
    (assignmentData[course.id] || []).map((assignment) => ({
      ...assignment,
      courseTitle: course.title,
      category: course.category,
      courseId: course.id,
    }))
  );

  const submittedCount = allAssignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const pendingCount = allAssignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  return (
    <main className="assignments-container">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="assignments-header">
        <div>
          <span className="assignments-label">
            STUDENT AREA
          </span>
          <h1>Assignments 📝</h1>
          <p>
            View your course assignments, deadlines and
            submission status in one place.
          </p>
        </div>
      </section>

      {/* =========================
          SUMMARY
      ========================= */}

      <section className="assignment-summary">
        <div className="assignment-summary-card">
          <div className="assignment-summary-icon">
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
          <div>
            <span>Total Assignments</span>
            <strong>{allAssignments.length}</strong>
          </div>
        </div>

        <div className="assignment-summary-card">
          <div className="assignment-summary-icon">
            <i className="fa-solid fa-check-circle"></i>
          </div>
          <div>
            <span>Submitted</span>
            <strong>{submittedCount}</strong>
          </div>
        </div>

        <div className="assignment-summary-card">
          <div className="assignment-summary-icon">
            <i className="fa-solid fa-hourglass-half"></i>
          </div>
          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>
      </section>

      {/* =========================
          ASSIGNMENT LIST
      ========================= */}

      <section className="assignments-section">
        <div className="assignments-section-heading">
          <div>
            <span className="assignments-label">
              YOUR WORK
            </span>
            <h2>All Assignments</h2>
            <p>
              Complete your pending assignments before
              their deadlines.
            </p>
          </div>
          <span className="assignment-course-count">
            {courseData.length} Courses
          </span>
        </div>

        <div className="assignment-list">
          {allAssignments.map((assignment, index) => (
            <article
              className="assignment-card"
              key={`${assignment.courseId}-${index}`}
            >
              {/* Assignment Icon */}
              <div className="assignment-icon">
                <i className={courseIcons[assignment.courseId] || "fa-solid fa-pen-to-square"}></i>
              </div>

              {/* Main Information */}
              <div className="assignment-content">
                <span className="assignment-category">
                  {assignment.category}
                </span>
                <h3>{assignment.title}</h3>
                <p className="assignment-course">
                  {assignment.courseTitle}
                </p>
                <p className="assignment-module">
                  {assignment.module}
                </p>

                <div className="assignment-meta">
                  <span>
                    <i className="fa-regular fa-calendar" style={{ marginRight: '4px' }}></i> Due: {assignment.due}
                  </span>
                  <span>
                    <i className="fa-solid fa-bullseye" style={{ marginRight: '4px' }}></i> {assignment.marks}
                  </span>
                </div>
              </div>

              {/* Status + Button */}
              <div className="assignment-action">
                <span
                  className={
                    assignment.status === "Submitted"
                      ? "assignment-status submitted"
                      : "assignment-status pending"
                  }
                >
                  {assignment.status === "Submitted"
                    ? "✓ Submitted"
                    : "● Pending"}
                </span>

                <a
                  href={`/course-details?id=${assignment.courseId}`}
                  className="assignment-btn"
                >
                  {assignment.status === "Submitted"
                    ? "View Course"
                    : "Open Assignment"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Assignments;