import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CourseServices } from "../../Services/CourseServices";
import { QuizServices } from "../../Services/QuizServices";
import { AuthServices } from "../../Services/AuthServices";
import { QuizModel, QuestionModel, QuizAttemptModel } from "../../Models/QuizModel";

const courseIcons: { [key: string]: string } = {
  "web-development": "fa-solid fa-laptop-code",
  "java-programming": "fa-solid fa-mug-hot",
  "database-management": "fa-solid fa-database",
  "python-programming": "fa-solid fa-code",
  "data-analytics": "fa-solid fa-chart-bar",
  "cyber-security-fundamentals": "fa-solid fa-shield-halved",
};

function Quizzes(): React.JSX.Element {
  const queryClient = useQueryClient();
  const authServices = AuthServices.getInstance();
  const { role } = authServices.getUserInfo();

  const courseServices = CourseServices.getInstance();
  const quizServices = QuizServices.getInstance();

  // Selected states
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizModel | null>(null);

  // Active quiz states
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  // Fetch enrolled courses
  const { data: enrolledResponse, isLoading: isLoadingEnrolled } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => courseServices.getEnrolledCourses(),
  });

  const enrolledEnrollments = enrolledResponse?.data || [];
  const enrolledCourses = enrolledEnrollments.map((e: any) => e.course).filter(Boolean);

  // Fetch quizzes of selected course
  const { data: quizzesResponse, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ["quizzes", selectedCourseId],
    queryFn: () => quizServices.getQuizzesByCourse(selectedCourseId!),
    enabled: !!selectedCourseId,
  });

  const quizzes = quizzesResponse?.data || [];

  // Fetch student quiz attempts
  const { data: attemptsResponse, isLoading: isLoadingAttempts } = useQuery({
    queryKey: ["myAttempts"],
    queryFn: () => quizServices.getMyAttempts(),
  });

  const attempts = attemptsResponse?.data || [];

  // Seed default quizzes mutation
  const seedQuizzesMutation = useMutation({
    mutationFn: () => quizServices.seedQuizzes(),
    onSuccess: (res) => {
      toast.success("Quizzes database seeded successfully!", {
        description: `Seeded ${res.data.count} default quizzes.`,
      });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (err: any) => {
      toast.error("Failed to seed quizzes database", { description: err.message });
    },
  });

  // Submit attempt mutation
  const submitAttemptMutation = useMutation({
    mutationFn: (data: { quizId: string; answers: number[] }) =>
      quizServices.submitAttempt(data.quizId, data.answers),
    onSuccess: (res) => {
      setScore(res.data.score);
      toast.success("Quiz completed and scored!", {
        description: `Your score: ${res.data.score}%`,
      });
      queryClient.invalidateQueries({ queryKey: ["myAttempts"] });
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message;
      toast.error("Failed to submit quiz score", { description: msg });
    },
  });

  const selectedCourse = enrolledCourses.find((c: any) => c.id === selectedCourseId);
  const modules = selectedCourse?.modules || [];

  // Filter quizzes by module name
  const filteredQuizzes = quizzes.filter((q) => q.moduleName === selectedModule);

  const resetQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(null);
  };

  const openCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedModule(null);
    setActiveQuiz(null);
    resetQuiz();
  };

  const openModule = (moduleName: string) => {
    setSelectedModule(moduleName);
    setActiveQuiz(null);
    resetQuiz();
  };

  const startQuiz = (quiz: QuizModel) => {
    setActiveQuiz(quiz);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(null);
  };

  const goBackToCourses = () => {
    setSelectedCourseId(null);
    setSelectedModule(null);
    setActiveQuiz(null);
    resetQuiz();
  };

  const goBackToModules = () => {
    setSelectedModule(null);
    setActiveQuiz(null);
    resetQuiz();
  };

  const goBackToQuizList = () => {
    setActiveQuiz(null);
    resetQuiz();
  };

  const getIconClass = (title: string): string => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return courseIcons[slug] || "fa-solid fa-book";
  };

  const getBestScore = (quizId: string): number | null => {
    const quizAttempts = attempts.filter((a) => a.quizId === quizId);
    if (quizAttempts.length === 0) return null;
    return Math.max(...quizAttempts.map((a) => a.score));
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !activeQuiz || !activeQuiz.questions) return;

    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (questionIndex < activeQuiz.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      return;
    }

    // Submit attempt to backend
    submitAttemptMutation.mutate({
      quizId: activeQuiz.id,
      answers: newAnswers,
    });
  };

  /* =====================================================
     COMMON STYLES (MATCHES THE EDITORIAL LAYOUT GUIDELINES)
  ===================================================== */

  const pageStyle = { width: "100%", fontFamily: "'Inter', sans-serif" };
  const containerStyle = { width: "100%" };
  const headerStyle: React.CSSProperties = {
    background: "var(--surface-card)",
    padding: "var(--spacing-lg)",
    borderRadius: "var(--rounded-xl)",
    marginBottom: "var(--spacing-lg)",
    border: "1px solid var(--hairline)",
    boxShadow: "0 4px 16px rgba(12, 10, 9, 0.02)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--spacing-sm)",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  };

  const cardStyle: React.CSSProperties = {
    background: "var(--surface-card)",
    borderRadius: "var(--rounded-xl)",
    padding: "28px",
    boxShadow: "0 4px 16px rgba(12, 10, 9, 0.02)",
    boxSizing: "border-box",
    border: "1px solid var(--hairline)",
  };

  const primaryButton = {
    width: "100%",
    padding: "13px 18px",
    border: "none",
    borderRadius: "10px",
    background: "var(--primary)",
    color: "var(--surface-card)",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px",
  };

  const backButton = {
    border: "none",
    background: "transparent",
    color: "var(--primary)",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
    padding: "5px 0",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  /* =====================================================
     SCREEN 1 — COURSE LIST
  ===================================================== */

  if (!selectedCourseId) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <div>
              <div
                style={{
                  color: "var(--ink)",
                  fontSize: "10px",
                  fontWeight: "800",
                  letterSpacing: "0.8px",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                STUDENT AREA
              </div>
              <h1
                style={{
                  margin: "0 0 var(--spacing-xs)",
                  fontSize: "30px",
                  color: "var(--ink)",
                  fontFamily: "'EB Garamond', serif",
                }}
              >
                Quizzes 🧠
              </h1>
              <p
                style={{
                  margin: 0,
                  color: "var(--body)",
                  fontSize: "13.5px",
                  lineHeight: "1.7",
                }}
              >
                Select one of your enrolled courses to complete module assessments.
              </p>
            </div>
            {(role === "TEACHER" || role === "ADMIN") && (
              <button
                className="seed-courses-btn"
                onClick={() => seedQuizzesMutation.mutate()}
                disabled={seedQuizzesMutation.isPending}
              >
                <i className="fa-solid fa-database"></i> {seedQuizzesMutation.isPending ? "Seeding..." : "Seed Default Quizzes"}
              </button>
            )}
          </div>

          {isLoadingEnrolled ? (
            <section className="loading-section" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
              <div className="spinner"></div>
              <p>Loading your courses...</p>
            </section>
          ) : enrolledCourses.length === 0 ? (
            <div className="empty-state-card" style={{ textAlign: "center", padding: "60px 20px" }}>
              <i className="fa-solid fa-graduation-cap" style={{ fontSize: "48px", color: "var(--muted)", marginBottom: "20px" }}></i>
              <h2>No Enrolled Courses</h2>
              <p>You need to enroll in a course from the Catalog before attempting quizzes.</p>
              <a href="/dashboard/courses" className="browse-now-btn" style={{ textDecoration: "none", display: "inline-block", marginTop: "15px" }}>
                Go to Courses Catalog
              </a>
            </div>
          ) : (
            <div style={gridStyle}>
              {enrolledCourses.map((item: any) => {
                const iconClass = getIconClass(item.title);
                return (
                  <div
                    key={item.id}
                    style={{
                      ...cardStyle,
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onClick={() => openCourse(item.id)}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "var(--rounded-lg)",
                        background: "var(--canvas-soft)",
                        border: "1px solid var(--hairline)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        marginBottom: "20px",
                        color: "var(--ink)",
                      }}
                    >
                      <i className={iconClass}></i>
                    </div>

                    <div
                      style={{
                        color: "var(--ink)",
                        fontSize: "10px",
                        fontWeight: "800",
                        letterSpacing: "0.8px",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.category}
                    </div>

                    <h2
                      style={{
                        margin: "0 0 12px",
                        color: "var(--ink)",
                        fontSize: "18px",
                        fontWeight: "600",
                        lineHeight: "1.4",
                      }}
                    >
                      {item.title}
                    </h2>

                    <p
                      style={{
                        color: "var(--muted)",
                        lineHeight: "1.5",
                        margin: "0 0 20px",
                        fontSize: "13px",
                      }}
                    >
                      {item.modules.length} modules
                    </p>

                    <button
                      type="button"
                      style={{
                        ...primaryButton,
                        borderRadius: "var(--rounded-pill)",
                        padding: "10px 20px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        openCourse(item.id);
                      }}
                    >
                      View Modules
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* =====================================================
     SCREEN 2 — MODULE LIST
  ===================================================== */

  if (!selectedModule) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <button type="button" style={backButton} onClick={goBackToCourses}>
            <i className="fa-solid fa-arrow-left"></i> Back to Courses
          </button>

          <div style={headerStyle}>
            <div>
              <div
                style={{
                  color: "var(--primary)",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                COURSE MODULES
              </div>
              <h1
                style={{
                  margin: "0 0 10px",
                  color: "var(--ink)",
                }}
              >
                <i className={getIconClass(selectedCourse?.title || "")}></i> {selectedCourse?.title}
              </h1>
              <p style={{ margin: 0, color: "var(--body)" }}>
                Select a module to view and attempt available quizzes.
              </p>
            </div>
          </div>

          <div style={gridStyle}>
            {modules.map((item: any, index: number) => {
              const moduleQuizzes = quizzes.filter((q) => q.moduleName === item.name);

              return (
                <div
                  key={index}
                  style={{
                    ...cardStyle,
                    cursor: "pointer",
                  }}
                  onClick={() => openModule(item.name)}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--rounded-full)",
                      background: "var(--canvas-soft)",
                      color: "var(--ink)",
                      border: "2px solid var(--hairline-strong)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    {index + 1}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 12px",
                      color: "var(--ink)",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "1.4",
                    }}
                  >
                    {item.name}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 16px",
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                  >
                    {moduleQuizzes.length} Quizzes Available
                  </p>

                  <button
                    type="button"
                    style={{
                      ...primaryButton,
                      borderRadius: "var(--rounded-pill)",
                      padding: "10px 20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      openModule(item.name);
                    }}
                  >
                    View Quizzes
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     SCREEN 2.5 — QUIZ SELECTION LIST (FOR A MODULE)
  ===================================================== */

  if (!activeQuiz) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <button type="button" style={backButton} onClick={goBackToModules}>
            <i className="fa-solid fa-arrow-left"></i> Back to Modules
          </button>

          <div style={headerStyle}>
            <div>
              <div
                style={{
                  color: "var(--primary)",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                AVAILABLE ASSESSMENTS
              </div>
              <h1 style={{ margin: "0 0 10px", color: "var(--ink)" }}>{selectedModule}</h1>
              <p style={{ margin: 0, color: "var(--body)" }}>Select a quiz from this module to start testing.</p>
            </div>
          </div>

          {isLoadingQuizzes ? (
            <section className="loading-section" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
              <div className="spinner"></div>
              <p>Loading quizzes...</p>
            </section>
          ) : filteredQuizzes.length === 0 ? (
            <div className="empty-state-card" style={{ textAlign: "center", padding: "60px 20px" }}>
              <i className="fa-regular fa-folder-open" style={{ fontSize: "48px", color: "var(--muted)", marginBottom: "20px" }}></i>
              <h2>No Quizzes Available</h2>
              <p>There are no quizzes created for this module yet.</p>
            </div>
          ) : (
            <div style={gridStyle}>
              {filteredQuizzes.map((quiz) => {
                const bestScore = getBestScore(quiz.id);

                return (
                  <div
                    key={quiz.id}
                    style={{
                      ...cardStyle,
                      cursor: "pointer",
                    }}
                    onClick={() => startQuiz(quiz)}
                  >
                    <h2
                      style={{
                        margin: "0 0 12px",
                        color: "var(--ink)",
                        fontSize: "17px",
                        fontWeight: "600",
                        lineHeight: "1.4",
                      }}
                    >
                      {quiz.title}
                    </h2>

                    <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: "13px" }}>
                      {quiz.questions?.length || 0} Questions
                    </p>

                    {bestScore !== null && (
                      <p
                        style={{
                          margin: "0 0 16px",
                          color: "var(--body-strong)",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Best Score: {bestScore.toFixed(0)}%
                      </p>
                    )}

                    <button
                      type="button"
                      style={{
                        ...primaryButton,
                        borderRadius: "var(--rounded-pill)",
                        padding: "10px 20px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        startQuiz(quiz);
                      }}
                    >
                      {bestScore !== null ? "Retake Quiz" : "Start Quiz"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* =====================================================
     SCREEN 3 — RESULT
  ===================================================== */

  if (score !== null) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <button type="button" style={backButton} onClick={goBackToQuizList}>
            <i className="fa-solid fa-arrow-left"></i> Back to Quizzes List
          </button>

          <div
            style={{
              ...headerStyle,
              textAlign: "center",
              padding: "45px 25px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "var(--primary)",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "12px",
              }}
            >
              QUIZ COMPLETED
            </div>

            <h1 style={{ margin: "0 0 25px", color: "var(--ink)" }}>Your Score</h1>

            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                margin: "0 auto 25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--canvas-soft)",
                color: "var(--ink)",
                fontSize: "38px",
                fontWeight: "800",
                border: "8px solid var(--hairline)",
              }}
            >
              {score.toFixed(0)}%
            </div>

            {score >= 75 ? (
              <>
                <h2 style={{ color: "var(--ink)", margin: "0 0 10px" }}>Congratulations! Pass! 🎉</h2>
                <p style={{ color: "var(--body)", fontSize: "15px", margin: "0 0 8px" }}>
                  You passed the quiz with a score of <strong>{score.toFixed(0)}%</strong>.
                </p>
                <p style={{ color: "var(--ink)", fontWeight: "700", margin: 0 }}>Certificate Eligibility: QUALIFIED</p>
              </>
            ) : (
              <>
                <h2 style={{ color: "var(--ink)", margin: "0 0 10px" }}>Keep Learning! 📚</h2>
                <p style={{ color: "var(--body)", fontSize: "15px", margin: "0 0 8px" }}>
                  You scored <strong>{score.toFixed(0)}%</strong>.
                </p>
                <p style={{ color: "var(--ink)", fontWeight: "600", margin: 0 }}>You need at least 75% to pass.</p>
              </>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginTop: "25px" }}>
              <button
                type="button"
                style={{
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "10px",
                  background: "var(--primary)",
                  color: "var(--surface-card)",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={resetQuiz}
              >
                Retake Quiz
              </button>

              <button
                type="button"
                style={{
                  padding: "12px 22px",
                  border: "1px solid var(--hairline)",
                  borderRadius: "10px",
                  background: "var(--surface-card)",
                  color: "var(--body-strong)",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={goBackToQuizList}
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     SCREEN 4 — QUESTIONS
  ===================================================== */

  const activeQuestions = activeQuiz.questions || [];
  const currentQuestion = activeQuestions[questionIndex];

  if (!currentQuestion) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <button type="button" style={backButton} onClick={goBackToQuizList}>
            <i className="fa-solid fa-arrow-left"></i> Back to Quizzes
          </button>
          <div className="empty-state-card" style={{ textAlign: "center", padding: "60px 20px" }}>
            <h2>Question Build Error</h2>
            <p>This quiz does not contain any questions.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <button type="button" style={backButton} onClick={goBackToQuizList}>
          <i className="fa-solid fa-arrow-left"></i> Exit Quiz
        </button>

        <div style={headerStyle}>
          <div>
            <div
              style={{
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              {selectedCourse?.title}
            </div>

            <h1
              style={{
                margin: "0 0 12px",
                color: "var(--ink)",
                fontSize: "28px",
              }}
            >
              {activeQuiz.title}
            </h1>

            <div
              style={{
                color: "var(--body)",
                fontWeight: "600",
              }}
            >
              Question {questionIndex + 1} of {activeQuestions.length}
            </div>
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "25px",
              color: "var(--ink)",
              lineHeight: "1.4",
              fontFamily: "'EB Garamond', serif",
              fontSize: "22px",
            }}
          >
            {currentQuestion.text}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    textAlign: "left",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid var(--primary)" : "1px solid var(--hairline)",
                    background: isSelected ? "var(--surface-strong)" : "var(--surface-card)",
                    color: "var(--ink)",
                    cursor: "pointer",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      minWidth: "34px",
                      borderRadius: "50%",
                      background: isSelected ? "var(--primary)" : "var(--canvas-soft)",
                      color: isSelected ? "var(--surface-card)" : "var(--body-strong)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={selectedAnswer === null || submitAttemptMutation.isPending}
            onClick={submitAnswer}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: selectedAnswer === null ? "var(--hairline)" : "var(--primary)",
              color: "var(--surface-card)",
              fontSize: "16px",
              fontWeight: "700",
              cursor: selectedAnswer === null ? "not-allowed" : "pointer",
            }}
          >
            {submitAttemptMutation.isPending
              ? "Saving score..."
              : questionIndex === activeQuestions.length - 1
              ? "Submit Quiz"
              : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
