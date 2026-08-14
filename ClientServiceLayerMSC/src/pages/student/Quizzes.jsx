import React, { useState } from "react";
import "../../App.css";


/* =========================================================
   QUIZ DATA
========================================================= */

const courses = [
  {
    name: "Web Development",
    category: "DEVELOPMENT",
    icon: "💻",
    modules: [
      {
        title: "Module 1: HTML Fundamentals",
        questions: [
          {
            q: "What is HTML?",
            options: [
              "A programming language",
              "A markup language used to structure web pages",
              "A database language",
              "An operating system",
            ],
            answer: 1,
          },
          {
            q: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Text Machine Language",
              "Hyperlink Text Management Language",
              "Home Tool Markup Language",
            ],
            answer: 0,
          },
          {
            q: "Which tag creates the main heading?",
            options: ["<p>", "<h1>", "<head>", "<title>"],
            answer: 1,
          },
          {
            q: "Which tag creates a paragraph?",
            options: ["<paragraph>", "<text>", "<p>", "<para>"],
            answer: 2,
          },
          {
            q: "Which tag creates a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: 1,
          },
        ],
      },

      {
        title: "Module 2: CSS Fundamentals",
        questions: [
          {
            q: "What is CSS mainly used for?",
            options: [
              "Creating databases",
              "Styling web pages",
              "Creating servers",
              "Managing files",
            ],
            answer: 1,
          },
          {
            q: "What does CSS stand for?",
            options: [
              "Computer Style Sheets",
              "Cascading Style Sheets",
              "Creative Style System",
              "Colorful Style Sheets",
            ],
            answer: 1,
          },
          {
            q: "Which property changes text color?",
            options: ["font", "text-color", "color", "background"],
            answer: 2,
          },
          {
            q: "Which property changes background color?",
            options: [
              "background-color",
              "bgcolor",
              "color",
              "background-text",
            ],
            answer: 0,
          },
          {
            q: "Which CSS property changes font size?",
            options: ["font-style", "font-size", "text-size", "size"],
            answer: 1,
          },
        ],
      },

      {
        title: "Module 3: JavaScript Basics",
        questions: [
          {
            q: "What is JavaScript mainly used for?",
            options: [
              "Making webpages interactive",
              "Creating databases only",
              "Formatting documents",
              "Managing hardware",
            ],
            answer: 0,
          },
          {
            q: "Which keyword can declare a variable?",
            options: ["var", "int", "string", "define"],
            answer: 0,
          },
          {
            q: "Which symbol starts a single-line comment?",
            options: ["<!-- -->", "//", "##", "**"],
            answer: 1,
          },
          {
            q: "Which method displays a message in the console?",
            options: [
              "console.log()",
              "print.console()",
              "display()",
              "message()",
            ],
            answer: 0,
          },
          {
            q: "Which language works with HTML and CSS to add interactivity?",
            options: ["Java", "Python", "JavaScript", "SQL"],
            answer: 2,
          },
        ],
      },
    ],
  },

  {
    name: "Java Programming",
    category: "PROGRAMMING",
    icon: "☕",
    modules: [
      {
        title: "Module 1: Java Fundamentals",
        questions: [
          {
            q: "What is Java?",
            options: [
              "A programming language",
              "A database",
              "An operating system",
              "A browser",
            ],
            answer: 0,
          },
          {
            q: "Which keyword creates a class?",
            options: ["function", "class", "struct", "object"],
            answer: 1,
          },
          {
            q: "Which method starts a Java program?",
            options: ["start()", "run()", "main()", "execute()"],
            answer: 2,
          },
          {
            q: "Which type stores whole numbers?",
            options: ["int", "float", "char", "boolean"],
            answer: 0,
          },
          {
            q: "Java is mainly which type of language?",
            options: [
              "Object-oriented",
              "Markup",
              "Query",
              "Styling",
            ],
            answer: 0,
          },
        ],
      },

      {
        title: "Module 2: Control Statements",
        questions: [
          {
            q: "Which statement is used for decision making?",
            options: ["if", "print", "class", "import"],
            answer: 0,
          },
          {
            q: "Which keyword is used when if is false?",
            options: ["otherwise", "else", "wrong", "false"],
            answer: 1,
          },
          {
            q: "Which loop repeats while a condition is true?",
            options: ["if", "while", "switch", "class"],
            answer: 1,
          },
          {
            q: "Which statement selects between multiple choices?",
            options: ["switch", "repeat", "select", "choose"],
            answer: 0,
          },
          {
            q: "Which keyword stops a loop?",
            options: ["stop", "exit", "break", "end"],
            answer: 2,
          },
        ],
      },

      {
        title: "Module 3: OOP Concepts",
        questions: [
          {
            q: "What does OOP stand for?",
            options: [
              "Object Oriented Programming",
              "Online Object Program",
              "Open Operating Process",
              "Object Output Programming",
            ],
            answer: 0,
          },
          {
            q: "Which concept allows inheritance?",
            options: ["extends", "include", "inherit", "using"],
            answer: 0,
          },
          {
            q: "What is an object?",
            options: [
              "An instance of a class",
              "A database",
              "A loop",
              "A variable type only",
            ],
            answer: 0,
          },
          {
            q: "Which concept hides internal implementation?",
            options: [
              "Encapsulation",
              "Compilation",
              "Iteration",
              "Execution",
            ],
            answer: 0,
          },
        ],
      },
    ],
  },

  {
    name: "Database Management",
    category: "DATABASE",
    icon: "🗄️",
    modules: [
      {
        title: "Module 1: Database Fundamentals",
        questions: [
          {
            q: "What is a database?",
            options: [
              "An organized collection of data",
              "A programming language",
              "A browser",
              "An operating system",
            ],
            answer: 0,
          },
          {
            q: "What does DBMS stand for?",
            options: [
              "Database Management System",
              "Data Backup Management Software",
              "Database Machine System",
              "Digital Base Management System",
            ],
            answer: 0,
          },
          {
            q: "Which language is commonly used with relational databases?",
            options: ["HTML", "CSS", "SQL", "JavaScript"],
            answer: 2,
          },
          {
            q: "What is a primary key?",
            options: [
              "A unique identifier for a record",
              "A password",
              "A database name",
              "A table color",
            ],
            answer: 0,
          },
        ],
      },

      {
        title: "Module 2: SQL Basics",
        questions: [
          {
            q: "Which command retrieves data?",
            options: ["SELECT", "GET", "FETCHALL", "READ"],
            answer: 0,
          },
          {
            q: "Which command adds new records?",
            options: ["ADD", "INSERT", "CREATE", "PUT"],
            answer: 1,
          },
          {
            q: "Which command changes existing records?",
            options: ["CHANGE", "UPDATE", "MODIFY", "EDIT"],
            answer: 1,
          },
          {
            q: "Which command removes records?",
            options: ["REMOVE", "DELETE", "DROPALL", "CLEAR"],
            answer: 1,
          },
        ],
      },

      {
        title: "Module 3: Database Design",
        questions: [
          {
            q: "What is a table made up of?",
            options: [
              "Rows and columns",
              "Only images",
              "Only files",
              "Only formulas",
            ],
            answer: 0,
          },
          {
            q: "What is normalization used for?",
            options: [
              "Reducing data redundancy",
              "Adding duplicate data",
              "Deleting tables",
              "Formatting text",
            ],
            answer: 0,
          },
          {
            q: "What is a foreign key?",
            options: [
              "A key linking related tables",
              "A password",
              "A database name",
              "A file name",
            ],
            answer: 0,
          },
          {
            q: "What does a relationship connect?",
            options: [
              "Tables",
              "Browsers",
              "Operating systems",
              "Images",
            ],
            answer: 0,
          },
        ],
      },
    ],
  },

  {
    name: "Python Programming",
    category: "PROGRAMMING",
    icon: "🐍",
    modules: [
      {
        title: "Module 1: Python Basics",
        questions: [
          {
            q: "What is Python?",
            options: [
              "A programming language",
              "A database",
              "A browser",
              "An operating system",
            ],
            answer: 0,
          },
          {
            q: "Which function displays output?",
            options: ["display()", "print()", "show()", "output()"],
            answer: 1,
          },
          {
            q: "Which symbol starts a comment?",
            options: ["//", "#", "<!--", "/*"],
            answer: 1,
          },
          {
            q: "Which type stores text?",
            options: ["int", "str", "float", "bool"],
            answer: 1,
          },
        ],
      },

      {
        title: "Module 2: Python Functions",
        questions: [
          {
            q: "Which keyword defines a function?",
            options: ["function", "def", "fun", "method"],
            answer: 1,
          },
          {
            q: "What does return do?",
            options: [
              "Returns a value from a function",
              "Stops the computer",
              "Creates a loop",
              "Deletes a variable",
            ],
            answer: 0,
          },
          {
            q: "What is a parameter?",
            options: [
              "A value passed to a function",
              "A database",
              "A loop",
              "A file",
            ],
            answer: 0,
          },
          {
            q: "Which keyword imports a module?",
            options: ["include", "import", "use", "module"],
            answer: 1,
          },
        ],
      },

      {
        title: "Module 3: Python Data Structures",
        questions: [
          {
            q: "Which collection is ordered and changeable?",
            options: ["List", "Tuple", "Set", "None"],
            answer: 0,
          },
          {
            q: "Which collection uses key-value pairs?",
            options: ["List", "Tuple", "Dictionary", "Set"],
            answer: 2,
          },
          {
            q: "Which brackets create a list?",
            options: ["()", "{}", "[]", "<>"],
            answer: 2,
          },
          {
            q: "Which structure does not allow duplicate values?",
            options: ["List", "Set", "String", "Tuple"],
            answer: 1,
          },
        ],
      },
    ],
  },

  {
    name: "Data Analytics",
    category: "DATA",
    icon: "📊",
    modules: [
      {
        title: "Module 1: Data Analytics Basics",
        questions: [
          {
            q: "What is data analysis?",
            options: [
              "The process of examining and interpreting data",
              "Creating hardware",
              "Designing websites",
              "Installing software",
            ],
            answer: 0,
          },
          {
            q: "Which type of data contains measurable values?",
            options: [
              "Categorical data",
              "Numerical data",
              "Qualitative data",
              "Text-only data",
            ],
            answer: 1,
          },
          {
            q: "What is data visualization?",
            options: [
              "Deleting data",
              "Representing information visually",
              "Encrypting data",
              "Storing passwords",
            ],
            answer: 1,
          },
          {
            q: "Which step commonly comes before analysis?",
            options: [
              "Data cleaning",
              "Certificate generation",
              "Login",
              "Printing",
            ],
            answer: 0,
          },
        ],
      },

      {
        title: "Module 2: Data Cleaning",
        questions: [
          {
            q: "What is a missing value?",
            options: [
              "Unavailable information in a dataset",
              "A duplicate record",
              "A chart",
              "A calculated value",
            ],
            answer: 0,
          },
          {
            q: "Why are duplicates removed?",
            options: [
              "To increase file size",
              "To avoid repeated information",
              "To create more records",
              "To hide data",
            ],
            answer: 1,
          },
          {
            q: "What is data cleaning?",
            options: [
              "Preparing and improving raw data",
              "Designing a website",
              "Creating a password",
              "Installing software",
            ],
            answer: 0,
          },
          {
            q: "Which can affect data quality?",
            options: [
              "Missing values",
              "Duplicate records",
              "Incorrect information",
              "All of these",
            ],
            answer: 3,
          },
        ],
      },

      {
        title: "Module 3: Data Visualization",
        questions: [
          {
            q: "Why is data visualization useful?",
            options: [
              "It hides patterns",
              "It makes patterns and trends easier to understand",
              "It deletes data",
              "It prevents analysis",
            ],
            answer: 1,
          },
          {
            q: "Which can represent data visually?",
            options: [
              "Charts",
              "Graphs",
              "Dashboards",
              "All of these",
            ],
            answer: 3,
          },
          {
            q: "What does a chart help identify?",
            options: [
              "Patterns and trends",
              "Computer viruses",
              "Passwords",
              "Operating systems",
            ],
            answer: 0,
          },
          {
            q: "What is the main purpose of visualization?",
            options: [
              "Make information easier to understand",
              "Make data harder to read",
              "Remove all data",
              "Create duplicate records",
            ],
            answer: 0,
          },
        ],
      },
    ],
  },

  {
    name: "Cyber Security Fundamentals",
    category: "SECURITY",
    icon: "🔐",
    modules: [
      {
        title: "Module 1: Cyber Security Basics",
        questions: [
          {
            q: "What is cyber security?",
            options: [
              "Protection of systems and data from digital threats",
              "Web designing",
              "Database formatting",
              "Graphic designing",
            ],
            answer: 0,
          },
          {
            q: "What is phishing?",
            options: [
              "A type of cyber attack",
              "A programming language",
              "A database",
              "A backup method",
            ],
            answer: 0,
          },
          {
            q: "Which helps protect an account?",
            options: [
              "Strong password",
              "Sharing password",
              "Using the same password everywhere",
              "Ignoring security alerts",
            ],
            answer: 0,
          },
          {
            q: "What does malware mean?",
            options: [
              "Malicious software",
              "Database software",
              "Design software",
              "Educational software",
            ],
            answer: 0,
          },
        ],
      },

      {
        title: "Module 2: Network Security",
        questions: [
          {
            q: "What does a firewall help protect?",
            options: [
              "A network",
              "A keyboard",
              "A monitor",
              "A document",
            ],
            answer: 0,
          },
          {
            q: "What is encryption?",
            options: [
              "Converting data into a protected form",
              "Deleting data",
              "Copying files",
              "Printing information",
            ],
            answer: 0,
          },
          {
            q: "Which is a security threat?",
            options: [
              "Malware",
              "Keyboard",
              "Monitor",
              "Printer",
            ],
            answer: 0,
          },
          {
            q: "Why are security updates important?",
            options: [
              "They can fix security vulnerabilities",
              "They delete all files",
              "They slow every computer",
              "They remove passwords",
            ],
            answer: 0,
          },
        ],
      },

      {
        title: "Module 3: Online Safety",
        questions: [
          {
            q: "What should you do with suspicious links?",
            options: [
              "Avoid opening them",
              "Open immediately",
              "Share them",
              "Send your password",
            ],
            answer: 0,
          },
          {
            q: "What makes a password stronger?",
            options: [
              "A combination of different characters",
              "Your name only",
              "123456",
              "password",
            ],
            answer: 0,
          },
          {
            q: "What is two-factor authentication?",
            options: [
              "An additional verification step",
              "A type of malware",
              "A database",
              "A browser",
            ],
            answer: 0,
          },
          {
            q: "Should you share your password with others?",
            options: [
              "Yes",
              "No",
              "Only online",
              "Always",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function Quizzes() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const course = courses.find(
    (item) => item.name === selectedCourse
  );

  const module = course?.modules.find(
    (item) => item.title === selectedModule
  );

  const questions = module?.questions || [];

  const resetQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(null);
  };

  const openCourse = (courseName) => {
    setSelectedCourse(courseName);
    setSelectedModule(null);
    resetQuiz();
  };

  const openModule = (moduleTitle) => {
    setSelectedModule(moduleTitle);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(null);
  };

  const goBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedModule(null);
    resetQuiz();
  };

  const goBackToModules = () => {
    setSelectedModule(null);
    resetQuiz();
  };

  const chooseAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;

    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      return;
    }

    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (newAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round(
      (correctAnswers / questions.length) * 100
    );

    setScore(finalScore);

    localStorage.setItem(
      `quiz_${selectedCourse}_${selectedModule}`,
      String(finalScore)
    );
  };

  /* =====================================================
     COMMON STYLES
  ===================================================== */

  const pageStyle = {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "#f5f7fb",
    boxSizing: "border-box",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "1150px",
    margin: "0 auto",
  };

  const headerStyle = {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    marginBottom: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  };

  const primaryButton = {
    width: "100%",
    padding: "13px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px",
  };

  const backButton = {
    border: "none",
    background: "transparent",
    color: "#4f46e5",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
    padding: "5px 0",
  };

  /* =====================================================
     SCREEN 1 — COURSE LIST
  ===================================================== */

  if (!selectedCourse) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>

          <div style={headerStyle}>
            <div
              style={{
                color: "#4f46e5",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              QUIZZES
            </div>

            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "32px",
                color: "#1f2937",
              }}
            >
              Quizzes 🧠
            </h1>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              Test your knowledge across all six courses.
            </p>
          </div>

          <div style={gridStyle}>
            {courses.map((item) => (
              <div
                key={item.name}
                style={{
                  ...cardStyle,
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onClick={() => openCourse(item.name)}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "15px",
                    background: "#eef2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "18px",
                  }}
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    color: "#4f46e5",
                    fontSize: "12px",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  {item.category}
                </div>

                <h2
                  style={{
                    margin: "0 0 10px",
                    color: "#1f2937",
                    fontSize: "21px",
                  }}
                >
                  {item.name}
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {item.modules.length} modules available
                </p>

                <button
                  type="button"
                  style={primaryButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    openCourse(item.name);
                  }}
                >
                  Open Course Quiz →
                </button>
              </div>
            ))}
          </div>

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

          <button
            type="button"
            style={backButton}
            onClick={goBackToCourses}
          >
            ← Back to Quizzes
          </button>

          <div style={headerStyle}>
            <div
              style={{
                color: "#4f46e5",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              COURSE QUIZ
            </div>

            <h1
              style={{
                margin: "0 0 10px",
                color: "#1f2937",
              }}
            >
              {course?.icon} {course?.name}
            </h1>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
              }}
            >
              Select a module to start your quiz.
            </p>
          </div>

          <div style={gridStyle}>
            {course?.modules.map((item, index) => {

              const savedScore = localStorage.getItem(
                `quiz_${course.name}_${item.title}`
              );

              return (
                <div
                  key={item.title}
                  style={{
                    ...cardStyle,
                    cursor: "pointer",
                  }}
                  onClick={() => openModule(item.title)}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      background: "#4f46e5",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      marginBottom: "18px",
                    }}
                  >
                    {index + 1}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 10px",
                      color: "#1f2937",
                      fontSize: "20px",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#6b7280",
                    }}
                  >
                    {item.questions.length} Questions
                  </p>

                  {savedScore !== null && (
                    <p
                      style={{
                        margin: "8px 0",
                        color:
                          Number(savedScore) >= 75
                            ? "#16a34a"
                            : "#dc2626",
                        fontWeight: "600",
                      }}
                    >
                      Previous Score: {savedScore}%
                    </p>
                  )}

                  <button
                    type="button"
                    style={primaryButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      openModule(item.title);
                    }}
                  >
                    {savedScore !== null
                      ? "Retake Quiz →"
                      : "Start Quiz →"}
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
     SCREEN 3 — RESULT
  ===================================================== */

  if (score !== null) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>

          <button
            type="button"
            style={backButton}
            onClick={goBackToModules}
          >
            ← Back to Modules
          </button>

          <div
            style={{
              ...headerStyle,
              textAlign: "center",
              padding: "45px 25px",
            }}
          >
            <div
              style={{
                color: "#4f46e5",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "12px",
              }}
            >
              QUIZ COMPLETED
            </div>

            <h1
              style={{
                margin: "0 0 25px",
                color: "#1f2937",
              }}
            >
              Your Score
            </h1>

            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                margin: "0 auto 25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  score >= 75
                    ? "#dcfce7"
                    : "#fee2e2",
                color:
                  score >= 75
                    ? "#15803d"
                    : "#dc2626",
                fontSize: "38px",
                fontWeight: "800",
                border:
                  score >= 75
                    ? "8px solid #86efac"
                    : "8px solid #fca5a5",
              }}
            >
              {score}%
            </div>

            {score >= 75 ? (
              <>
                <h2 style={{ color: "#15803d" }}>
                  🎉 Congratulations!
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "16px",
                  }}
                >
                  You passed the quiz with a score
                  of <strong>{score}%</strong>.
                </p>

                <p
                  style={{
                    color: "#15803d",
                    fontWeight: "700",
                  }}
                >
                  Certificate eligibility: Qualified
                </p>
              </>
            ) : (
              <>
                <h2 style={{ color: "#dc2626" }}>
                  Keep Learning!
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "16px",
                  }}
                >
                  You scored <strong>{score}%</strong>.
                </p>

                <p
                  style={{
                    color: "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  You need at least 75% to pass.
                </p>
              </>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "25px",
              }}
            >
              <button
                type="button"
                style={{
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#4f46e5",
                  color: "#ffffff",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={restartQuiz}
              >
                Retake Quiz
              </button>

              <button
                type="button"
                style={{
                  padding: "12px 22px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  background: "#ffffff",
                  color: "#374151",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={goBackToModules}
              >
                Back to Modules
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

  const currentQuestion = questions[questionIndex];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <button
          type="button"
          style={backButton}
          onClick={goBackToModules}
        >
          ← Back to Modules
        </button>

        <div style={headerStyle}>
          <div
            style={{
              color: "#4f46e5",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            {course?.name}
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              color: "#1f2937",
              fontSize: "28px",
            }}
          >
            {selectedModule}
          </h1>

          <div
            style={{
              color: "#6b7280",
              fontWeight: "600",
            }}
          >
            Question {questionIndex + 1} of{" "}
            {questions.length}
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
              color: "#1f2937",
              lineHeight: "1.4",
            }}
          >
            {currentQuestion.q}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {currentQuestion.options.map(
              (option, index) => {

                const isSelected =
                  selectedAnswer === index;

                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      chooseAnswer(index)
                    }
                    style={{
                      width: "100%",
                      padding: "16px",
                      textAlign: "left",
                      borderRadius: "12px",
                      border: isSelected
                        ? "2px solid #4f46e5"
                        : "1px solid #d1d5db",
                      background: isSelected
                        ? "#eef2ff"
                        : "#ffffff",
                      color: "#1f2937",
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
                        background: isSelected
                          ? "#4f46e5"
                          : "#f3f4f6",
                        color: isSelected
                          ? "#ffffff"
                          : "#374151",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                      }}
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>{option}</span>
                  </button>
                );
              }
            )}
          </div>

          <button
            type="button"
            disabled={selectedAnswer === null}
            onClick={submitAnswer}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background:
                selectedAnswer === null
                  ? "#d1d5db"
                  : "#4f46e5",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "700",
              cursor:
                selectedAnswer === null
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {questionIndex === questions.length - 1
              ? "Submit Quiz"
              : "Next Question →"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Quizzes;