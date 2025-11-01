export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

// Register validation
export const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.firstName) errors.firstName = "First name is required";
  if (!values.lastName) errors.lastName = "Last name is required";

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
  }

  if (!values.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?[0-9]{7,15}$/.test(values.phone)) {
    errors.phone = "Allowed numbers only, 7 to 15 digits long";
  }

  if (!values.company?.trim()) errors.company = "Company name is required";
  if (!values.industry?.trim()) errors.industry = "Industry type is required";
  if (!values.country?.trim()) errors.country = "Country is required";

  // Confirm Password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

// for success message
export const getConfirmPasswordSuccess = (values, errors) => {
  if (
    values.password &&
    values.confirmPassword &&
    !errors.confirmPassword &&
    values.password === values.confirmPassword
  ) {
    return "Passwords match";
  }
  return "";
};

// Forgot password validation
export const validateForgotPassword = (email) => {
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
  return "";
};

// Reset password validation
export const validateResetPassword = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "New password is required";
  } else {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your new password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
