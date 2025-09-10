class DealService {
    static BASE_URL = "http://localhost:8080/api/deals";
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

    //static function to fetch the deals data by id
    static async getDealById(id) {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            headers: this.authHeaders,
        });
        if (!response.ok) {
            throw new Error("failed to fetch the deal by this id");
        }
        const data = await response.json();
        return data;
    }
    //static function to fetch the deals data
    static async getDeals() {
        const response = await fetch(this.BASE_URL, {
            headers: this.authHeaders,
        });
        if (!response.ok) {
            throw new Error("failed to fetch the deal");
        }
        return await response.json();
    }
    //static function to create a new Deal
    static async createDeal(data, token) {
        const response = await fetch(this.BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Token attach ചെയ്തു
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("failed to create the new Deal");
        }
        return await response.json();
    }
    //static function to update a Deal
    static async updateDeal(id, data) {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: "PUT",
            headers: this.authHeaders,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("failed to update the Deal");
        }
        return await response.json();
    }
}

export default DealService;
