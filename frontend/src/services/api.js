/**
 * API Service
 * 
 * Centralized API calls using axios
 */

import axios from 'axios';
import apiConfig from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

// Request interceptor (optional - for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      
      // Handle 401 Unauthorized - redirect to login
      if (status === 401 && !window.location.pathname.includes('/vedantlights/login')) {
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_username');
        if (window.location.pathname.startsWith('/vedantlights')) {
          window.location.href = '/vedantlights/login';
        }
      }
      
      const errMsg = data?.error || data?.message || 'An error occurred';
      const hint = data?.hint;
      return Promise.reject({
        message: hint ? `${errMsg} (${hint})` : errMsg,
        error: data?.error,
        hint: data?.hint,
        status,
        errors: data?.errors || {},
      });
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

// Blog API
export const blogAPI = {
  /**
   * Get all published blogs
   * @param {Object} params - Query parameters (page, per_page, category, featured)
   * @returns {Promise}
   */
  getAll: (params = {}) => {
    return api.get('/blogs', { params });
  },

  /**
   * Get single blog by slug
   * @param {string} slug - Blog slug
   * @returns {Promise}
   */
  getBySlug: (slug) => {
    return api.get(`/blogs/${slug}`);
  },
};

// Category API
export const categoryAPI = {
  /**
   * Get all active categories
   * @returns {Promise}
   */
  getAll: () => {
    return api.get('/categories');
  },
};

// Contact API
export const contactAPI = {
  /**
   * Submit contact form
   * @param {Object} data - Contact form data (name, email, mobile, message)
   * @returns {Promise}
   */
  submit: (data) => {
    return api.post('/contact', data);
  },
};

// Admin API
export const adminAPI = {
  blogs: {
    /**
     * Get all blogs (admin)
     * @param {Object} params - Query parameters (page, per_page)
     * @returns {Promise}
     */
    getAll: (params = {}) => {
      return api.get('/admin/blogs', { params });
    },

    /**
     * Create new blog
     * @param {Object} data - Blog data
     * @returns {Promise}
     */
    create: (data) => {
      return api.post('/admin/blogs', data);
    },

    /**
     * Update blog
     * @param {number} id - Blog ID
     * @param {Object} data - Blog data
     * @returns {Promise}
     */
    update: (id, data) => {
      return api.put(`/admin/blogs/${id}`, data);
    },

    /**
     * Delete blog
     * @param {number} id - Blog ID
     * @returns {Promise}
     */
    delete: (id) => {
      return api.delete(`/admin/blogs/${id}`);
    },
  },

  categories: {
    /**
     * Get all categories (admin)
     * @returns {Promise}
     */
    getAll: () => {
      return api.get('/admin/categories');
    },

    /**
     * Create new category
     * @param {Object} data - Category data
     * @returns {Promise}
     */
    create: (data) => {
      return api.post('/admin/categories', data);
    },

    /**
     * Update category
     * @param {number} id - Category ID
     * @param {Object} data - Category data
     * @returns {Promise}
     */
    update: (id, data) => {
      return api.put(`/admin/categories/${id}`, data);
    },

    /**
     * Delete category
     * @param {number} id - Category ID
     * @returns {Promise}
     */
    delete: (id) => {
      return api.delete(`/admin/categories/${id}`);
    },
  },

  contacts: {
    /**
     * Get all contact messages
     * @param {Object} params - Query parameters (page, per_page)
     * @returns {Promise}
     */
    getAll: (params = {}) => {
      return api.get('/admin/contact-messages', { params });
    },
  },

  upload: {
    /**
     * Upload image file
     * @param {File} file - Image file to upload
     * @returns {Promise}
     */
    image: (file) => {
      const formData = new FormData();
      formData.append('image', file);
      
      // Don't set Content-Type header - let axios set it with boundary
      return axios.post(`${apiConfig.baseURL}/admin/upload`, formData, {
        timeout: apiConfig.timeout,
        headers: {
          // Remove Content-Type to let browser set it with boundary
        },
      }).then(response => response.data).catch(error => {
        // Handle errors consistently
        if (error.response) {
          const { data, status } = error.response;
          return Promise.reject({
            message: data?.message || 'An error occurred',
            status,
            errors: data?.errors || {},
          });
        } else if (error.request) {
          return Promise.reject({
            message: 'Network error. Please check your connection.',
            status: 0,
          });
        } else {
          return Promise.reject({
            message: error.message || 'An unexpected error occurred',
            status: 0,
          });
        }
      });
    },

    /**
     * Delete uploaded image
     * @param {string} filename - Filename to delete
     * @returns {Promise}
     */
    delete: (filename) => {
      return api.delete(`/admin/upload/${filename}`);
    },
  },
};

// Authentication API
export const authAPI = {
  /**
   * Login
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise}
   */
  login: (username, password) => {
    return api.post('/auth/login', {
      username,
      password,
    });
  },

  /**
   * Logout
   * @returns {Promise}
   */
  logout: () => {
    return api.post('/auth/logout').then(() => {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_username');
    });
  },

  /**
   * Check authentication status
   * @returns {Promise}
   */
  check: () => {
    return api.get('/auth/check');
  },
};

export default api;
