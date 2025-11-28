// API service for products and categories
// This file contains functions that interact with the backend API

const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Products
  async getProducts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category_id) params.append('category_id', filters.category_id);
    if (filters.search) params.append('search', filters.search);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getFeaturedProducts(limit = 4) {
    const response = await fetch(`${API_BASE_URL}/products/featured?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  // Categories
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getCategory(id) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  // Auth
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  }
};

export default apiService;
