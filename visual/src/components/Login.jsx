import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import { forgotPassword, getCurrentUser, loginUser, signupUser } from "../api/auth";
import "../css/login.css"; // Import the CSS file for styling

function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();  // Get the navigate function

  useEffect(() => {
    const bootstrapUser = async () => {
      const urlToken = new URLSearchParams(window.location.search).get("token");
      if (urlToken) {
        localStorage.setItem("vv_token", urlToken);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      const token = localStorage.getItem("vv_token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const user = await getCurrentUser();
        dispatch(setUser(user));
        navigate("/", { replace: true });
      } catch (error) {
        localStorage.removeItem("vv_token");
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapUser();
  }, [dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }

    try {
      const result = await signupUser(formData.username, formData.email, formData.password);
      localStorage.setItem("vv_token", result.token);
      dispatch(setUser(result.user));
      alert("Signup successful! Please log in.");
      setIsSignup(false);
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      navigate("/", { replace: true });
    } catch (error) {
      setAuthError("Signup Failed");
    }
  };

  const handleLogin = async () => {
    try {
      const result = await loginUser(formData.email, formData.password);
      localStorage.setItem("vv_token", result.token);
      dispatch(setUser(result.user));
      alert("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      setAuthError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/auth/google`;
};

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(formData.email, formData.username, formData.password);
      alert("Password updated successfully.");
      setIsForgotPassword(false);
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setAuthError("Failed to update password.");
    }
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="login-box">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3004/3004613.png"
            alt="VisualVerse"
          />
          {isForgotPassword ? (
            <>
              <h3>Forgot Password</h3>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <button onClick={handleForgotPassword}>Send Reset Link</button>
              <button onClick={() => setIsForgotPassword(false)}>Back to Login</button>
            </>
          ) : isSignup ? (
            <>
              <h3>Sign Up</h3>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button onClick={handleSignup}>Sign Up</button>
              <button onClick={() => setIsSignup(false)}>Back to Login</button>
            </>
          ) : (
            <>
              <h3>VisualVerse</h3>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleGoogleLogin}>Sign In With Google</button>
              <button onClick={() => setIsSignup(true)}>Sign Up</button>
              <button variant="text" onClick={() => setIsForgotPassword(true)}>Forgot Password?</button>
            </>
          )}
          {authError && <p className="auth-error">{authError}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
