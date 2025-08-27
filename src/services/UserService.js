class UserService {
  static BASE_URL = "http://localhost:8080/api/users";
  //to get the token globally
static get token() {
    return localStorage.getItem('token');
  }
  //to set the authorization header globally
   static get authHeaders() {
    return {
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
  }

  // GET all users
  static async getUsers() {
  
    const response = await fetch(this.BASE_URL, {
      headers: this.authHeaders,
      
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
      headers:this.authHeaders,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch the user");
    }
    return response.json();
  }

  // POST create new user
  static async createUser(userData) {
      
    const response = await fetch(this.BASE_URL, {
     headers:this.authHeaders,
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  }

 
}
export default UserService;
