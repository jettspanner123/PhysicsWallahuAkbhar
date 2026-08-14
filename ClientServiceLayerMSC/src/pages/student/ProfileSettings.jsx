import "./ProfileSettings.css";

function ProfileSettings() {
  return (
    <main className="profile-settings-main">

      {/* Page Heading */}
      <div className="profile-settings-heading">
        <div>
          <span className="dashboard-label">
            STUDENT AREA
          </span>
          <h1>Profile & Settings</h1>
          <p>
            Manage your profile information and account preferences.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <section className="profile-card">

        <div className="profile-card-heading">
          <div className="large-profile-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <h2>Student</h2>
            <p>E-Learning Platform Student</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="settings-section">
          <h3>Personal Information</h3>
          <p className="settings-description">
            Update your basic profile information.
          </p>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label>Full Name</label>
              <input type="text" defaultValue="Student" placeholder="Enter your name" />
            </div>
            <div className="settings-field">
              <label>Email Address</label>
              <input type="email" defaultValue="student@example.com" placeholder="Enter your email" />
            </div>
            <div className="settings-field">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="settings-field">
              <label>Course / Program</label>
              <input type="text" defaultValue="B.Voc in Software Development" placeholder="Enter your course" />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="settings-section">
          <h3>Account Information</h3>
          <p className="settings-description">
            Basic information about your learning account.
          </p>

          <div className="account-info-grid">
            <div className="account-info-item">
              <span>Account Type</span>
              <strong>Student</strong>
            </div>
            <div className="account-info-item">
              <span>Enrolled Courses</span>
              <strong>3</strong>
            </div>
            <div className="account-info-item">
              <span>Certificates</span>
              <strong>2</strong>
            </div>
            <div className="account-info-item">
              <span>Average Progress</span>
              <strong>65%</strong>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-section">
          <h3>Learning Preferences</h3>
          <p className="settings-description">
            Manage your learning preferences.
          </p>

          <div className="preference-list">
            <div className="preference-item">
              <div>
                <strong>Email Notifications</strong>
                <p>Receive updates about courses, assignments and quizzes.</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div>
                <strong>Course Reminders</strong>
                <p>Get reminders to continue your learning progress.</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions">
          <button className="save-settings-btn" onClick={() => alert("Profile settings saved successfully!")}>
            Save Changes
          </button>
          <a href="/dashboard" className="cancel-settings-btn">
            Cancel
          </a>
        </div>

      </section>
    </main>
  );
}

export default ProfileSettings;