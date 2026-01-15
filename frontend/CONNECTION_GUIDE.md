# Frontend-Backend Connection Guide

The frontend has been successfully connected to the PHP backend using axios.

## ✅ What's Been Done

### 1. **API Service Setup**
- ✅ Installed `axios` package
- ✅ Created `src/config/api.js` - API configuration
- ✅ Created `src/services/api.js` - Centralized API service with all endpoints

### 2. **Components Updated**
- ✅ **Blog.jsx** - Fetches featured and latest blogs from API
- ✅ **Post.jsx** - Fetches single blog by slug from API
- ✅ **ContactForm.jsx** - Submits contact form to API
- ✅ **Admin.jsx** - Full CRUD operations for blogs (Create, Read, Update, Delete)
- ✅ **Categories.jsx** - Fetches categories from API
- ✅ **Buy.jsx** - Fetches blogs by category from API

### 3. **Routing Updated**
- ✅ Added slug-based routing: `/post/:slug` for individual blog posts

## 🔧 Configuration

### Step 1: Update API Base URL

Edit `frontend/src/config/api.js`:

```javascript
// For local development (adjust port/path as needed)
export const API_BASE_URL = 'http://localhost/backend/api';

// OR if using environment variable
// Create .env file in frontend/ directory:
// REACT_APP_API_URL=http://localhost/backend/api
```

**Common configurations:**

- **XAMPP/WAMP (Windows):** `http://localhost/backend/api`
- **MAMP (Mac):** `http://localhost:8888/backend/api`
- **Laravel Valet:** `http://blogwebsite.test/backend/api`
- **Custom port:** `http://localhost:8080/backend/api`

### Step 2: Configure Backend Database

1. Create `.env` file in `backend/` directory:
```env
DB_HOST=localhost
DB_NAME=blog_website
DB_USER=root
DB_PASS=your_password
DB_CHARSET=utf8mb4
```

2. Or edit `backend/config/database.php` directly

### Step 3: Update CORS Settings

Edit `backend/config/cors.php` to allow your frontend domain:

```php
$allowedOrigins = [
    'http://localhost:3000',  // React default
    'http://localhost:5173',  // Vite default
    // Add your production URL
];
```

## 🚀 Testing the Connection

### 1. Start Backend Server
- Ensure PHP server is running
- Backend should be accessible at: `http://localhost/backend/api`

### 2. Start Frontend
```bash
cd frontend
npm start
```

### 3. Test Endpoints

Open browser console and test:

```javascript
// Test API connection
import { blogAPI } from './services/api';

// Get all blogs
blogAPI.getAll().then(console.log);

// Get single blog
blogAPI.getBySlug('is-2026-right-time-invest-indian-real-estate').then(console.log);

// Get categories
import { categoryAPI } from './services/api';
categoryAPI.getAll().then(console.log);
```

## 📡 API Endpoints Used

### Public Endpoints
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/{slug}` - Get single blog by slug
- `GET /api/categories` - Get active categories
- `POST /api/contact` - Submit contact form

### Admin Endpoints
- `GET /api/admin/blogs` - Get all blogs (admin)
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/{id}` - Update blog
- `DELETE /api/admin/blogs/{id}` - Delete blog

## 🐛 Troubleshooting

### CORS Errors
**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
1. Check `backend/config/cors.php` includes your frontend URL
2. Ensure backend is sending CORS headers
3. Check browser console for specific error

### 404 Not Found
**Error:** `GET http://localhost/backend/api/blogs 404`

**Solution:**
1. Verify backend URL in `frontend/src/config/api.js`
2. Check `.htaccess` is working (Apache)
3. Verify `backend/index.php` routing is correct
4. Test backend directly: `http://localhost/backend/api/blogs`

### Network Error
**Error:** `Network Error` or `Failed to fetch`

**Solution:**
1. Ensure backend server is running
2. Check backend URL is correct
3. Verify no firewall blocking requests
4. Check backend error logs

### Database Connection Error
**Error:** Backend returns 500 error

**Solution:**
1. Check database credentials in `.env` or `config/database.php`
2. Verify database exists and tables are created
3. Check PHP error logs
4. Test database connection manually

## 📝 Next Steps

### Optional: Update Other Category Pages

You can update other category pages (Rent, Investment, Legal, Tips) similar to Buy.jsx:

```javascript
// Example for Rent.jsx
const response = await blogAPI.getAll({ category: 'rent', per_page: 20 })
```

### Optional: Add Loading States

All components now have basic loading states. You can enhance them with:
- Skeleton loaders
- Spinner components
- Better error messages

### Optional: Add Pagination

The API supports pagination. You can add pagination controls:

```javascript
const response = await blogAPI.getAll({ page: 1, per_page: 10 })
// response.pagination contains pagination info
```

## ✅ Verification Checklist

- [ ] Backend server is running
- [ ] Database is configured and accessible
- [ ] API base URL is correct in `frontend/src/config/api.js`
- [ ] CORS is configured for your frontend URL
- [ ] Frontend can fetch blogs from API
- [ ] Frontend can fetch categories from API
- [ ] Contact form submits successfully
- [ ] Admin panel can create/edit/delete blogs
- [ ] Blog posts display correctly with slug routing

## 🎉 Success!

If everything is configured correctly, you should see:
- Blogs loading from the database
- Categories fetched dynamically
- Contact form submitting to backend
- Admin panel managing blogs through API

For more details, see:
- `backend/README.md` - Backend documentation
- `backend/FRONTEND_INTEGRATION.md` - Integration examples
- `backend/API_QUICK_REFERENCE.md` - API reference
