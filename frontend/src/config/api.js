/**
 * API Configuration
 * 
 * Update the API_BASE_URL based on your environment
 */

// Development - adjust port if your backend runs on different port
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/backend/api';

// Production (uncomment and update when deploying)
// export const API_BASE_URL = 'https://yourdomain.com/backend/api';

export default {
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};
