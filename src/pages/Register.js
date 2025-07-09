import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../utils/validation";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setSuccessMessage("Registration successful! 🎉");

      // Navigate after 5 seconds
      setTimeout(() => {
        navigate("");
      }, 5000);

      // Clear form and message after 5 seconds
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          industry: "",
          country: "",
        });
        setSuccessMessage("");
        setIsSubmitting(false);
      }, 5000);
    }
  };

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

          {successMessage && (
            <div className="alert alert-success text-center" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
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
              onClick={() => navigate("/")}
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
