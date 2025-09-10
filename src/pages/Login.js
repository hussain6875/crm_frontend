import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { validateLoginForm, validateForgotPassword } from "../utils/validation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, forgotPassword, clearMessages } from "../redux/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading ,token} = useSelector((state) => state.auth|| {});
  // Handle input changes
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  // Login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateLoginForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
     
      dispatch(loginUser(formValues)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Login successful!");
          dispatch(clearMessages());
        } else {
          toast.error(res.payload || "Login failed");
        }
      });
    }
  };

  // Redirect after login success
  useEffect(() => {
    if (token) {
      setTimeout(() => navigate("/dashboard"), 1000);
  
    }
  }, [token, navigate]);

  // Forgot password submit
  const handleForgotPassword = (e) => {
    e.preventDefault();   
    const errors = validateForgotPassword(forgotEmail );
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setForgotError(errors.email);
      return;
    }

    dispatch(forgotPassword({ email: forgotEmail })).then((res) => {
  
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Password reset link sent to email!");
        setShowForgotModal(false);
        setForgotEmail("");
        setForgotError("");
      } else {
        toast.error(res.payload || "Invalid Email ID");
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm w-100 mx-2"
        style={{ maxWidth: "500px" }}
      >
        <h4 className="text-center fw-bold mb-4">Log in</h4>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && (
              <div className="invalid-feedback">{formErrors.email}</div>
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
                  formErrors.password ? "is-invalid" : ""
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
              {formErrors.password && (
                <div className="invalid-feedback d-block">
                  {formErrors.password}
                </div>
              )}
            </div>
          </div>

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
          className={`forgot-modal-backdrop show`}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="forgot-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="modal-title m-0">Forgot Password</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowForgotModal(false)}
              ></button>
            </div>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label className="form-label">Enter your email</label>
                <input
                  type="email"
                  className={`form-control ${forgotError ? "is-invalid" : ""}`}
                  placeholder="Enter your registered email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    setForgotError("");
                  }}
                  required
                />
                {forgotError && (
                  <div className="invalid-feedback">{forgotError}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
