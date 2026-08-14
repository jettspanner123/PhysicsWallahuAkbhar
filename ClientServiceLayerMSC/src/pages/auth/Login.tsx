import React, { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthServices } from "../../Services/AuthServices";
import { ResponseModel } from "../../Models/ResponseModel";
import "../common/Home.css";
import "./Login.css";

interface ErrorResponse {
  message: string;
  statusCode: number;
}

function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const authServices = AuthServices.getInstance();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await authServices.login(credentials.email, credentials.password);
    },
    onSuccess: (data: ResponseModel<any>) => {
      if (data.success && data.data) {
        toast.success("Login successful!", {
          description: `Welcome back, ${data.data.user.name}!`,
        });
        
        // Small delay for better UX
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        toast.error("Login failed", {
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
              description: errorMessage || "Please check your email format.",
            });
            break;
          case 401:
            toast.error("Invalid Credentials", {
              description: errorMessage || "Email or password is incorrect.",
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

    if (!email || !password) {
      toast.error("Missing Information", {
        description: "Please fill in all fields.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Invalid Password", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="home-page-wrapper">
      <div className="auth-page-main">
        <div className="auth-card auth-card-wide">
          <h1>Welcome Back</h1>

          <p className="auth-subtitle">
            Login to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loginMutation.isPending}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loginMutation.isPending}
                  required
                />
              </div>
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loginMutation.isPending}
                />
                <span>Remember me</span>
              </label>

              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              className="btn-primary auth-submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a href="/signup">Create an account</a>
          </p>

          <a href="/" className="back-home">
            ← Back to E-Learn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
