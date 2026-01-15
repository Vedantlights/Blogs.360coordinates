# Blog Website Backend API

Complete PHP REST API backend for the React blog website.

## 📁 Project Structure

```
backend/
├── api/
│   ├── blogs.php              # Public blog endpoints
│   ├── categories.php         # Public category endpoints
│   ├── contact.php            # Public contact form endpoint
│   └── admin/
│       ├── blogs.php          # Admin blog endpoints
│       ├── categories.php     # Admin category endpoints
│       └── contacts.php       # Admin contact messages endpoint
│
├── config/
│   ├── database.php           # Database configuration
│   └── cors.php               # CORS configuration
│
├── controllers/
│   ├── BlogController.php     # Blog business logic
│   ├── CategoryController.php # Category business logic
│   └── ContactController.php  # Contact message business logic
│
├── models/
│   ├── Blog.php               # Blog data access
│   ├── Category.php           # Category data access
│   └── ContactMessage.php     # Contact message data access
│
├── helpers/
│   ├── Response.php           # JSON response helper
│   └── Validator.php          # Input validation helper
│
├── index.php                  # Main entry point
├── .htaccess                  # URL rewriting rules
└── README.md                  # This file
```

## 🚀 Setup Instructions

### 1. Database Configuration

Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_NAME=blog_website
DB_USER=root
DB_PASS=your_password
DB_CHARSET=utf8mb4
```

**OR** edit `config/database.php` directly with your database credentials.

### 2. Web Server Configuration

#### Apache
- Ensure `mod_rewrite` is enabled
- The `.htaccess` file will handle URL rewriting automatically

#### Nginx
Add this configuration to your Nginx server block:

```nginx
location /backend {
    try_files $uri $uri/ /backend/index.php?$query_string;
}
```

### 3. PHP Requirements
- PHP 8.0 or higher
- PDO MySQL extension
- `mod_rewrite` enabled (Apache)

## 📡 API Endpoints

### Base URL
```
http://yourdomain.com/backend/api/
```

### Public Endpoints

#### 1. Get All Published Blogs
```
GET /api/blogs
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 10, max: 100)
- `category` (optional): Filter by category slug
- `featured` (optional): Filter featured blogs (true/false)

**Example:**
```javascript
fetch('http://yourdomain.com/backend/api/blogs?page=1&per_page=10&featured=true')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response:**
```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Blog Title",
      "slug": "blog-slug",
      "content": "Blog content...",
      "excerpt": "Blog excerpt...",
      "image_url": "https://...",
      "is_featured": true,
      "views_count": 100,
      "published_at": "2026-01-15 10:00:00",
      "category_name": "Investment",
      "category_slug": "investment",
      "category_icon": "📈"
    }
  ],
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

#### 2. Get Single Blog by Slug
```
GET /api/blogs/{slug}
```

**Example:**
```javascript
fetch('http://yourdomain.com/backend/api/blogs/is-2026-right-time-invest-indian-real-estate')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response:**
```json
{
  "success": true,
  "message": "Blog retrieved successfully",
  "data": {
    "id": 1,
    "title": "Blog Title",
    "slug": "blog-slug",
    "content": "Full blog content...",
    "excerpt": "Blog excerpt...",
    "image_url": "https://...",
    "is_featured": true,
    "views_count": 101,
    "published_at": "2026-01-15 10:00:00",
    "category_name": "Investment",
    "category_slug": "investment",
    "category_icon": "📈"
  }
}
```

**Note:** This endpoint automatically increments the blog's view count.

#### 3. Get Active Categories
```
GET /api/categories
```

**Example:**
```javascript
fetch('http://yourdomain.com/backend/api/categories')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Buy",
      "slug": "buy",
      "icon": "🏠",
      "description": "Complete guides for property buyers",
      "display_order": 1,
      "is_active": true
    }
  ]
}
```

#### 4. Submit Contact Form
```
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "message": "Your message here"
}
```

**Example:**
```javascript
fetch('http://yourdomain.com/backend/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '1234567890',
    message: 'Your message here'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "message": "Your message here",
    "status": "new",
    "created_at": "2026-01-15 10:00:00"
  }
}
```

### Admin Endpoints

#### 1. Get All Blogs (Admin)
```
GET /api/admin/blogs
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 20, max: 100)

#### 2. Create Blog (Admin)
```
POST /api/admin/blogs
```

**Request Body:**
```json
{
  "title": "Blog Title",
  "slug": "blog-slug",
  "content": "Full blog content...",
  "excerpt": "Blog excerpt...",
  "category_id": 1,
  "image_url": "https://...",
  "featured_image": "https://...",
  "is_featured": true,
  "is_published": true,
  "meta_title": "SEO Title",
  "meta_description": "SEO Description",
  "meta_keywords": "keyword1, keyword2"
}
```

#### 3. Update Blog (Admin)
```
PUT /api/admin/blogs/{id}
```

**Request Body:** (same as create, all fields optional)

#### 4. Delete Blog (Admin)
```
DELETE /api/admin/blogs/{id}
```

#### 5. Get All Categories (Admin)
```
GET /api/admin/categories
```

#### 6. Create Category (Admin)
```
POST /api/admin/categories
```

**Request Body:**
```json
{
  "name": "Category Name",
  "slug": "category-slug",
  "icon": "🏠",
  "description": "Category description",
  "display_order": 1,
  "is_active": true
}
```

#### 7. Update Category (Admin)
```
PUT /api/admin/categories/{id}
```

#### 8. Delete Category (Admin)
```
DELETE /api/admin/categories/{id}
```

#### 9. Get Contact Messages (Admin)
```
GET /api/admin/contact-messages
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 20, max: 100)

## 🔌 Frontend Integration

### Using Fetch API

```javascript
// Base URL configuration
const API_BASE_URL = 'http://yourdomain.com/backend/api';

// Get all blogs
async function getBlogs(page = 1, perPage = 10, category = null, featured = null) {
  const params = new URLSearchParams({
    page,
    per_page: perPage
  });
  
  if (category) params.append('category', category);
  if (featured !== null) params.append('featured', featured);
  
  const response = await fetch(`${API_BASE_URL}/blogs?${params}`);
  return await response.json();
}

// Get single blog
async function getBlog(slug) {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
  return await response.json();
}

// Get categories
async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return await response.json();
}

// Submit contact form
async function submitContact(data) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://yourdomain.com/backend/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all blogs
export const getBlogs = (params = {}) => {
  return api.get('/blogs', { params });
};

// Get single blog
export const getBlog = (slug) => {
  return api.get(`/blogs/${slug}`);
};

// Get categories
export const getCategories = () => {
  return api.get('/categories');
};

// Submit contact form
export const submitContact = (data) => {
  return api.post('/contact', data);
};
```

### Error Handling

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": "Field-specific error message"
  }
}
```

**Example Error Handling:**
```javascript
try {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  const data = await response.json();
  
  if (!data.success) {
    console.error('API Error:', data.message);
    if (data.errors) {
      console.error('Validation Errors:', data.errors);
    }
    return;
  }
  
  // Use data.data
  console.log('Blogs:', data.data);
} catch (error) {
  console.error('Network Error:', error);
}
```

## 🔒 Security Notes

1. **Database Credentials**: Never commit `.env` file to version control
2. **CORS**: Update `config/cors.php` with your production frontend domain
3. **Input Validation**: All inputs are validated and sanitized
4. **SQL Injection**: Protected using PDO prepared statements
5. **XSS Protection**: All outputs are sanitized

## 🐛 Troubleshooting

### CORS Issues
- Update `config/cors.php` with your frontend domain
- Ensure CORS headers are set correctly

### 404 Errors
- Check `.htaccess` is working (Apache)
- Verify `mod_rewrite` is enabled
- Check base path in `index.php`

### Database Connection Errors
- Verify database credentials in `.env` or `config/database.php`
- Ensure MySQL service is running
- Check database name exists

### 500 Internal Server Errors
- Check PHP error logs
- Verify database tables exist
- Ensure stored procedures are created

## 📝 Notes

- All timestamps are handled automatically by the database
- Slug uniqueness is enforced
- Views count increments automatically when viewing a blog
- Pagination is available for list endpoints
- All responses are in JSON format
