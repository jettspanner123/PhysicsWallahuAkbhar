import React, { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthServices } from "../../Services/AuthServices";
import { ResponseModel } from "../../Models/ResponseModel";
import { AuthResponseModel } from "../../Models/AuthResponseModel";
import "../common/Home.css";
import "./Login.css";

interface ErrorResponse {
  message: string;
  statusCode: number;
}

function Signup(): React.JSX.Element {
  const navigate = useNavigate();
  const authServices = AuthServices.getInstance();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const signupMutation = useMutation({
    mutationFn: async (credentials: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      return await authServices.register(
        credentials.name,
        credentials.email,
        credentials.password,
        credentials.confirmPassword
      );
    },
    onSuccess: (data: ResponseModel<AuthResponseModel>) => {
      if (data.success && data.data) {
        toast.success("Account created successfully!", {
          description: `Welcome, ${data.data.name}! Redirecting to dashboard...`,
        });

        // Small delay for better UX
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Registration failed", {
          description: data.message || "An unexpected error occurred.",
        });
      }
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as ErrorResponse | undefined;
        const statusCode = error.response?.status;
        const errorMessage = errorData?.message || error.message;

        switch (statusCode) {
          case 400:
            toast.error("Invalid Input", {
              description: errorMessage || "Please check your information.",
            });
            break;
          case 409:
            toast.error("Account Already Exists", {
              description: errorMessage || "This email is already registered.",
            });
            break;
          case 500:
            toast.error("Server Error", {
              description: errorMessage || "Please try again later.",
            });
            break;
          default:
            toast.error("Connection Error", {
              description: "Unable to connect to the server. Please check your internet connection.",
            });
        }
      } else {
        toast.error("Unexpected Error", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Missing Information", {
        description: "Please fill in all fields.",
      });
      return;
    }

    if (name.trim().length < 2) {
      toast.error("Invalid Name", {
        description: "Name must be at least 2 characters long.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Invalid Password", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Don't Match", {
        description: "Please make sure both passwords are identical.",
      });
      return;
    }

    if (!agreedToTerms) {
      toast.error("Terms Not Accepted", {
        description: "Please agree to the terms and conditions.",
      });
      return;
    }

    signupMutation.mutate({ name, email, password, confirmPassword });
  };

  return (
    <div className="home-page-wrapper">
      <div className="auth-page-main">
        <div className="auth-card auth-card-wide">
          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Join E-Learn and start your learning journey.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Side by side row 1: Name and Email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={signupMutation.isPending}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={signupMutation.isPending}
                  required
                />
              </div>
            </div>

            {/* Side by side row 2: Password and Confirm Password */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={signupMutation.isPending}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={signupMutation.isPending}
                  required
                />
              </div>
            </div>

            <label
              className="remember-me signup-terms"
              style={{ textAlign: "left", marginTop: "4px" }}
            >
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={signupMutation.isPending}
                required
              />
              <span>I agree to the platform's terms and conditions.</span>
            </label>

            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Already have an account? <a href="/login">Login here</a>
          </p>

          <a href="/" className="back-home">
            ← Back to E-Learn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
