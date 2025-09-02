import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/AuthSlice";
import { validateRegisterForm } from "../utils/validation";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(registerUser(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => navigate("/"), 2000);
        }
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  const placeholderStyle = { color: "#625f5f", opacity: 1 };

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100 py-4 overflow-visible overflow-sm-auto"
      style={{ backgroundColor: "#f9f9fb", padding: "0 20px" }}
    >
      <div className="w-100" style={{ maxWidth: "950px" }}>
        <div
          className="card p-4 shadow-sm w-100"
          style={{ border: "1px solid #eaeaea" }}
        >
          <h4 className="text-center fw-bold mb-4">Register</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* First Name */}
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  className={`form-control ${errors.firstName && "is-invalid"}`}
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={placeholderStyle}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className={`form-control ${errors.lastName && "is-invalid"}`}
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={placeholderStyle}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={placeholderStyle}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  className={`form-control ${errors.phone && "is-invalid"}`}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={placeholderStyle}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              {/* Company */}
              <div className="col-md-6">
                <label className="form-label">Company Name</label>
                <input
                  name="company"
                  type="text"
                  className={`form-control ${errors.company && "is-invalid"}`}
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleChange}
                  style={placeholderStyle}
                />
                {errors.company && (
                  <div className="invalid-feedback">{errors.company}</div>
                )}
              </div>

              {/* Industry */}
              <div className="col-md-6">
                <label className="form-label">Industry Type</label>
                <select
                  name="industry"
                  className={`form-select ${errors.industry && "is-invalid"}`}
                  value={formData.industry}
                  onChange={handleChange}
                  style={placeholderStyle}
                >
                  <option value="">Choose</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
                {errors.industry && (
                  <div className="invalid-feedback">{errors.industry}</div>
                )}
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    style={placeholderStyle}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.confirmPassword && "is-invalid"
                    }`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={placeholderStyle}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Country */}
              <div className="col-md-6">
                <label className="form-label">Country or Region</label>
                <input
                  name="country"
                  type="text"
                  className={`form-control ${errors.country && "is-invalid"}`}
                  placeholder="Enter your country or region"
                  value={formData.country}
                  onChange={handleChange}
                  style={placeholderStyle}
                />
                {errors.country && (
                  <div className="invalid-feedback">{errors.country}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="row mt-4">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Login Link */}
        <div className="w-100 d-flex justify-content-center mt-4 pe-2">
          <small className="text-muted">
            Already have an account?{" "}
            <span
              className="text-primary"
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
