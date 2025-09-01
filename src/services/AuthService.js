class AuthService {
  static BASE_URL = "http://localhost:8080/api/users";

  // REGISTER
  static async register(formData) {
    const response = await fetch(`${this.BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  }

  // LOGIN
  static async login(formData) {
    const response = await fetch(`${this.BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  }

  // FORGOT PASSWORD
  static async forgotPassword(email) {
    const response = await fetch(`${this.BASE_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Email not found");
    }
    return data; // expected { message: "...", resetToken?: "..." }
  }

  // RESET PASSWORD
  static async resetPassword(token, newPassword) {
    const response = await fetch(`${this.BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data; // expected { message: "Password reset successful" }
  }
}

export default AuthService;
