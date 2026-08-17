import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CourseServices } from "../../Services/CourseServices";
import "./CreateCourse.css";

interface ModuleInput {
  name: string;
  description: string;
  lessons: number;
}

function CreateCourse(): React.JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const courseServices = CourseServices.getInstance();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [lessons, setLessons] = useState("");
  
  // Objectives
  const [objectives, setObjectives] = useState<string[]>([""]);
  
  // Modules
  const [modules, setModules] = useState<ModuleInput[]>([
    { name: "", description: "", lessons: 5 }
  ]);

  const createCourseMutation = useMutation({
    mutationFn: (courseData: any) => courseServices.createCourse(courseData),
    onSuccess: () => {
      toast.success("Course created successfully!", {
        description: "The course has been added to the catalog.",
      });
      queryClient.invalidateQueries({ queryKey: ["coursesCatalog"] });
      navigate("/dashboard/courses");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message;
      toast.error("Failed to create course", { description: msg });
    },
  });

  const handleAddObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value;
    setObjectives(updated);
  };

  const handleRemoveObjective = (index: number) => {
    if (objectives.length === 1) return;
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleAddModule = () => {
    setModules([...modules, { name: "", description: "", lessons: 5 }]);
  };

  const handleModuleChange = (index: number, field: keyof ModuleInput, value: any) => {
    const updated = [...modules];
    updated[index] = { ...updated[index], [field]: value };
    setModules(updated);
  };

  const handleRemoveModule = (index: number) => {
    if (modules.length === 1) return;
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !duration.trim() || !lessons.trim()) {
      toast.error("Validation Error", { description: "Please fill out all required fields." });
      return;
    }

    const filteredObjectives = objectives.filter(obj => obj.trim() !== "");
    const filteredModules = modules.filter(mod => mod.name.trim() !== "");

    if (filteredObjectives.length === 0) {
      toast.error("Validation Error", { description: "Please add at least one course objective." });
      return;
    }

    if (filteredModules.length === 0) {
      toast.error("Validation Error", { description: "Please add at least one module." });
      return;
    }

    const payload = {
      title,
      description,
      category,
      level,
      duration,
      lessons,
      rating: "5.0",
      objectives: filteredObjectives,
      modules: filteredModules,
    };

    createCourseMutation.mutate(payload);
  };

  return (
    <main className="create-course-container">
      {/* Page Heading */}
      <section className="create-course-header">
        <div>
          <span className="create-course-label">INSTRUCTOR PORTAL</span>
          <h1>Create New Course ➕</h1>
          <p>Publish a new course to the catalog. Fill in details, learning objectives, and curriculum modules.</p>
        </div>
      </section>

      {/* Form Card */}
      <form className="create-course-form" onSubmit={handleSubmit}>
        <section className="form-card">
          <h2 className="form-section-title">Course Information</h2>
          
          <div className="form-group">
            <label htmlFor="title">Course Title <span className="req">*</span></label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Advanced JavaScript Essentials"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description <span className="req">*</span></label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of what the course covers..."
              rows={4}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Development">Development</option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="Data">Data / Analytics</option>
                <option value="Security">Cyber Security</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="level">Difficulty Level</label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration <span className="req">*</span></label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 8 Weeks"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lessons">Lessons Count <span className="req">*</span></label>
              <input
                type="text"
                id="lessons"
                value={lessons}
                onChange={(e) => setLessons(e.target.value)}
                placeholder="e.g., 32 Lessons"
                required
              />
            </div>
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="form-card">
          <div className="section-header-flex">
            <h2 className="form-section-title">What students will learn</h2>
            <button type="button" className="add-btn-small" onClick={handleAddObjective}>
              + Add Objective
            </button>
          </div>
          
          <div className="list-items-container">
            {objectives.map((obj, index) => (
              <div key={index} className="dynamic-input-row">
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  placeholder={`Learning objective #${index + 1}`}
                  required
                />
                <button
                  type="button"
                  className="remove-row-btn"
                  onClick={() => handleRemoveObjective(index)}
                  disabled={objectives.length === 1}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Modules / Curriculum */}
        <section className="form-card">
          <div className="section-header-flex">
            <h2 className="form-section-title">Curriculum Modules</h2>
            <button type="button" className="add-btn-small" onClick={handleAddModule}>
              + Add Module
            </button>
          </div>

          <div className="list-items-container">
            {modules.map((mod, index) => (
              <div key={index} className="module-item-box">
                <div className="module-header-flex">
                  <h3>Module #{index + 1}</h3>
                  <button
                    type="button"
                    className="remove-module-btn"
                    onClick={() => handleRemoveModule(index)}
                    disabled={modules.length === 1}
                  >
                    Delete Module
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Module Title <span className="req">*</span></label>
                  <input
                    type="text"
                    value={mod.name}
                    onChange={(e) => handleModuleChange(index, "name", e.target.value)}
                    placeholder="e.g., Module 1 — Introduction"
                    required
                  />
                </div>

                <div className="form-grid-module">
                  <div className="form-group">
                    <label>Module Description</label>
                    <input
                      type="text"
                      value={mod.description}
                      onChange={(e) => handleModuleChange(index, "description", e.target.value)}
                      placeholder="Brief overview of module topics..."
                    />
                  </div>
                  <div className="form-group lessons-input-group">
                    <label>Lessons Count</label>
                    <input
                      type="number"
                      value={mod.lessons}
                      onChange={(e) => handleModuleChange(index, "lessons", parseInt(e.target.value) || 0)}
                      min={1}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Panel */}
        <div className="form-actions-panel">
          <button
            type="button"
            className="cancel-form-btn"
            onClick={() => navigate("/dashboard/courses")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-form-btn"
            disabled={createCourseMutation.isPending}
          >
            {createCourseMutation.isPending ? "Creating Course..." : "Publish Course"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateCourse;
