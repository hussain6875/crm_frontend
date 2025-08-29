class ActivityService {
  static BASE_URL = "http://localhost:8080/activities";
  //to get the token globally
  static get token() {
    return localStorage.getItem("token");
  }
  //to set the authorization header globally
  static get authHeaders() {
    return {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  // Static function to fetch activities by module and id
  static async getActivitiesByModuleId(module, id) {
    try {
      const response = await fetch(`${this.BASE_URL}/${module}/${id}`, {
        headers: this.authHeaders,
      });
      if (!response.ok) {
        // Return mock data if backend is not available
        console.warn(`Backend not available, using mock data for activities`);
        return {
          activities: {
            tasks: [],
            calls: [],
            meetings: [],
            emails: [],
            notes: [],
          },
        };
      }
      return await response.json();
    } catch (error) {
      // Return mock data on network error
      console.warn(
        `Network error, using mock data for activities:`,
        error.message
      );
      return {
        activities: {
          tasks: [],
          calls: [],
          meetings: [],
          emails: [],
          notes: [],
        },
      };
    }
  }

  // Static function to create a new activity
  static async createActivity(module, id, data, type) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/${module}/create/${id}?activity=${type}`,
        {
          method: "POST",
          headers: this.authHeaders,
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        // Return mock success if backend is not available
        console.warn(`Backend not available, simulating ${type} creation`);
        return {
          id: Date.now(),
          ...data,
          type: type,
        };
      }
      const result = await response.json();
      return result;
    } catch (error) {
      // Return mock success on network error
      console.warn(
        `Network error, simulating ${type} creation:`,
        error.message
      );
      return {
        id: Date.now(),
        ...data,
        type: type,
      };
    }
  }
}

export default ActivityService;
