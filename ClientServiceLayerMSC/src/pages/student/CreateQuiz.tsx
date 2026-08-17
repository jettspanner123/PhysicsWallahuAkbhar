import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CourseServices } from "../../Services/CourseServices";
import { QuizServices } from "../../Services/QuizServices";
import { AuthServices } from "../../Services/AuthServices";
import "./CreateQuiz.css";

interface QuestionInput {
  text: string;
  options: string[];
  correctOption: number;
}

function CreateQuiz(): React.JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authServices = AuthServices.getInstance();
  const { role } = authServices.getUserInfo();

  const isInstructor = role === "TEACHER" || role === "ADMIN";

  const courseServices = CourseServices.getInstance();
  const quizServices = QuizServices.getInstance();

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedModuleName, setSelectedModuleName] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { text: "", options: ["", "", "", ""], correctOption: 0 }
  ]);

  const { data: coursesCatalogResponse, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["coursesCatalog"],
    queryFn: () => courseServices.getAllCourses(),
  });

  const catalog = coursesCatalogResponse?.data || [];

  const selectedCourse = catalog.find((c) => c.id === selectedCourseId);
  const modules = selectedCourse?.modules || [];

  const createQuizMutation = useMutation({
    mutationFn: (quizData: any) => quizServices.createQuiz(quizData),
    onSuccess: () => {
      toast.success("Quiz published successfully!", {
        description: "Students can now start attempting this quiz.",
      });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      navigate("/dashboard/quizzes");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message;
      toast.error("Failed to publish quiz", { description: msg });
    },
  });

  if (!isInstructor) {
    return (
      <main className="create-quiz-container">
        <section className="forbidden-card">
          <i className="fa-solid fa-lock"></i>
          <h1>Access Forbidden</h1>
          <p>You do not have the required permissions to view this page. This page is only accessible to Teachers and Administrators.</p>
        </section>
      </main>
    );
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctOption: 0 }]);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    if (questions.length === 1) {
      toast.warning("At least one question is required.");
      return;
    }
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  const handleQuestionTextChange = (qIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].text = text;
    setQuestions(updated);
  };

  const handleOptionTextChange = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  const handleCorrectOptionChange = (qIndex: number, correctIdx: number) => {
    const updated = [...questions];
    updated[qIndex].correctOption = correctIdx;
    setQuestions(updated);
  };

  const handleAddOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleRemoveOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    if (updated[qIndex].options.length <= 2) {
      toast.warning("A question must have at least 2 options.");
      return;
    }
    updated[qIndex].options = updated[qIndex].options.filter((_, idx) => idx !== oIndex);
    if (updated[qIndex].correctOption >= updated[qIndex].options.length) {
      updated[qIndex].correctOption = 0;
    }
    setQuestions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourseId) {
      toast.error("Validation Error", { description: "Please select a course." });
      return;
    }
    if (!selectedModuleName) {
      toast.error("Validation Error", { description: "Please select a module." });
      return;
    }
    if (!title.trim()) {
      toast.error("Validation Error", { description: "Please enter a quiz title." });
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        toast.error("Validation Error", { description: `Question ${i + 1} has no text.` });
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast.error("Validation Error", { description: `Option ${j + 1} of question ${i + 1} is empty.` });
          return;
        }
      }
    }

    createQuizMutation.mutate({
      title,
      courseId: selectedCourseId,
      moduleName: selectedModuleName,
      questions,
    });
  };

  return (
    <main className="create-quiz-container">
      {/* Page Heading */}
      <section className="quiz-heading-box">
        <div>
          <span className="quiz-label">INSTRUCTOR PANEL</span>
          <h1>Create Quiz 📝</h1>
          <p>Publish quiz assessments with course module integrations and multiple-choice configurations.</p>
        </div>
      </section>

      {/* Form Card */}
      <section className="create-quiz-card">
        <form onSubmit={handleSubmit}>
          {/* Metadata Section */}
          <div className="form-row-grid">
            <div className="form-group">
              <label>Select Course</label>
              {isLoadingCourses ? (
                <div className="select-skeleton">Loading courses...</div>
              ) : (
                <select
                  className="form-select"
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setSelectedModuleName("");
                  }}
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
              <label>Select Course Module</label>
              <select
                className="form-select"
                value={selectedModuleName}
                onChange={(e) => setSelectedModuleName(e.target.value)}
                disabled={!selectedCourseId}
                required
              >
                <option value="">-- Choose Module --</option>
                {modules.map((m, idx) => (
                  <option key={idx} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Quiz Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CSS Flexbox and Grid Basics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <hr className="divider" />

          {/* Curriculum / Questions section */}
          <div className="questions-section-header">
            <h2>Quiz Questions ({questions.length})</h2>
            <p>Write multiple-choice questions and mark the correct option.</p>
          </div>

          {questions.map((q, qIdx) => (
            <div className="question-builder-card" key={qIdx}>
              <div className="qb-card-header">
                <h3>Question {qIdx + 1}</h3>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveQuestion(qIdx)}
                >
                  <i className="fa-solid fa-trash-can"></i> Remove
                </button>
              </div>

              <div className="form-group">
                <label>Question Text</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. What is the default flex-direction value?"
                  value={q.text}
                  onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                  required
                />
              </div>

              <div className="qb-options-grid">
                <label>Options & Correct Selection</label>
                {q.options.map((opt, oIdx) => (
                  <div className="qb-option-row" key={oIdx}>
                    <input
                      type="radio"
                      name={`correctOption-${qIdx}`}
                      checked={q.correctOption === oIdx}
                      onChange={() => handleCorrectOptionChange(qIdx, oIdx)}
                      required
                    />
                    <input
                      type="text"
                      className="form-input option-text-input"
                      placeholder={`Option ${oIdx + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionTextChange(qIdx, oIdx, e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="remove-opt-btn"
                      onClick={() => handleRemoveOption(qIdx, oIdx)}
                      title="Remove option"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="add-opt-btn-small"
                onClick={() => handleAddOption(qIdx)}
              >
                + Add Option
              </button>
            </div>
          ))}

          <div className="quiz-action-footer">
            <button
              type="button"
              className="add-question-btn"
              onClick={handleAddQuestion}
            >
              <i className="fa-solid fa-circle-plus"></i> Add Question
            </button>

            <button
              type="submit"
              className="btn-primary publish-quiz-btn"
              disabled={createQuizMutation.isPending}
            >
              <i className="fa-solid fa-cloud-arrow-up"></i> {createQuizMutation.isPending ? "Publishing..." : "Publish Quiz"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateQuiz;
