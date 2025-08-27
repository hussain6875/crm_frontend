class UserService {
  static BASE_URL = "http://localhost:8080/api/users";

  // GET all users
  static async getUsers() {
    const token = localStorage.getItem('token');
    const response = await fetch(this.BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch the users");
    }
    return response.json();
  }

  // GET user by ID
  static async getUserById(id) {
      const token = localStorage.getItem('token');
    const response = await fetch(`${this.BASE_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch the user");
    }
    return response.json();
  }

  // POST create new user
  static async createUser(userData) {
      
    const response = await fetch(this.BASE_URL, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  }

 
}
export default UserService;
