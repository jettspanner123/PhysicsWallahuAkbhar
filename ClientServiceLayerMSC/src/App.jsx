import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import Courses from "./pages/common/Courses";
import CourseDetails from "./pages/common/CourseDetails";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashboardLayout from "./pages/student/DashboardLayout";
import DashboardHome from "./pages/student/DashboardHome";
import MyCourses from "./pages/student/MyCourses";
import Progress from "./pages/student/Progress";
import Assignments from "./pages/student/Assignments";
import Quizzes from "./pages/student/Quizzes";
import Certificates from "./pages/student/Certificates";
import ProfileSettings from "./pages/student/ProfileSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="progress" element={<Progress />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
        </Routes>
        <Toaster 
          position="top-right" 
          richColors 
          expand={false}
          closeButton
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
