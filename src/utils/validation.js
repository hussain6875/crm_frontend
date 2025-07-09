export function validateRegisterForm(values) {
  const errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  // Phone validation
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?[0-9]{7,15}$/.test(values.phone)) {
    errors.phone = "Allowed Numbers only and  can be 7 to 15 digits long";
  }

  if (!values.company.trim()) {
    errors.company = "Company name is required";
  }

  if (!values.industry.trim()) {
    errors.industry = "Industry type is required";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required";
  }

  return errors;
}

export function validateLoginForm(values) {
  const errors = {};

  const email = values.email.trim();
  const password = values.password.trim();

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  return errors;
}
