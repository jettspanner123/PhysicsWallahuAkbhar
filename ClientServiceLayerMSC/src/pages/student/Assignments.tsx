import React, { useState } from "react";
import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CourseServices } from "../../Services/CourseServices";
import { AssignmentServices } from "../../Services/AssignmentServices";
import { AuthServices } from "../../Services/AuthServices";
import { EnrollmentModel } from "../../Models/EnrollmentModel";
import ConfirmDialog from "../../components/ConfirmDialog";
import "./Assignments.css";

const courseIcons: Record<string, string> = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};

function Assignments(): React.JSX.Element {
  const queryClient = useQueryClient();
  const courseServices = CourseServices.getInstance();
  const assignmentServices = AssignmentServices.getInstance();
  const authServices = AuthServices.getInstance();

  const { role } = authServices.getUserInfo();
  const isInstructor = role === "TEACHER" || role === "ADMIN";

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  // Fetch enrolled courses
  const { data: enrolledResponse, isLoading: isLoadingEnrolled } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => courseServices.getEnrolledCourses(),
  });

  const enrolled = enrolledResponse?.data || [];

  // Query assignments for all enrolled courses
  const courseQueries = useQueries({
    queries: enrolled.map((enrollment: EnrollmentModel) => {
      const courseId = enrollment.course?.id;
      return {
        queryKey: ["assignments", courseId],
        queryFn: () => assignmentServices.getAssignmentsByCourse(courseId!),
        enabled: !!courseId,
      };
    }),
  });

  const isLoadingAssignments = courseQueries.some((q) => q.isLoading);

  const getSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const getIconClass = (title: string): string => {
    return courseIcons[getSlug(title)] || "fa-solid fa-pen-to-square";
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => assignmentServices.deleteAssignment(id),
    onSuccess: () => {
      toast.success("Assignment deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (err: any) => {
      toast.error("Failed to delete assignment", { description: err.message });
    },
  });

  // Combine query results
  const allAssignments: any[] = [];
  courseQueries.forEach((query, index) => {
    const course = enrolled[index]?.course;
    if (course && query.data?.data) {
      query.data.data.forEach((assignment: any) => {
        allAssignments.push({
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          due: new Date(assignment.dueDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          marks: "100 Marks",
          status: "Pending", // For now submissions are simulated/mocked
          courseTitle: course.title,
          category: course.category,
          courseId: course.id,
          slug: getSlug(course.title),
        });
      });
    }
  });

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
          <span className="assignments-label">STUDENT AREA</span>
          <h1>Assignments 📝</h1>
          <p>
            View your course assignments, deadlines and submission status in one place.
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
            <span className="assignments-label">YOUR WORK</span>
            <h2>All Assignments</h2>
            <p>
              Complete your pending assignments before their deadlines.
            </p>
          </div>
          <span className="assignment-course-count">
            {enrolled.length} Enrolled Courses
          </span>
        </div>

        {isLoadingEnrolled || isLoadingAssignments ? (
          <div className="assignments-loading">
            <div className="spinner"></div>
            <p>Loading assignments...</p>
          </div>
        ) : allAssignments.length === 0 ? (
          <div className="assignments-empty-state">
            <i className="fa-regular fa-clipboard"></i>
            <h3>No Assignments</h3>
            <p>You don't have any assignments yet. Enroll in courses to start receiving assignments.</p>
          </div>
        ) : (
          <div className="assignment-list">
            {allAssignments.map((assignment) => (
              <article
                className="assignment-card"
                key={assignment.id}
              >
                {/* Assignment Icon */}
                <div className="assignment-icon">
                  <i className={getIconClass(assignment.courseTitle)}></i>
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
                  <p className="assignment-description">
                    {assignment.description}
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
                <div className="assignment-action" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
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

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {isInstructor && (
                      <button
                        type="button"
                        className="delete-course-btn"
                        style={{ border: '1px solid var(--hairline-strong)', padding: '8px 12px', borderRadius: '8px', color: '#ef4444', background: 'transparent', cursor: 'pointer' }}
                        onClick={() => {
                          setAssignmentToDelete(assignment);
                          setIsConfirmOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                    <a
                      href={`/course-details?id=${assignment.courseId}`}
                      className="assignment-btn"
                    >
                      {assignment.status === "Submitted"
                        ? "View Course"
                        : "Open Assignment"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Assignment 🚨"
        message={`Are you sure you want to delete "${assignmentToDelete?.title}"? This will delete the assignment permanently for everyone.`}
        confirmText="Delete permanently"
        cancelText="Keep Assignment"
        variant="danger"
        onConfirm={() => {
          if (assignmentToDelete) {
            deleteMutation.mutate(assignmentToDelete.id);
          }
          setIsConfirmOpen(false);
          setAssignmentToDelete(null);
        }}
        onCancel={() => {
          setIsConfirmOpen(false);
          setAssignmentToDelete(null);
        }}
      />
    </main>
  );
}

export default Assignments;
