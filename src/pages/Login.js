import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { validateLoginForm, validateForgotPassword } from "../utils/validation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetPassword } from "../redux/AuthSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, token } = useSelector((state) => state.auth||{});

  // Handle input changes
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Submit login
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(formValues));
    }
  };

  // Redirect after login success
  useEffect(() => {
    if (token) {
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  }, [token, navigate]);

  // Forgot Password Submit (Redux version)
  const handleForgotPassword = (e) => {
    e.preventDefault();
    const error = validateForgotPassword(forgotEmail);
    if (error) {
      setForgotError(error);
      setForgotSuccess("");
    } else {
      setForgotError("");
      dispatch(resetPassword(forgotEmail)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setForgotSuccess(" Password reset link sent to your email!");
          setTimeout(() => {
            setShowForgotModal(false);
            setForgotEmail("");
            setForgotSuccess("");
          }, 2000);
        } else {
          setForgotError(res.payload || "Something went wrong");
        }
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm w-100 mx-2"
        style={{ maxWidth: "500px" }}
      >
        <h4 className="text-center fw-bold mb-4">Log in</h4>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
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

          {/* Password */}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label className="form-label">Password</label>
              <span
                className="text-primary text-decoration-none small"
                role="button"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </span>
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

          {/* Error & Success Messages */}
          {error && <div className="text-danger mb-2">{error}</div>}
          {success && <div className="text-success mb-2">{success}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forgot Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForgotModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label className="form-label">Enter your email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        forgotError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your registered email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                    {forgotError && (
                      <div className="invalid-feedback">{forgotError}</div>
                    )}
                  </div>
                  {forgotSuccess && (
                    <div className="alert alert-success py-2">
                      {forgotSuccess}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-2"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Reset Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
