import React, { useState } from "react";
import "./Home.css";
import "./CourseDetails.css";

const courseModules = {
  "Web Development": [
    {
      title: "Module 1: HTML Basics",
      description:
        "Learn the fundamentals of HTML and how webpages are structured.",
      lessons: [
        {
          title: "Introduction to HTML",
          intro:
            "HTML stands for HyperText Markup Language. It is used to create the basic structure of webpages.",
          topics: [
            {
              title: "What is HTML?",
              content:
                "HTML is the standard markup language used to create and structure content on webpages."
            },
            {
              title: "HTML Elements and Tags",
              content:
                "HTML uses elements and tags to tell the browser how different pieces of content should be displayed."
            },
            {
              title: "HTML Document Structure",
              content:
                "A basic HTML document contains the DOCTYPE declaration, html element, head section and body section."
            },
            {
              title: "Headings and Paragraphs",
              content:
                "Headings are used to create titles and subtitles, while paragraphs are used to display blocks of text."
            },
            {
              title: "Links and Images",
              content:
                "The anchor element creates links and the image element is used to display images on a webpage."
            }
          ],
          example: `<h1>Welcome to My Website</h1>
<p>This is my first webpage.</p>
<a href="/about">About Us</a>`,
          summary:
            "HTML creates the structure of a webpage using elements and tags."
        },
        {
          title: "HTML Forms",
          intro:
            "HTML forms allow users to enter and submit information through webpages.",
          topics: [
            {
              title: "Form Element",
              content:
                "The form element is used to create an area where users can enter information."
            },
            {
              title: "Input Fields",
              content:
                "Input elements allow users to enter text, email addresses, passwords and other information."
            },
            {
              title: "Labels",
              content:
                "Labels describe form controls and improve the accessibility and usability of forms."
            }
          ],
          example: `<form>
  <label>Email</label>
  <input type="email" />

  <label>Password</label>
  <input type="password" />

  <button type="submit">Login</button>
</form>`,
          summary:
            "HTML forms are used to collect information from users."
        }
      ]
    },

    {
      title: "Module 2: CSS Fundamentals",
      description:
        "Learn how to style webpages and create attractive layouts using CSS.",
      lessons: [
        {
          title: "Introduction to CSS",
          intro:
            "CSS stands for Cascading Style Sheets. It is used to control the appearance of HTML elements.",
          topics: [
            {
              title: "What is CSS?",
              content:
                "CSS controls colors, fonts, spacing, layouts and many other visual properties of webpages."
            },
            {
              title: "Types of CSS",
              content:
                "CSS can be written inline, internally inside a style element, or externally in a separate CSS file."
            },
            {
              title: "CSS Properties",
              content:
                "CSS properties define how an HTML element should look and behave visually."
            }
          ],
          example: `.title {
  color: #2563eb;
  font-size: 32px;
  text-align: center;
}`,
          summary:
            "CSS is responsible for the design and visual appearance of webpages."
        },
        {
          title: "CSS Selectors",
          intro:
            "Selectors identify the HTML elements to which CSS styles should be applied.",
          topics: [
            {
              title: "Element Selector",
              content:
                "An element selector targets HTML elements such as p, h1, div or button."
            },
            {
              title: "Class Selector",
              content:
                "A class selector targets elements that have a particular class name."
            },
            {
              title: "ID Selector",
              content:
                "An ID selector targets an element using its unique ID."
            }
          ],
          example: `p {
  color: #555;
}

.card {
  padding: 20px;
}

#main-title {
  font-size: 30px;
}`,
          summary:
            "CSS selectors help apply specific styles to specific HTML elements."
        }
      ]
    },

    {
      title: "Module 3: JavaScript Basics",
      description:
        "Learn JavaScript fundamentals and add interactivity to webpages.",
      lessons: [
        {
          title: "Introduction to JavaScript",
          intro:
            "JavaScript is a programming language used to make webpages interactive and dynamic.",
          topics: [
            {
              title: "What is JavaScript?",
              content:
                "JavaScript allows webpages to respond to user actions and perform dynamic operations."
            },
            {
              title: "JavaScript in Web Development",
              content:
                "JavaScript works together with HTML and CSS to create interactive web applications."
            },
            {
              title: "JavaScript Statements",
              content:
                "Statements are instructions that tell JavaScript what actions to perform."
            }
          ],
          example: `let name = "Student";

console.log("Hello " + name);`,
          summary:
            "JavaScript adds logic and interactivity to webpages."
        }
      ]
    }
  ],

  "Java Programming": [
    {
      title: "Module 1: Java Fundamentals",
      description:
        "Learn the basic concepts required to start programming with Java.",
      lessons: [
        {
          title: "Introduction to Java",
          intro:
            "Java is a popular object-oriented programming language used to build many types of applications.",
          topics: [
            {
              title: "What is Java?",
              content:
                "Java is a high-level, object-oriented programming language designed to be portable across different platforms."
            },
            {
              title: "Features of Java",
              content:
                "Important Java features include object-oriented programming, portability, security and automatic memory management."
            },
            {
              title: "JDK and JRE",
              content:
                "The JDK provides tools for developing Java programs, while the JRE provides the environment needed to run Java applications."
            }
          ],
          example: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
          summary:
            "Java is a powerful object-oriented language used for developing many kinds of software."
        },
        {
          title: "Variables and Data Types",
          intro:
            "Variables store information that can be used by a Java program.",
          topics: [
            {
              title: "Variables",
              content:
                "A variable is a named memory location used to store a value."
            },
            {
              title: "Primitive Data Types",
              content:
                "Java provides primitive types such as int, double, char and boolean."
            },
            {
              title: "String",
              content:
                "String is used to store a sequence of characters."
            }
          ],
          example: `int age = 20;
double price = 99.50;
char grade = 'A';
boolean active = true;`,
          summary:
            "Variables and data types are fundamental building blocks of Java programs."
        }
      ]
    },

    {
      title: "Module 2: Control Statements",
      description:
        "Learn how Java programs make decisions and repeat operations.",
      lessons: [
        {
          title: "If and Else",
          intro:
            "Conditional statements allow Java programs to make decisions.",
          topics: [
            {
              title: "if Statement",
              content:
                "The if statement executes code when a specified condition is true."
            },
            {
              title: "else Statement",
              content:
                "The else statement executes when the if condition is false."
            },
            {
              title: "else Statement",
              content:
                "The else statement executes when the if condition is false."
            },
            {
              title: "else-if Statement",
              content:
                "The else-if structure allows a program to check multiple conditions."
            }
          ],
          example: `int age = 20;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`,
          summary:
            "Conditional statements control which part of a Java program is executed."
        },
        {
          title: "Loops",
          intro:
            "Loops repeatedly execute a block of code while a condition or sequence requires it.",
          topics: [
            {
              title: "for Loop",
              content:
                "A for loop is useful when the number of repetitions is known."
            },
            {
              title: "while Loop",
              content:
                "A while loop continues executing while its condition remains true."
            },
            {
              title: "do-while Loop",
              content:
                "A do-while loop executes its body at least once before checking the condition."
            }
          ],
          example: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,
          summary:
            "Loops reduce repeated code and make programs more efficient."
        }
      ]
    },

    {
      title: "Module 3: Object-Oriented Programming",
      description:
        "Understand the core concepts of object-oriented programming in Java.",
      lessons: [
        {
          title: "Classes and Objects",
          intro:
            "Classes and objects are the foundation of object-oriented programming.",
          topics: [
            {
              title: "Class",
              content:
                "A class is a blueprint that defines the properties and behavior of objects."
            },
            {
              title: "Object",
              content:
                "An object is an instance created from a class."
            },
            {
              title: "Methods",
              content:
                "Methods are blocks of code inside a class that perform specific tasks."
            }
          ],
          example: `class Student {
    String name;

    void display() {
        System.out.println(name);
    }
}

Student student = new Student();`,
          summary:
            "Classes define objects and objects represent real instances of those classes."
        }
      ]
    }
  ],

  "Data Analytics": [
    {
      title: "Module 1: Data Analysis Basics",
      description:
        "Understand data and learn how raw information is turned into useful insights.",
      lessons: [
        {
          title: "Introduction to Data Analysis",
          intro:
            "Data analysis is the process of examining, cleaning and interpreting data to discover useful information.",
          topics: [
            {
              title: "What is Data Analysis?",
              content:
                "Data analysis involves examining data to find patterns, trends and useful information."
            },
            {
              title: "Importance of Data",
              content:
                "Good quality data helps organizations understand situations and make informed decisions."
            },
            {
              title: "Data-Driven Decisions",
              content:
                "Data-driven decisions use evidence and information instead of relying only on assumptions."
            }
          ],
          example: `Raw Data
   ↓
Data Cleaning
   ↓
Data Analysis
   ↓
Visualization
   ↓
Insights`,
          summary:
            "Data analysis transforms raw information into meaningful insights."
        },
        {
          title: "Types of Data",
          intro:
            "Data can be classified into different types depending on its characteristics.",
          topics: [
            {
              title: "Numerical Data",
              content:
                "Numerical data contains values that can be measured or counted."
            },
            {
              title: "Categorical Data",
              content:
                "Categorical data represents groups or categories such as city, gender or product type."
            },
            {
              title: "Qualitative and Quantitative Data",
              content:
                "Qualitative data describes qualities while quantitative data represents measurable quantities."
            }
          ],
          example: `Age → Numerical
City → Categorical
Feedback → Qualitative
Sales → Quantitative`,
          summary:
            "Understanding data types helps analysts select suitable analysis techniques."
        }
      ]
    },

    {
      title: "Module 2: Data Cleaning",
      description:
        "Learn how raw datasets are prepared before analysis.",
      lessons: [
        {
          title: "Missing Values",
          intro:
            "Missing values occur when information is unavailable in a dataset.",
          topics: [
            {
              title: "Finding Missing Values",
              content:
                "The first step is identifying which rows or columns contain missing information."
            },
            {
              title: "Handling Missing Values",
              content:
                "Missing values can sometimes be removed or replaced depending on the dataset."
            }
          ],
          example: `Name     Age
John     20
Alex     -
Sara     22`,
          summary:
            "Handling missing values improves the quality of a dataset."
        },
        {
          title: "Removing Duplicates",
          intro:
            "Duplicate records contain repeated information and may affect analysis results.",
          topics: [
            {
              title: "Identifying Duplicates",
              content:
                "Duplicate records can be found by comparing values across rows."
            },
            {
              title: "Removing Duplicates",
              content:
                "Repeated records can be removed to keep only unique information."
            }
          ],
          example: `Total Records: 100
Duplicate Records: 8
Unique Records: 92`,
          summary:
            "Removing duplicates prevents the same information from being counted more than once."
        }
      ]
    },

    {
      title: "Module 3: Data Visualization",
      description:
        "Learn how charts and dashboards communicate analytical results.",
      lessons: [
        {
          title: "Introduction to Data Visualization",
          intro:
            "Data visualization represents information using charts, graphs and other visual formats.",
          topics: [
            {
              title: "What is Data Visualization?",
              content:
                "Data visualization converts information into visual formats that are easier to understand."
            },
            {
              title: "Why Visualization is Important",
              content:
                "Visualizations make patterns, trends and comparisons easier to identify."
            },
            {
              title: "Charts and Graphs",
              content:
                "Different charts can be selected depending on the type of information being communicated."
            }
          ],
          example: `Data
 ↓
Chart
 ↓
Pattern
 ↓
Insight`,
          summary:
            "Visualization makes complex information easier to understand."
        }
      ]
    }
  ],

  "Python Programming": [
    {
      title: "Module 1: Python Fundamentals",
      description:
        "Learn the basic concepts required to start programming with Python.",
      lessons: [
        {
          title: "Introduction to Python",
          intro:
            "Python is a high-level programming language known for its simple and readable syntax.",
          topics: [
            {
              title: "What is Python?",
              content:
                "Python is a versatile programming language used in web development, automation, data analysis and many other areas."
            },
            {
              title: "Features of Python",
              content:
                "Python is known for readable syntax, a large library ecosystem and support for multiple programming styles."
            },
            {
              title: "Python Applications",
              content:
                "Python is used in web development, data analysis, artificial intelligence, automation and education."
            }
          ],
          example: `print("Hello World")

name = "Student"
print(name)`,
          summary:
            "Python is beginner-friendly and widely used across many areas of software development."
        },
        {
          title: "Variables and Data Types",
          intro:
            "Python variables are used to store different types of information.",
          topics: [
            {
              title: "Variables",
              content:
                "Variables provide names for values stored in a Python program."
            },
            {
              title: "Strings",
              content:
                "Strings are sequences of characters used to represent text."
            },
            {
              title: "Numbers",
              content:
                "Python supports numeric values such as integers and floating-point numbers."
            }
          ],
          example: `name = "Student"
age = 20
price = 99.5
active = True`,
          summary:
            "Python variables can store values of different data types."
        }
      ]
    },

    {
      title: "Module 2: Python Control Flow",
      description:
        "Learn conditions and loops to control how Python programs execute.",
      lessons: [
        {
          title: "Conditional Statements",
          intro:
            "Conditional statements allow a Python program to make decisions.",
          topics: [
            {
              title: "if",
              content:
                "The if statement runs a block of code when a condition is true."
            },
            {
              title: "elif",
              content:
                "The elif statement allows another condition to be checked."
            },
            {
              title: "else",
              content:
                "The else block runs when previous conditions are false."
            }
          ],
          example: `age = 20

if age >= 18:
    print("Adult")
else:
    print("Minor")`,
          summary:
            "Conditional statements allow Python programs to make decisions."
        },
        {
          title: "Loops",
          intro:
            "Loops are used to repeat a block of code.",
          topics: [
            {
              title: "for Loop",
              content:
                "A for loop iterates through items in a sequence."
            },
            {
              title: "while Loop",
              content:
                "A while loop repeats code while a condition remains true."
            }
          ],
          example: `for i in range(1, 6):
    print(i)`,
          summary:
            "Loops make repeated operations easier and reduce unnecessary code."
        }
      ]
    },

    {
      title: "Module 3: Python Data Structures",
      description:
        "Learn how Python stores and organizes collections of information.",
      lessons: [
        {
          title: "Lists",
          intro:
            "Lists are ordered and changeable collections of values.",
          topics: [
            {
              title: "Creating Lists",
              content:
                "A list is created by placing values inside square brackets."
            },
            {
              title: "Accessing List Items",
              content:
                "List items can be accessed using their index positions."
            }
          ],
          example: `fruits = ["Apple", "Banana", "Mango"]

print(fruits[0])`,
          summary:
            "Lists are useful for storing multiple related values."
        },
        {
          title: "Dictionaries",
          intro:
            "Dictionaries store information using key-value pairs.",
          topics: [
            {
              title: "Keys and Values",
              content:
                "Each dictionary entry contains a key and its corresponding value."
            },
            {
              title: "Accessing Values",
              content:
                "Values can be retrieved by referring to their keys."
            }
          ],
          example: `student = {
    "name": "Alex",
    "age": 20
}

print(student["name"])`,
          summary:
            "Dictionaries provide a useful way to organize related information."
        }
      ]
    }
  ],

  "Database Management": [
    {
      title: "Module 1: DBMS Fundamentals",
      description:
        "Understand databases, DBMS and the basic concepts of data management.",
      lessons: [
        {
          title: "Introduction to DBMS",
          intro:
            "A Database Management System is software used to store, organize and manage data.",
          topics: [
            {
              title: "What is a Database?",
              content:
                "A database is an organized collection of information that can be stored and accessed electronically."
            },
            {
              title: "What is DBMS?",
              content:
                "DBMS software allows users and applications to create, store, retrieve and manage database information."
            },
            {
              title: "Advantages of DBMS",
              content:
                "DBMS provides better organization, controlled access, data consistency and easier data management."
            }
          ],
          example: `User
  ↓
DBMS
  ↓
Database
  ↓
Stored Information`,
          summary:
            "DBMS provides an organized way to store and manage large amounts of information."
        },
        {
          title: "DBMS vs RDBMS",
          intro:
            "DBMS and RDBMS are systems used to manage data, but RDBMS organizes information using related tables.",
          topics: [
            {
              title: "DBMS",
              content:
                "DBMS is a general system for managing databases."
            },
            {
              title: "RDBMS",
              content:
                "RDBMS stores information in tables and uses relationships between those tables."
            },
            {
              title: "Tables and Relationships",
              content:
                "Related tables can be connected using keys."
            }
          ],
          example: `Students Table
      ↓
Student_ID
      ↓
Courses Table`,
          summary:
            "RDBMS uses tables and relationships to organize structured data."
        }
      ]
    },
    {
      title: "Module 2: SQL Basics",
      description:
        "Learn SQL commands used to create, retrieve and modify database information.",
      lessons: [
        {
          title: "Introduction to SQL",
          intro:
            "SQL is a language used to communicate with relational databases.",
          topics: [
            {
              title: "What is SQL?",
              content:
                "SQL stands for Structured Query Language and is used to work with relational databases."
            },
            {
              title: "SQL Queries",
              content:
                "SQL queries allow users to retrieve and manipulate information stored in database tables."
            }
          ],
          example: `SELECT * 
FROM students;`,
          summary:
            "SQL provides commands for interacting with relational databases."
        },
        {
          title: "SELECT and WHERE",
          intro:
            "SELECT retrieves information while WHERE filters records based on a condition.",
          topics: [
            {
              title: "SELECT",
              content:
                "SELECT is used to retrieve columns or records from a table."
            },
            {
              title: "WHERE",
              content:
                "WHERE filters records according to a specified condition."
            }
          ],
          example: `SELECT name, age
FROM students
WHERE age >= 18;`,
          summary:
            "SELECT and WHERE are fundamental commands for retrieving specific data."
        }
      ]
    },

    {
      title: "Module 3: Database Design",
      description:
        "Learn keys, relationships and normalization for better database design.",
      lessons: [
        {
          title: "Primary and Foreign Keys",
          intro:
            "Keys help identify records and establish relationships between database tables.",
          topics: [
            {
              title: "Primary Key",
              content:
                "A primary key uniquely identifies each record in a table."
            },
            {
              title: "Foreign Key",
              content:
                "A foreign key connects a record in one table to a record in another table."
            }
          ],
          example: `Students
Student_ID → Primary Key

Courses
Course_ID → Primary Key`,
          summary:
            "Keys help maintain relationships and data integrity."
        },
        {
          title: "Normalization",
          intro:
            "Normalization organizes tables to reduce unnecessary data duplication.",
          topics: [
            {
              title: "Data Redundancy",
              content:
                "Data redundancy occurs when the same information is unnecessarily stored multiple times."
            },
            {
              title: "First Normal Form",
              content:
                "First Normal Form requires values to be atomic and removes repeating groups."
            },
            {
              title: "Second and Third Normal Forms",
              content:
                "Higher normal forms further reduce dependency problems and improve database structure."
            }
          ],
          example: `Large Table
    ↓
Separate Related Tables
    ↓
Reduced Redundancy`,
          summary:
            "Normalization improves database structure and reduces unnecessary duplication."
        }
      ]
    }
  ],

  "Cyber Security Fundamentals": [
    {
      title: "Module 1: Cyber Security Basics",
      description:
        "Understand the fundamentals of protecting systems, networks and information.",
      lessons: [
        {
          title: "Introduction to Cyber Security",
          intro:
            "Cyber security is the practice of protecting systems, networks and information from unauthorized activity.",
          topics: [
            {
              title: "What is Cyber Security?",
              content:
                "Cyber security focuses on protecting digital systems, networks, applications and information."
            },
            {
              title: "Importance of Security",
              content:
                "Security helps protect information and systems from unauthorized access, misuse and disruption."
            },
            {
              title: "Cyber Threats",
              content:
                "Cyber threats include activities that can compromise systems or information."
            }
          ],
          example: `User
  ↓
Security Controls
  ↓
System
  ↓
Protected Data`,
          summary:
            "Cyber security helps protect digital systems and information."
        },
        {
          title: "CIA Triad",
          intro:
            "The CIA triad represents three important goals of information security.",
          topics: [
            {
              title: "Confidentiality",
              content:
                "Confidentiality means information should only be accessible to authorized people."
            },
            {
              title: "Integrity",
              content:
                "Integrity means information should remain accurate and should not be changed improperly."
            },
            {
              title: "Availability",
              content:
                "Availability means authorized users should be able to access information when needed."
            }
          ],
          example: `Confidentiality
      +
Integrity
      +
Availability
      =
CIA Triad`,
          summary:
            "The CIA triad provides a basic framework for understanding information security."
        }
      ]
    },

    {
      title: "Module 2: Network Security",
      description:
        "Learn basic concepts used to protect computer networks.",
      lessons: [
        {
          title: "Network Security Basics",
          intro:
            "Network security protects connected devices and communication systems.",
          topics: [
            {
              title: "Network Protection",
              content:
                "Network protection uses different controls to prevent unauthorized access and misuse."
            },
            {
              title: "Access Control",
              content:
                "Access control determines which users or systems are allowed to access resources."
            }
          ],
          example: `Device
  ↓
Secure Network
  ↓
Firewall
  ↓
Internet`,
          summary:
            "Network security helps protect devices and information moving across networks."
        },
        {
          title: "Firewalls",
          intro:
            "A firewall monitors and controls network traffic according to security rules.",
          topics: [
            {
              title: "What is a Firewall?",
              content:
                "A firewall is a security control that filters network traffic."
            },
            {
              title: "Traffic Filtering",
              content:
                "Traffic can be allowed or blocked according to predefined security rules."
            }
          ],
          example: `Internet
    ↓
 Firewall
    ↓
Internal Network`,
          summary:
            "Firewalls provide an important layer of network protection."
        }
      ]
    },
    {
      title: "Module 3: Safe Online Practices",
      description:
        "Learn practical habits for staying safer while using digital services.",
      lessons: [
        {
          title: "Phishing Awareness",
          intro:
            "Phishing uses deceptive messages or websites to trick people into revealing information.",
          topics: [
            {
              title: "Recognizing Suspicious Messages",
              content:
                "Unexpected messages asking for sensitive information should be treated carefully."
            },
            {
              title: "Checking Links",
              content:
                "Users should verify links and destinations before interacting with suspicious messages."
            },
            {
              title: "Verify the Sender",
              content:
                "Checking who sent a message can help identify suspicious communication."
            }
          ],
          example: `Unexpected Message
        ↓
Verify Sender
        ↓
Check Link
        ↓
Decide Safely`,
          summary:
            "Being cautious with unexpected messages can reduce the risk of phishing."
        },
        {
          title: "Data Privacy",
          intro:
            "Data privacy involves controlling how personal information is collected, used and shared.",
          topics: [
            {
              title: "Personal Information",
              content:
                "Personal information includes details that can relate to an individual."
            },
            {
              title: "Privacy Settings",
              content:
                "Privacy settings can help control who can access or use information."
            },
            {
              title: "Safe Sharing",
              content:
                "Users should think carefully before sharing personal information online."
            }
          ],
          example: `Personal Data
      ↓
Privacy Controls
      ↓
Limited Access`,
          summary:
            "Good privacy habits help reduce unnecessary exposure of personal information."
        }
      ]
    }
  ]
};

function CourseDetails() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const selectedCourse =
    localStorage.getItem("selectedCourse") || "Web Development";

  const modules =
    courseModules[selectedCourse] ||
    courseModules[selectedCourse === "Data Analytics" ? "Data Analysis" : "Data Analytics"] ||
    [];

  const openModule = (moduleIndex) => {
    setSelectedModule(moduleIndex);
    setSelectedLesson(null);
    setSelectedTopic(null);
  };

  const openLesson = (lessonIndex) => {
    setSelectedLesson(lessonIndex);
    setSelectedTopic(null);
  };

  const openTopic = (topicIndex) => {
    setSelectedTopic(topicIndex);
  };

  const backToModules = () => {
    setSelectedModule(null);
    setSelectedLesson(null);
    setSelectedTopic(null);
  };

  const backToLessons = () => {
    setSelectedLesson(null);
    setSelectedTopic(null);
  };

  const backToLesson = () => {
    setSelectedTopic(null);
  };

  // Determine state-based content
  let mainContent = null;

  if (
    selectedModule !== null &&
    selectedLesson !== null &&
    selectedTopic !== null
  ) {
    const lesson = modules[selectedModule].lessons[selectedLesson];
    const topic = lesson.topics[selectedTopic];

    mainContent = (
      <div className="course-details-container">
        <button className="back-modules-btn" onClick={backToLesson}>
          ← Back to Lesson
        </button>

        <div className="lesson-content-card">
          <span className="lesson-badge">{selectedCourse}</span>
          <h1>{topic.title}</h1>
          <p className="lesson-intro">{topic.content}</p>

          <div className="lesson-summary-card">
            <h2>About This Topic</h2>
            <p>{topic.content}</p>
          </div>
        </div>
      </div>
    );
  } else if (
    selectedModule !== null &&
    selectedLesson !== null
  ) {
    const lesson = modules[selectedModule].lessons[selectedLesson];

    mainContent = (
      <div className="course-details-container">
        <button className="back-modules-btn" onClick={backToLessons}>
          ← Back to Lessons
        </button>

        <div className="lesson-content-card">
          <div className="lesson-header">
            <span className="lesson-badge">{selectedCourse}</span>
            <h1>{lesson.title}</h1>
            <p className="lesson-intro">{lesson.intro}</p>
          </div>

          <div className="lesson-topic-card">
            <h2>What You Will Learn</h2>
            <div className="topic-list">
              {lesson.topics.map((topic, index) => (
                <button
                  className="topic-item"
                  key={index}
                  onClick={() => openTopic(index)}
                >
                  <span className="topic-number">{index + 1}</span>
                  <span className="topic-title">{topic.title}</span>
                  <span className="topic-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lesson-example-card">
            <h2>Example</h2>
            <pre>
              <code>{lesson.example}</code>
            </pre>
          </div>

          <div className="lesson-summary-card">
            <h2>Quick Summary</h2>
            <p>{lesson.summary}</p>
          </div>
        </div>
      </div>
    );
  } else if (selectedModule !== null) {
    const module = modules[selectedModule];

    mainContent = (
      <div className="course-details-container">
        <button className="back-modules-btn" onClick={backToModules}>
          ← Back to Modules
        </button>

        <div className="lesson-section">
          <span className="module-badge">MODULE {selectedModule + 1}</span>
          <h1>{module.title}</h1>
          <p className="course-description">{module.description}</p>

          <h2>Lessons in this Module</h2>
          <div className="lesson-list">
            {module.lessons.map((lesson, index) => (
              <button
                className="lesson-item"
                key={index}
                onClick={() => openLesson(index)}
              >
                <span className="lesson-number">{index + 1}</span>
                <span className="lesson-name">{lesson.title}</span>
                <span className="lesson-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    mainContent = (
      <div className="course-details-container">
        <div className="course-details-header">
          <span className="course-label">COURSE DETAILS</span>
          <h1>{selectedCourse}</h1>
          <p className="course-description">
            Explore the modules below and learn each topic step by step.
          </p>
        </div>

        <div className="modules-section">
          <h2>Course Modules</h2>
          <div className="modules-list">
            {modules.map((module, index) => (
              <div
                className="module-card"
                key={index}
                onClick={() => openModule(index)}
              >
                <div className="module-number">{index + 1}</div>
                <div className="module-content">
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <span className="module-action">Open Module →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page-wrapper">
      {/* Top Navbar */}
      <header className="home-navbar">
        <div className="home-container nav-inner-container">
          <div className="home-logo">E-Learn</div>

          <nav className="home-nav">
            <a href="/" className="home-nav-link">Home</a>
            <a href="/courses" className="home-nav-link">Courses</a>
            <a href="/about" className="home-nav-link">About Us</a>
            <a href="/contact" className="home-nav-link">Contact</a>
          </nav>

          <div className="home-nav-buttons">
            <a href="/login">
              <button className="btn-outline">Login</button>
            </a>

            <a href="/signup">
              <button className="btn-primary">Sign Up</button>
            </a>
          </div>
        </div>
      </header>

      <main className="course-details-page">
        <div className="home-container">
          {mainContent}
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="home-footer">
        <div className="home-container">
          <div className="footer-grid">
            <div className="footer-brand-column">
              <span className="footer-logo">E-Learn</span>
              <p className="footer-desc">A quietly focused space for self-paced online education.</p>
            </div>
            
            <div className="footer-column">
              <h4>Product</h4>
              <div className="footer-links">
                <a href="/courses" className="footer-link">Courses</a>
                <a href="/about" className="footer-link">Features</a>
                <a href="/courses" className="footer-link">Checkpoints</a>
                <a href="/about" className="footer-link">Methodology</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <div className="footer-links">
                <a href="/about" className="footer-link">Documentation</a>
                <a href="/about" className="footer-link">Research</a>
                <a href="/about" className="footer-link">Guides</a>
                <a href="/about" className="footer-link">Community</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <div className="footer-links">
                <a href="/about" className="footer-link">About Us</a>
                <a href="/about" className="footer-link">Careers</a>
                <a href="/contact" className="footer-link">Contact</a>
                <a href="/about" className="footer-link">Press</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <div className="footer-links">
                <a href="/about" className="footer-link">Privacy Policy</a>
                <a href="/about" className="footer-link">Terms of Service</a>
                <a href="/about" className="footer-link">Accessibility</a>
                <a href="/about" className="footer-link">Security</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 E-Learn. All Rights Reserved.</span>
            <span>Designed under editorial brand guidelines.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CourseDetails;