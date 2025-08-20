import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { validateLoginForm } from "../utils/validation";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setLoginError("");
    setLoginSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (
        formValues.email === "test@example.com" &&
        formValues.password === "12345678"
      ) {
        localStorage.setItem("token", "sample-jwt-token");
        setLoginSuccess("Login successful! Redirecting...");
        setLoginError("");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setLoginError("Invalid email or password.");
        setLoginSuccess("");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm w-100 mx-2"
        style={{ maxWidth: "500px" }}
      >
        <h4 className="text-center fw-bold mb-4">Log in</h4>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label className="form-label">Password</label>
              <a href="#" className="text-primary text-decoration-none small">
                Forgot password?
              </a>
            </div>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
                required
                style={{
                  paddingRight: "2.5rem",
                  height: "45px",
                  lineHeight: "1.5",
                }}
              />

              <div
                className="position-absolute"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  zIndex: 10,
                  fontSize: "1.2rem",
                  color: "#666",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </div>

              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          {/* Login error and success messages */}
          {loginError && <div className="text-danger mb-2">{loginError}</div>}
          {loginSuccess && (
            <div className="text-success mb-2">{loginSuccess}</div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Log in
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <span
              className="text-primary"
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
