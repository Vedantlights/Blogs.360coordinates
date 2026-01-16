# Admin Authentication Setup Guide

## 📋 Overview

This guide explains how to set up secure admin authentication for your blog website. The system uses username/password login with session-based authentication.

## 🗄️ Database Setup

### Step 1: Create the Admin Users Table

Run the SQL query from `admin_auth_schema.sql` in your database:

```sql
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
);

-- Insert default admin user
INSERT INTO admin_users (username, password) VALUES
('admin', 'admin123')
ON DUPLICATE KEY UPDATE username=username;
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these default credentials after first login!

### Step 2: Add More Admin Users (Optional)

To add additional admin users, run:

```sql
INSERT INTO admin_users (username, password) VALUES 
('newuser', 'password123');
```

## 🔐 How It Works

### Backend Authentication

1. **Login Endpoint:** `POST /api/auth/login`
   - Validates username and password
   - Creates PHP session if credentials are valid
   - Returns user data (without password)

2. **Logout Endpoint:** `POST /api/auth/logout`
   - Destroys PHP session
   - Clears authentication

3. **Check Endpoint:** `GET /api/auth/check`
   - Checks if user is currently authenticated
   - Returns authentication status

### Protected Routes

All admin API endpoints are protected:
- `/api/admin/blogs` - Blog management
- `/api/admin/categories` - Category management
- `/api/admin/contact-messages` - Contact messages
- `/api/admin/upload` - Image uploads

If not authenticated, these endpoints return `401 Unauthorized`.

### Frontend Protection

1. **Login Page:** `/vedantlights/login`
   - Users must login before accessing admin panel
   - Redirects to `/vedantlights` after successful login

2. **Protected Route:** `/vedantlights`
   - Automatically redirects to login if not authenticated
   - Shows admin panel if authenticated

3. **Logout Button:**
   - Available in the admin panel header
   - Clears session and redirects to login

## 🚀 Usage

### Accessing Admin Panel

1. Navigate to: `https://yourdomain.com/vedantlights`
2. You'll be redirected to `/vedantlights/login`
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. Click "Login"
5. You'll be redirected to the admin panel

### Logging Out

1. Click the "Logout" button in the admin panel header
2. You'll be redirected to the login page

## 📁 Files Created

### Backend Files:
- `backend/models/AdminUser.php` - User model
- `backend/controllers/AuthController.php` - Authentication controller
- `backend/api/auth.php` - Auth API endpoints
- `backend/helpers/Auth.php` - Auth helper functions

### Frontend Files:
- `frontend/src/pages/Login.jsx` - Login page component
- `frontend/src/pages/Login.css` - Login page styles
- `frontend/src/components/ProtectedRoute.jsx` - Route protection component

### Database:
- `admin_auth_schema.sql` - SQL schema for admin users table

## 🔒 Security Notes

### Current Implementation:
- ✅ Session-based authentication
- ✅ Password stored as plain text (as requested)
- ✅ All admin endpoints protected
- ✅ Automatic logout on 401 errors
- ✅ Protected routes in frontend

### Recommendations for Production:
- ⚠️ **Use password hashing** (bcrypt, argon2) instead of plain text
- ⚠️ **Use HTTPS** for all authentication requests
- ⚠️ **Implement CSRF protection** for forms
- ⚠️ **Add rate limiting** for login attempts
- ⚠️ **Use secure session cookies** (HttpOnly, Secure flags)
- ⚠️ **Change default credentials** immediately

## 🐛 Troubleshooting

### Issue: "Authentication required" error

**Solution:**
1. Make sure you're logged in at `/admin/login`
2. Check browser console for errors
3. Verify session is working (check cookies)
4. Clear browser cache and try again

### Issue: Can't login

**Solution:**
1. Verify database table exists: `SELECT * FROM admin_users;`
2. Check default user exists: `SELECT * FROM admin_users WHERE username='admin';`
3. Verify password matches: Should be `admin123`
4. Check backend error logs

### Issue: Session expires too quickly

**Solution:**
- PHP sessions expire based on server configuration
- Default session lifetime is usually 24 minutes
- You can adjust `session.gc_maxlifetime` in `php.ini`

### Issue: 401 errors on admin endpoints

**Solution:**
1. Make sure you're logged in
2. Check if session is still valid: Visit `/api/auth/check`
3. Try logging out and logging back in
4. Clear browser cookies and try again

## 📝 API Endpoints Reference

### Login
```javascript
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { "success": true, "data": { "user": {...} } }
```

### Logout
```javascript
POST /api/auth/logout
Response: { "success": true, "message": "Logout successful" }
```

### Check Auth
```javascript
GET /api/auth/check
Response: { "success": true, "data": { "authenticated": true, "user": {...} } }
```

## ✅ Testing Checklist

- [ ] Database table created successfully
- [ ] Default admin user inserted
- [ ] Can access `/vedantlights/login` page
- [ ] Can login with default credentials
- [ ] Redirected to `/vedantlights` after login
- [ ] Admin panel loads correctly
- [ ] Can create/edit/delete blogs (requires auth)
- [ ] Logout button works
- [ ] Redirected to login after logout
- [ ] Cannot access `/vedantlights` without login
- [ ] Cannot access admin API endpoints without login

## 🎯 Next Steps

1. **Change Default Password:**
   ```sql
   UPDATE admin_users SET password = 'your_secure_password' WHERE username = 'admin';
   ```

2. **Add More Admin Users:**
   ```sql
   INSERT INTO admin_users (username, password) VALUES ('newadmin', 'securepass');
   ```

3. **Test Authentication:**
   - Try accessing `/vedantlights` without login
   - Login and verify access
   - Test logout functionality

4. **Optional Enhancements:**
   - Add password hashing
   - Implement "Remember Me" functionality
   - Add password reset feature
   - Add user management in admin panel
