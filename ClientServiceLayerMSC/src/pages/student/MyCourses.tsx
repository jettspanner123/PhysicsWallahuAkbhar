import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CourseServices } from "../../Services/CourseServices";
import { AuthServices } from "../../Services/AuthServices";
import { CourseModel } from "../../Models/CourseModel";
import { EnrollmentModel } from "../../Models/EnrollmentModel";
import ConfirmDialog from "../../components/ConfirmDialog";
import "./MyCourses.css";

const courseIcons: Record<string, string> = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security": "fa-solid fa-shield-halved",
};

function MyCourses(): React.JSX.Element {
  const queryClient = useQueryClient();
  const courseServices = CourseServices.getInstance();
  const authServices = AuthServices.getInstance();
  const { role } = authServices.getUserInfo();

  const [activeTab, setActiveTab] = useState<"enrolled" | "browse">("enrolled");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseModel | null>(null);

  // Fetch all courses in catalog
  const { data: catalogResponse, isLoading: isLoadingCatalog } = useQuery({
    queryKey: ["coursesCatalog"],
    queryFn: () => courseServices.getAllCourses(),
  });

  // Fetch enrolled courses
  const { data: enrolledResponse, isLoading: isLoadingEnrolled } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => courseServices.getEnrolledCourses(),
  });

  // Mutation to enroll in a course
  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => courseServices.enroll(courseId),
    onSuccess: () => {
      toast.success("Enrolled successfully!", {
        description: "You can now start learning this course.",
      });
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message;
      toast.error("Failed to enroll", { description: msg });
    },
  });

  // Mutation to delete a course
  const deleteMutation = useMutation({
    mutationFn: (courseId: string) => courseServices.deleteCourse(courseId),
    onSuccess: () => {
      toast.success("Course deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["coursesCatalog"] });
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message;
      toast.error("Failed to delete course", { description: msg });
    },
  });

  // Mutation to seed database
  const seedMutation = useMutation({
    mutationFn: () => courseServices.seedCourses(),
    onSuccess: (res) => {
      toast.success("Database seeded successfully!", {
        description: `Seeded ${res.data.count} default courses.`,
      });
      queryClient.invalidateQueries({ queryKey: ["coursesCatalog"] });
    },
    onError: (err: any) => {
      toast.error("Failed to seed database", { description: err.message });
    },
  });

  const catalog = catalogResponse?.data || [];
  const enrolled = enrolledResponse?.data || [];

  // Filter catalog to show only courses that the student is NOT enrolled in
  const unenrolledCourses = catalog.filter(
    (course: CourseModel) =>
      !enrolled.some((e: EnrollmentModel) => e.courseId === course.id)
  );

  const getIconClass = (title: string): string => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return courseIcons[slug] || "fa-solid fa-book";
  };

  return (
    <main className="my-courses-main">
      {/* Page Heading */}
      <section className="my-courses-heading">
        <div className="heading-container">
          <div>
            <span className="dashboard-label">STUDENT AREA</span>
            <h1>My Courses 📚</h1>
            <p>Manage your enrolled courses and continue your learning journey.</p>
          </div>
          {role === "TEACHER" || role === "ADMIN" ? (
            <button
              className="seed-courses-btn"
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
            >
              <i className="fa-solid fa-database"></i> {seedMutation.isPending ? "Seeding..." : "Seed Default Courses"}
            </button>
          ) : null}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="courses-tabs-nav">
        <button
          className={`tab-btn ${activeTab === "enrolled" ? "active" : ""}`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Courses ({enrolled.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "browse" ? "active" : ""}`}
          onClick={() => setActiveTab("browse")}
        >
          Browse Catalog ({unenrolledCourses.length})
        </button>
      </section>

      {/* Loading state */}
      {(activeTab === "enrolled" ? isLoadingEnrolled : isLoadingCatalog) ? (
        <section className="loading-section">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </section>
      ) : (
        <>
          {/* Enrolled Tab Content */}
          {activeTab === "enrolled" && (
            <section className="my-course-grid">
              {enrolled.length === 0 ? (
                <div className="empty-state-card">
                  <i className="fa-regular fa-folder-open"></i>
                  <h2>No Enrolled Courses</h2>
                  <p>You have not enrolled in any courses yet. Go to the Catalog to explore available options.</p>
                  <button className="browse-now-btn" onClick={() => setActiveTab("browse")}>
                    Browse Catalog →
                  </button>
                </div>
              ) : (
                enrolled.map((enrollment: EnrollmentModel) => {
                  const course = enrollment.course;
                  if (!course) return null;
                  const progress = enrollment.progress;
                  const iconClass = getIconClass(course.title);

                  return (
                    <div className="my-course-card" key={enrollment.id}>
                      <div className="my-course-icon">
                        <i className={iconClass}></i>
                      </div>
                      <div className="my-course-content">
                        <span className="course-category-small">{course.category}</span>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
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
                        <div className="progress-info">
                          <span>Your Progress</span>
                          <strong>{progress}%</strong>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="course-card-actions">
                          <a href={`/course-details?id=${course.id}`} className="continue-btn">
                            Continue Course →
                          </a>
                          {(role === "TEACHER" || role === "ADMIN") && (
                            <button
                              className="delete-course-btn"
                              disabled={deleteMutation.isPending}
                              onClick={() => {
                                setCourseToDelete(course);
                                setIsConfirmOpen(true);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          )}

          {/* Browse Catalog Tab Content */}
          {activeTab === "browse" && (
            <section className="my-course-grid">
              {unenrolledCourses.length === 0 ? (
                <div className="empty-state-card">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <h2>Catalog is Empty</h2>
                  <p>There are no new courses available to enroll in right now. Check back later!</p>
                  {catalog.length === 0 && (role === "TEACHER" || role === "ADMIN") && (
                    <button className="browse-now-btn" onClick={() => seedMutation.mutate()}>
                      Seed Default Courses
                    </button>
                  )}
                </div>
              ) : (
                unenrolledCourses.map((course: CourseModel) => {
                  const iconClass = getIconClass(course.title);
                  return (
                    <div className="my-course-card" key={course.id}>
                      <div className="my-course-icon">
                        <i className={iconClass}></i>
                      </div>
                      <div className="my-course-content">
                        <span className="course-category-small">{course.category}</span>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
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
                        <div className="course-card-actions">
                          <button
                            className="enroll-btn"
                            disabled={enrollMutation.isPending}
                            onClick={() => enrollMutation.mutate(course.id)}
                          >
                            {enrollMutation.isPending ? "Enrolling..." : "Enroll in Course +"}
                          </button>
                          {(role === "TEACHER" || role === "ADMIN") && (
                            <button
                              className="delete-course-btn"
                              disabled={deleteMutation.isPending}
                              onClick={() => {
                                setCourseToDelete(course);
                                setIsConfirmOpen(true);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          )}
        </>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Course 🚨"
        message={`Are you sure you want to delete "${courseToDelete?.title}"? This will delete the course permanently for everyone.`}
        confirmText="Delete permanently"
        cancelText="Keep Course"
        variant="danger"
        onConfirm={() => {
          if (courseToDelete) {
            deleteMutation.mutate(courseToDelete.id);
          }
          setIsConfirmOpen(false);
          setCourseToDelete(null);
        }}
        onCancel={() => {
          setIsConfirmOpen(false);
          setCourseToDelete(null);
        }}
      />
    </main>
  );
}

export default MyCourses;
