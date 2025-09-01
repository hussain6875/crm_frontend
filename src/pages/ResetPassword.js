import "../App.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/AuthSlice";
import { validateResetPassword } from "../utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract token from URL query param
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({}); // Inline validation errors

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    // Validate inputs
    const validationErrors = validateResetPassword({
      password,
      confirmPassword,
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Dispatch reset password action
      dispatch(resetPassword({ token, newPassword: password })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Password reset successful! Redirecting...");
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => navigate("/"), 2000); // redirect to login
        } else {
          toast.error(
            res.payload?.message || res.payload || "Failed to reset password"
          );
        }
      });
    }
  };

  const handleCancel = () => {
    navigate("/"); // redirect to login
  };

  const isButtonDisabled =
    !password || !confirmPassword || password !== confirmPassword;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="mb-3 text-center">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="Enter new password"
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: "" });
                }}
                placeholder="Confirm new password"
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary w-50"
              disabled={isButtonDisabled}
            >
              Reset Password
            </button>
            <button
              type="button"
              className="btn btn-secondary w-50"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
