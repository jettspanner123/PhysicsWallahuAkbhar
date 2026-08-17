import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CourseServices } from "../../Services/CourseServices";
import { AssignmentServices } from "../../Services/AssignmentServices";
import { AuthServices } from "../../Services/AuthServices";
import "./CreateAssignment.css";

function CreateAssignment(): React.JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authServices = AuthServices.getInstance();
  const { role } = authServices.getUserInfo();

  const isInstructor = role === "TEACHER" || role === "ADMIN";

  const courseServices = CourseServices.getInstance();
  const assignmentServices = AssignmentServices.getInstance();

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { data: coursesCatalogResponse, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["coursesCatalog"],
    queryFn: () => courseServices.getCatalog(),
  });

  const catalog = coursesCatalogResponse?.data || [];

  const createAssignmentMutation = useMutation({
    mutationFn: (assignmentData: any) => assignmentServices.createAssignment(assignmentData),
    onSuccess: () => {
      toast.success("Assignment published successfully!", {
        description: "Students can now start submitting their work.",
      });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      navigate("/dashboard/assignments");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message;
      toast.error("Failed to publish assignment", { description: msg });
    },
  });

  if (!isInstructor) {
    return (
      <main className="create-assignment-container">
        <section className="forbidden-card">
          <i className="fa-solid fa-lock"></i>
          <h1>Access Forbidden</h1>
          <p>You do not have the required permissions to view this page. This page is only accessible to Teachers and Administrators.</p>
        </section>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourseId) {
      toast.error("Validation Error", { description: "Please select a course." });
      return;
    }
    if (!title.trim()) {
      toast.error("Validation Error", { description: "Please enter an assignment title." });
      return;
    }
    if (!description.trim()) {
      toast.error("Validation Error", { description: "Please enter assignment description details." });
      return;
    }
    if (!dueDate) {
      toast.error("Validation Error", { description: "Please select a due date." });
      return;
    }

    createAssignmentMutation.mutate({
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      courseId: selectedCourseId,
    });
  };

  return (
    <main className="create-assignment-container">
      {/* Page Heading */}
      <section className="assignment-heading-box">
        <div>
          <span className="assignment-label">INSTRUCTOR PANEL</span>
          <h1>Create Assignment 📝</h1>
          <p>Publish course assignments, describe submission criteria, and schedule due date guidelines.</p>
        </div>
      </section>

      {/* Form Card */}
      <section className="create-assignment-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row-grid">
            <div className="form-group">
              <label>Select Course</label>
              {isLoadingCourses ? (
                <div className="select-skeleton">Loading courses...</div>
              ) : (
                <select
                  className="form-select"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Course --</option>
                  {catalog.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="datetime-local"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Assignment Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Portfolio Website Layout with CSS Grid"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description & Requirements</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Detail assignment instructions, point counts, files to submit, and formatting specifications..."
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="assignment-action-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard/assignments")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary publish-assignment-btn"
              disabled={createAssignmentMutation.isPending}
            >
              <i className="fa-solid fa-cloud-arrow-up"></i> {createAssignmentMutation.isPending ? "Publishing..." : "Publish Assignment"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateAssignment;
