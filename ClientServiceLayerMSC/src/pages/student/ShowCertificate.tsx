import React, { useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthServices } from "../../Services/AuthServices";
import "./ShowCertificate.css";

function ShowCertificate(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const authServices = AuthServices.getInstance();
  const { name: userName } = authServices.getUserInfo();

  const courseName = searchParams.get("courseName") || "Unknown Course";
  const courseCategory = searchParams.get("courseCategory") || "General";
  const enrolledAt = searchParams.get("enrolledAt") || "";
  const completedAt = searchParams.get("completedAt") || new Date().toISOString();
  const instructorName = searchParams.get("instructor") || "PhysicsWallahuAkbhar Team";

  const formatDate = (isoDate: string): string => {
    if (!isoDate) return "—";
    try {
      return new Date(isoDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return isoDate;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate("/dashboard/courses");
  };

  // Generate a unique certificate ID from params
  const certId = `PWA-${btoa(courseName + enrolledAt).replace(/[^A-Z0-9]/gi, "").substring(0, 12).toUpperCase()}`;

  return (
    <main className="cert-page">
      {/* Action toolbar — hidden on print */}
      <div className="cert-toolbar no-print">
        <button className="cert-back-btn" onClick={handleBack}>
          <i className="fa-solid fa-arrow-left"></i> Back to Courses
        </button>
        <button className="cert-print-btn" onClick={handlePrint}>
          <i className="fa-solid fa-download"></i> Download / Print
        </button>
      </div>

      {/* The actual certificate */}
      <div className="cert-wrapper" ref={certificateRef}>
        {/* Gold border frame */}
        <div className="cert-frame">

          {/* Top decorative bar */}
          <div className="cert-top-bar">
            <div className="cert-logo-area">
              <i className="fa-solid fa-atom cert-logo-icon"></i>
              <div className="cert-brand">
                <span className="cert-brand-name">PhysicsWallahuAkbhar</span>
                <span className="cert-brand-tag">Learning Platform</span>
              </div>
            </div>
            <div className="cert-id">
              <span className="cert-id-label">CERTIFICATE ID</span>
              <span className="cert-id-value">{certId}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="cert-body">
            <p className="cert-presents">This is to certify that</p>

            <div className="cert-recipient">
              <span className="cert-recipient-name">{userName || "Student"}</span>
              <div className="cert-recipient-underline"></div>
            </div>

            <p className="cert-has-completed">has successfully completed the course</p>

            <div className="cert-course-name">
              <i className="fa-solid fa-graduation-cap cert-cap-icon"></i>
              {courseName}
            </div>

            <p className="cert-category-tag">{courseCategory}</p>

            <p className="cert-description">
              This certificate is awarded in recognition of dedication, commitment,
              and the successful completion of all course requirements.
            </p>
          </div>

          {/* Dates + Seal row */}
          <div className="cert-footer">
            <div className="cert-date-block">
              <span className="cert-date-label">Date of Enrollment</span>
              <span className="cert-date-value">{formatDate(enrolledAt)}</span>
            </div>

            <div className="cert-seal">
              <div className="cert-seal-circle">
                <i className="fa-solid fa-award"></i>
              </div>
              <span className="cert-seal-label">VERIFIED &amp; CERTIFIED</span>
            </div>

            <div className="cert-date-block cert-date-right">
              <span className="cert-date-label">Date of Completion</span>
              <span className="cert-date-value">{formatDate(completedAt)}</span>
            </div>
          </div>

          {/* Signature row */}
          <div className="cert-sig-row">
            <div className="cert-sig-block">
              <div className="cert-sig-line"></div>
              <span className="cert-sig-name">{instructorName}</span>
              <span className="cert-sig-title">Course Instructor</span>
            </div>
            <div className="cert-sig-block">
              <div className="cert-sig-line"></div>
              <span className="cert-sig-name">PhysicsWallahuAkbhar</span>
              <span className="cert-sig-title">Platform Director</span>
            </div>
          </div>

          {/* Bottom decorative bar */}
          <div className="cert-bottom-bar">
            <i className="fa-solid fa-star"></i>
            <span>Certificate of Course Completion</span>
            <i className="fa-solid fa-star"></i>
          </div>

        </div>
      </div>
    </main>
  );
}

export default ShowCertificate;
