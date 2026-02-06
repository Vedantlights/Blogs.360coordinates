# API Quick Reference

Quick reference card for all available API endpoints.

## 🌐 Base URL
```
https://blogs.360coordinates.com/backend/api
```

## 📚 Public Endpoints

### Blogs

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/blogs` | Get all published blogs | `page`, `per_page`, `category`, `featured` |
| GET | `/blogs/{slug}` | Get single blog by slug | - |

**Example:**
```bash
GET /api/blogs?page=1&per_page=10&featured=true
GET /api/blogs/is-2026-right-time-invest-indian-real-estate
```

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all active categories |

**Example:**
```bash
GET /api/categories
```

### Contact

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/contact` | Submit contact form | `name`, `email`, `mobile`, `message` |

**Example:**
```bash
POST /api/contact
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "message": "Your message"
}
```

## 🔐 Admin Endpoints

### Blogs (Admin)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/admin/blogs` | Get all blogs | Query: `page`, `per_page` |
| POST | `/admin/blogs` | Create blog | See below |
| PUT | `/admin/blogs/{id}` | Update blog | See below |
| DELETE | `/admin/blogs/{id}` | Delete blog | - |

**Create/Update Blog Body:**
```json
{
  "title": "Blog Title",
  "slug": "blog-slug",
  "content": "Full content...",
  "excerpt": "Excerpt...",
  "category_id": 1,
  "image_url": "https://...",
  "featured_image": "https://...",
  "is_featured": true,
  "is_published": true,
  "meta_title": "SEO Title",
  "meta_description": "SEO Description",
  "meta_keywords": "keywords"
}
```

### Categories (Admin)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/admin/categories` | Get all categories | - |
| POST | `/admin/categories` | Create category | See below |
| PUT | `/admin/categories/{id}` | Update category | See below |
| DELETE | `/admin/categories/{id}` | Delete category | - |

**Create/Update Category Body:**
```json
{
  "name": "Category Name",
  "slug": "category-slug",
  "icon": "🏠",
  "description": "Description",
  "display_order": 1,
  "is_active": true
}
```

### Contact Messages (Admin)

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/admin/contact-messages` | Get all messages | `page`, `per_page` |

## 📋 Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict (e.g., duplicate slug) |
| 500 | Internal Server Error |

## ✅ Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": "Field error"
  }
}
```

**Paginated:**
```json
{
  "success": true,
  "message": "Success",
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

## 🔍 Common Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10/20 | Items per page |
| `category` | string | - | Filter by category slug |
| `featured` | boolean | - | Filter featured items |

## 🚀 Quick Test Commands

### Using cURL

```bash
# Get all blogs
curl http://localhost/backend/api/blogs

# Get single blog
curl http://localhost/backend/api/blogs/blog-slug

# Get categories
curl http://localhost/backend/api/categories

# Submit contact form
curl -X POST http://localhost/backend/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'
```

### Using JavaScript Fetch

```javascript
// Get blogs
fetch('http://localhost/backend/api/blogs')
  .then(res => res.json())
  .then(data => console.log(data));

// Submit contact
fetch('http://localhost/backend/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    message: 'Hello'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```
