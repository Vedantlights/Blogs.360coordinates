# Frontend Integration Guide

Quick reference for connecting your React frontend to the PHP backend API.

## 🔧 Setup

### 1. API Base URL Configuration

Create a config file in your React app (e.g., `src/config/api.js`):

```javascript
// Development
export const API_BASE_URL = 'http://localhost/backend/api';

// Production (update with your domain)
// export const API_BASE_URL = 'https://yourdomain.com/backend/api';
```

### 2. API Service Functions

Create an API service file (e.g., `src/services/api.js`):

```javascript
import { API_BASE_URL } from '../config/api';

/**
 * Generic API fetch function
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Blog API
export const blogAPI = {
  // Get all published blogs
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/blogs${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get single blog by slug
  getBySlug: (slug) => {
    return apiRequest(`/blogs/${slug}`);
  },
};

// Category API
export const categoryAPI = {
  // Get all active categories
  getAll: () => {
    return apiRequest('/categories');
  },
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submit: (data) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Admin APIs (if needed)
export const adminAPI = {
  blogs: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/admin/blogs${queryString ? `?${queryString}` : ''}`);
    },
    create: (data) => {
      return apiRequest('/admin/blogs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    update: (id, data) => {
      return apiRequest(`/admin/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    delete: (id) => {
      return apiRequest(`/admin/blogs/${id}`, {
        method: 'DELETE',
      });
    },
  },
  categories: {
    getAll: () => {
      return apiRequest('/admin/categories');
    },
    create: (data) => {
      return apiRequest('/admin/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    update: (id, data) => {
      return apiRequest(`/admin/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    delete: (id) => {
      return apiRequest(`/admin/categories/${id}`, {
        method: 'DELETE',
      });
    },
  },
  contacts: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/admin/contact-messages${queryString ? `?${queryString}` : ''}`);
    },
  },
};
```

## 📝 Usage Examples

### React Component Examples

#### Fetching Blogs

```javascript
import { useState, useEffect } from 'react';
import { blogAPI } from '../services/api';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await blogAPI.getAll({
          page: 1,
          per_page: 10,
          featured: true
        });
        
        if (response.success) {
          setBlogs(response.data);
          setPagination(response.pagination);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Fetching Single Blog

```javascript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';

function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await blogAPI.getBySlug(slug);
        if (response.success) {
          setBlog(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <article>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  );
}
```

#### Fetching Categories

```javascript
import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryAPI.getAll();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    fetchCategories();
  }, []);

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}
```

#### Submitting Contact Form

```javascript
import { useState } from 'react';
import { contactAPI } from '../services/api';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await contactAPI.submit(formData);
      if (response.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', mobile: '', message: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {success && <p>Message sent successfully!</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}
```

## 🔄 Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": [ ... ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 25,
    "total_pages": 3,
    "has_next": true,
    "has_prev": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": "Field-specific error message"
  }
}
```

## 🚨 Error Handling

Always check the `success` field in the response:

```javascript
const response = await blogAPI.getAll();

if (response.success) {
  // Handle success
  console.log(response.data);
} else {
  // Handle error
  console.error(response.message);
  if (response.errors) {
    // Handle validation errors
    console.error(response.errors);
  }
}
```

## 🔗 API Endpoints Summary

### Public Endpoints
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/{slug}` - Get single blog by slug
- `GET /api/categories` - Get active categories
- `POST /api/contact` - Submit contact form

### Admin Endpoints
- `GET /api/admin/blogs` - Get all blogs
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/{id}` - Update blog
- `DELETE /api/admin/blogs/{id}` - Delete blog
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/{id}` - Update category
- `DELETE /api/admin/categories/{id}` - Delete category
- `GET /api/admin/contact-messages` - Get contact messages

## 📌 Notes

1. **CORS**: The backend is configured to allow requests from common React development ports. Update `backend/config/cors.php` for production.

2. **Base URL**: Make sure to update the API base URL for production deployment.

3. **Error Handling**: Always implement proper error handling in your components.

4. **Loading States**: Show loading indicators while fetching data.

5. **Pagination**: Use the pagination object to implement pagination controls.
