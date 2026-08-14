import React, { useState, FormEvent, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../../Services/AuthServices";
import "./ProfileSettings.css";

interface ErrorResponse {
  message: string;
  statusCode: number;
}

function ProfileSettings(): React.JSX.Element {
  const navigate = useNavigate();
  const authServices = AuthServices.getInstance();
  const userInfo = authServices.getUserInfo();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Load user info from localStorage on mount
  useEffect(() => {
    if (userInfo.name) setName(userInfo.name);
    if (userInfo.email) setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name?: string; email?: string }) => {
      if (!userInfo.userId) {
        throw new Error("User not authenticated");
      }
      return await authServices.updateProfile(
        userInfo.userId,
        data.name,
        data.email
      );
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!", {
        description: "Your information has been saved.",
      });
      
      // Update local state with response
      setName(data.name);
      setEmail(data.email);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as ErrorResponse | undefined;
        const statusCode = error.response?.status;
        const errorMessage = errorData?.message || error.message;

        switch (statusCode) {
          case 404:
            toast.error("User Not Found", {
              description: errorMessage || "Your account could not be found.",
            });
            break;
          case 409:
            toast.error("Email Already Exists", {
              description: errorMessage || "This email is already in use.",
            });
            break;
          case 500:
            toast.error("Server Error", {
              description: errorMessage || "Please try again later.",
            });
            break;
          default:
            toast.error("Update Failed", {
              description: "Unable to update profile. Please try again.",
            });
        }
      } else {
        toast.error("Unexpected Error", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Invalid Name", {
        description: "Name cannot be empty.",
      });
      return;
    }

    if (!email.trim()) {
      toast.error("Invalid Email", {
        description: "Email cannot be empty.",
      });
      return;
    }

    // Check if anything changed
    if (name === userInfo.name && email === userInfo.email) {
      toast.info("No Changes", {
        description: "No changes were made to your profile.",
      });
      return;
    }

    const updates: { name?: string; email?: string } = {};
    if (name !== userInfo.name) updates.name = name;
    if (email !== userInfo.email) updates.email = email;

    updateProfileMutation.mutate(updates);
  };

  return (
    <main className="profile-settings-main">
      {/* Page Heading */}
      <div className="profile-settings-heading">
        <div>
          <span className="dashboard-label">STUDENT AREA</span>
          <h1>Profile & Settings ⚙️</h1>
          <p>Manage your profile information and account preferences.</p>
        </div>
      </div>

      {/* Profile Card */}
      <section className="profile-card">
        <div className="profile-card-heading">
          <div className="large-profile-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <h2>{userInfo.name || "Student"}</h2>
            <p>E-Learning Platform {userInfo.role || "Student"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="settings-section">
            <h3>Personal Information</h3>
            <p className="settings-description">
              Update your basic profile information.
            </p>

            <div className="settings-form-grid">
              <div className="settings-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={updateProfileMutation.isPending}
                  required
                />
              </div>
              <div className="settings-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={updateProfileMutation.isPending}
                  required
                />
              </div>
              <div className="settings-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled
                />
                <small style={{ color: "#666", fontSize: "0.85rem" }}>
                  Coming soon
                </small>
              </div>
              <div className="settings-field">
                <label>Course / Program</label>
                <input
                  type="text"
                  placeholder="Enter your course"
                  disabled
                />
                <small style={{ color: "#666", fontSize: "0.85rem" }}>
                  Coming soon
                </small>
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
                <strong>{userInfo.role || "Student"}</strong>
              </div>
              <div className="account-info-item">
                <span>Enrolled Courses</span>
                <strong>0</strong>
              </div>
              <div className="account-info-item">
                <span>Certificates</span>
                <strong>0</strong>
              </div>
              <div className="account-info-item">
                <span>Average Progress</span>
                <strong>0%</strong>
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
                  <input type="checkbox" defaultChecked disabled />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div>
                  <strong>Course Reminders</strong>
                  <p>Get reminders to continue your learning progress.</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked disabled />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            <small style={{ color: "#666", fontSize: "0.85rem" }}>
              Preference controls coming soon
            </small>
          </div>

          {/* Save Button */}
          <div className="settings-actions">
            <button
              type="submit"
              className="save-settings-btn"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="cancel-settings-btn"
              onClick={() => navigate("/dashboard")}
              disabled={updateProfileMutation.isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ProfileSettings;
