import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={isDashboard ? "dashboard" : location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
        <Route path="/course-details" element={<PageTransition><CourseDetails /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

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
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
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
