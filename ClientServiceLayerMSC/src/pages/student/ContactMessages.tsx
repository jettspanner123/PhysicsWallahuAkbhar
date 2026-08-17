import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MissionaryServices } from "../../Services/MissionaryServices";
import { AuthServices } from "../../Services/AuthServices";
import "./ContactMessages.css";

interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

function ContactMessages(): React.JSX.Element {
  const authServices = AuthServices.getInstance();
  const { role } = authServices.getUserInfo();

  const isInstructor = role === "TEACHER" || role === "ADMIN";

  const missionaryServices = MissionaryServices.getInstance();

  const { data: messagesResponse, isLoading, error, isError } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: () => missionaryServices.getContactMessages(),
    enabled: isInstructor,
  });

  const messages = messagesResponse?.data || [];

  if (!isInstructor) {
    return (
      <main className="contact-messages-container">
        <section className="forbidden-card">
          <i className="fa-solid fa-lock"></i>
          <h1>Access Forbidden</h1>
          <p>You do not have the required permissions to view this page. This page is only accessible to Teachers and Administrators.</p>
        </section>
      </main>
    );
  }

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const getErrorMessage = (): string => {
    const err: any = error;
    return err?.response?.data?.message || err?.message || "An unexpected error occurred.";
  };

  return (
    <main className="contact-messages-container">
      {/* Page Heading */}
      <section className="messages-heading">
        <div>
          <span className="messages-label">ADMIN AREA</span>
          <h1>Contact Messages ✉️</h1>
          <p>View support queries, course questions, and platform feedback submitted by users.</p>
        </div>
      </section>

      {isLoading ? (
        <section className="loading-container">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </section>
      ) : isError ? (
        <section className="empty-messages-card" style={{ borderColor: "#fca5a5" }}>
          <i className="fa-solid fa-circle-exclamation" style={{ color: "#ef4444" }}></i>
          <h2 style={{ color: "#b91c1c" }}>Failed to Load Messages</h2>
          <p>{getErrorMessage()}</p>
        </section>
      ) : messages.length === 0 ? (
        <section className="empty-messages-card">
          <i className="fa-regular fa-envelope-open"></i>
          <h2>No Messages Found</h2>
          <p>No contact submissions have been received in the system yet.</p>
        </section>
      ) : (
        <section className="messages-grid">
          {messages.map((msg: ContactMessage) => (
            <article className="message-card" key={msg.id}>
              <div className="message-card-header">
                <div>
                  <span className="msg-sender-name">{msg.fullName}</span>
                  <a href={`mailto:${msg.email}`} className="msg-sender-email">
                    {msg.email}
                  </a>
                </div>
                <span className="msg-date">{formatDate(msg.createdAt)}</span>
              </div>
              <div className="message-card-body">
                <h3>{msg.subject}</h3>
                <p>{msg.message}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default ContactMessages;
