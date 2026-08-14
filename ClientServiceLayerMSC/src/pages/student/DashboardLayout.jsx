import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { AuthServices } from "../../Services/AuthServices";
import ConfirmDialog from "../../components/ConfirmDialog";
import "../common/Home.css";
import "./DashboardLayout.css";

/* =========================
   SIDEBAR ITEMS
========================= */

const sidebarItems = [
  { label: "Dashboard", icon: "fa-solid fa-house", path: "/dashboard" },
  {
    label: "Browse Courses",
    icon: "fa-solid fa-compass",
    path: "/courses",
    external: true,
  },
  {
    label: "My Courses",
    icon: "fa-solid fa-graduation-cap",
    path: "/dashboard/courses",
  },
  {
    label: "My Progress",
    icon: "fa-solid fa-chart-line",
    path: "/dashboard/progress",
  },
  {
    label: "Assignments",
    icon: "fa-solid fa-clipboard-list",
    path: "/dashboard/assignments",
  },
  {
    label: "Quizzes",
    icon: "fa-solid fa-brain",
    path: "/dashboard/quizzes",
  },
  {
    label: "Certificates",
    icon: "fa-solid fa-award",
    path: "/dashboard/certificates",
  },
  {
    label: "Profile & Settings",
    icon: "fa-solid fa-gear",
    path: "/dashboard/profile",
  },
];


/* =========================
   BREADCRUMB LABELS
========================= */

const breadcrumbLabels = {
  "/dashboard/courses": "My Courses",
  "/dashboard/progress": "My Progress",
  "/dashboard/assignments": "Assignments",
  "/dashboard/quizzes": "Quizzes",
  "/dashboard/certificates": "Certificates",
  "/dashboard/profile": "Profile & Settings",
};


/* =========================
   DASHBOARD LAYOUT
========================= */

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const authServices = AuthServices.getInstance();

  const currentPath = location.pathname;
  const breadcrumbLabel = breadcrumbLabels[currentPath];
  const isHome = currentPath === "/dashboard";

  // Load user name on mount and when localStorage changes
  useEffect(() => {
    const userInfo = authServices.getUserInfo();
    if (userInfo.name) {
      setUserName(userInfo.name);
    }

    // Listen for storage changes (in case updated in another tab/component)
    const handleStorageChange = () => {
      const updatedInfo = authServices.getUserInfo();
      if (updatedInfo.name) {
        setUserName(updatedInfo.name);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [authServices]);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    authServices.logout();
    setShowLogoutDialog(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };


  return (
    <div className="home-page-wrapper">
      <div className="dash-shell">

        {/* ========================= HEADER ========================= */}

        <header className="dash-header">
          <Link to="/" className="dash-logo">
            E-Learn
          </Link>

          <div className="dash-header-actions">
            <div className="dash-user-pill">
              <span className="dash-user-avatar">
                <i className="fa-solid fa-user"></i>
              </span>
              <span className="dash-user-name">{userName}</span>
            </div>

            <button onClick={handleLogoutClick} className="dash-logout-btn">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          </div>
        </header>


        {/* ========================= BODY ========================= */}

        <div className="dash-body">

          {/* Mobile overlay */}
          {mobileOpen && (
            <div
              className="dash-overlay"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={
              "dash-sidebar" +
              (collapsed ? " collapsed" : "") +
              (mobileOpen ? " mobile-open" : "")
            }
          >
            <nav className="dash-nav">
              {sidebarItems.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? currentPath === "/dashboard"
                    : currentPath.startsWith(item.path);

                return (
                  <button
                    key={item.path}
                    className={isActive ? "active" : ""}
                    onClick={() => {
                      if (item.external) {
                        window.location.href = item.path;
                      } else {
                        navigate(item.path);
                      }
                      setMobileOpen(false);
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <i className={item.icon}></i>
                    <span className="sidebar-label">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            <button
              className="dash-collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              <i
                className={
                  "fa-solid " +
                  (collapsed
                    ? "fa-chevron-right"
                    : "fa-chevron-left")
                }
              ></i>
            </button>
          </aside>


          {/* Main content area */}
          <main className="dash-main">

            {/* Mobile hamburger toggle */}
            <button
              className="dash-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <i className="fa-solid fa-bars"></i>
              <span>Menu</span>
            </button>

            {/* Breadcrumbs */}
            {!isHome && breadcrumbLabel && (
              <nav className="dash-breadcrumbs">
                <Link to="/dashboard">Dashboard</Link>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-current">
                  {breadcrumbLabel}
                </span>
              </nav>
            )}

            <Outlet />
          </main>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Confirm Logout"
        message="Are you sure you want to logout? You'll need to login again to access your dashboard."
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        variant="warning"
      />
    </div>
  );
}


export default DashboardLayout;
