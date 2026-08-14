import "./Certificates.css";

function Certificates() {
  const certificates = [
    {
      id: 1,
      course: "Web Development",
      category: "Development",
      status: "Completed",
      date: "15 July 2026",
      certificateId: "ELP-WEB-001",
      icon: "fa-solid fa-laptop-code",
    },
    {
      id: 2,
      course: "Java Programming",
      category: "Programming",
      status: "Completed",
      date: "28 July 2026",
      certificateId: "ELP-JAVA-002",
      icon: "fa-solid fa-mug-hot",
    },
    {
      id: 3,
      course: "Data Analytics",
      category: "Data",
      status: "In Progress",
      date: "-",
      certificateId: "-",
      icon: "fa-solid fa-chart-bar",
    },
    {
      id: 4,
      course: "Python Programming",
      category: "Programming",
      status: "In Progress",
      date: "-",
      certificateId: "-",
      icon: "fa-solid fa-code",
    },
    {
      id: 5,
      course: "Database Management",
      category: "Database",
      status: "In Progress",
      date: "-",
      certificateId: "-",
      icon: "fa-solid fa-database",
    },
    {
      id: 6,
      course: "Cyber Security Fundamentals",
      category: "Security",
      status: "In Progress",
      date: "-",
      certificateId: "-",
      icon: "fa-solid fa-shield-halved",
    },
  ];

  return (
    <div className="certificates-main">
      {/* Heading */}
      <div className="certificates-heading">
        <div>
          <span className="dashboard-label">STUDENT AREA</span>
          <h1>Certificates</h1>
          <p>View your completed courses and earned certificates.</p>
        </div>
      </div>

      {/* Certificate Summary */}
      <div className="certificate-summary">
        <div className="certificate-summary-icon">
          <i className="fa-solid fa-trophy"></i>
        </div>
        <div>
          <span>Certificates Earned</span>
          <strong>2</strong>
        </div>
        <div className="certificate-summary-text">
          Keep learning and complete more courses to earn additional certificates.
        </div>
      </div>

      {/* Certificates */}
      <section className="certificate-section">
        <div className="certificate-section-heading">
          <div>
            <h2>My Certificates</h2>
            <p>Your course completion certificates.</p>
          </div>
        </div>

        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <div className="certificate-card" key={certificate.id}>
              <div className="certificate-card-top">
                <div className="certificate-icon">
                  <i className={certificate.icon}></i>
                </div>
                <span
                  className={
                    certificate.status === "Completed"
                      ? "certificate-status completed"
                      : "certificate-status progress"
                  }
                >
                  {certificate.status}
                </span>
              </div>

              <span className="certificate-category">{certificate.category}</span>
              <h3>{certificate.course}</h3>

              {certificate.status === "Completed" ? (
                <>
                  <div className="certificate-details">
                    <div>
                      <span>Completed On</span>
                      <strong>{certificate.date}</strong>
                    </div>
                    <div>
                      <span>Certificate ID</span>
                      <strong>{certificate.certificateId}</strong>
                    </div>
                  </div>
                  <button
                    className="certificate-btn"
                    onClick={() =>
                      alert(
                        `Certificate for ${certificate.course} is ready to view.`
                      )
                    }
                  >
                    <i className="fa-solid fa-award"></i> View Certificate
                  </button>
                </>
              ) : (
                <>
                  <p className="certificate-pending-text">
                    Complete this course to earn your certificate.
                  </p>
                  <a href="/courses" className="certificate-btn secondary">
                    Continue Course →
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Certificates;