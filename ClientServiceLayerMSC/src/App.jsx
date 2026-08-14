import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import Courses from "./pages/common/Courses";
import CourseDetails from "./pages/common/CourseDetails";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCourses";
import Progress from "./pages/student/Progress";
import Assignments from "./pages/student/Assignments";
import Quizzes from "./pages/student/Quizzes";
import Certificates from "./pages/student/Certificates";
import ProfileSettings from "./pages/student/ProfileSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
