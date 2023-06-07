const API_BASE = "http://localhost:8000/api/v1/";

class BaseApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, method, data = {}, customHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const requestOptions = {
      method,
      headers,
    };

    if (!(method === "GET" || method === "DELETE")) {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(
        `${this.baseURL}${endpoint}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`Failed to ${method} data from ${endpoint}`);
      }
      if (method !== "DELETE") return response.json();
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }
}

class Api extends BaseApi {
  async get(endpoint, customHeaders = {}) {
    return this.request(endpoint, "GET", null, customHeaders);
  }

  async post(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "POST", data, customHeaders);
  }

  async put(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "PUT", data, customHeaders);
  }

  async patch(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "PATCH", data, customHeaders);
  }

  async delete(endpoint, customHeaders = {}) {
    return this.request(endpoint, "DELETE", null, customHeaders);
  }
}

class AuthenticatedApi extends Api {
  constructor(baseURL, email, password) {
    super(baseURL);
    this.email = email;
    this.password = password;
  }

  getAuthorizationHeader() {
    const credentials = btoa(`${this.email}:${this.password}`);
    return {
      Authorization: `Basic ${credentials}`,
    };
  }

  async request(endpoint, method, data = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthorizationHeader(),
    };

    return super.request(endpoint, method, data, headers);
  }
}

const api = new Api(API_BASE);
const authenticatedApi = (email, password) => {
  return new AuthenticatedApi(API_BASE, email, password);
};

export { api, authenticatedApi };
