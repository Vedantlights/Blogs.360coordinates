# Hosting Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. Database Configuration

- [ ] Create `.env` file in `backend/` directory
- [ ] Add database credentials:
  ```
  DB_HOST=localhost
  DB_NAME=u449667423_Blogs
  DB_USER=u449667423_sneha
  DB_PASS=Blogs@2026
  DB_CHARSET=utf8mb4
  ```
- [ ] Verify `.env` file is NOT publicly accessible (check `.htaccess` protection)
- [ ] Test database connection using `test-connection.php`

### 2. Backend Setup

- [ ] Upload all backend files to server (usually in `/backend/` or `/public_html/backend/`)
- [ ] Verify `.htaccess` file is uploaded and working
- [ ] Check PHP version (requires PHP 7.4+)
- [ ] Verify required PHP extensions are installed:
  - PDO
  - PDO_MySQL
  - JSON
  - mbstring
- [ ] Set proper file permissions:
  - Directories: 755
  - PHP files: 644
  - `.env` file: 600 (if possible)

### 3. Frontend Configuration

- [ ] Build React app: `cd frontend && npm run build`
- [ ] Verify `frontend/src/config/api.js` has correct production URL
- [ ] Upload `build/` folder contents to web root
- [ ] Ensure `.htaccess` is in web root (for React Router)

### 4. CORS Configuration

- [ ] Verify `backend/config/cors.php` includes your domain:
  ```php
  'https://blogs.indiapropertys.com',
  'https://www.blogs.indiapropertys.com',
  ```
- [ ] Test CORS headers are being sent

### 5. File Permissions

- [ ] `backend/uploads/` directory is writable (755 or 777)
- [ ] `backend/uploads/images/` directory is writable
- [ ] Test image upload functionality

## 🔍 Testing After Deployment

### Test 1: Database Connection

Visit: `https://blogs.indiapropertys.com/backend/test-connection.php`

**Expected Result:**
```json
{
  "status": "success",
  "message": "All checks passed! Database is accessible.",
  "checks": {
    "database_connection": {
      "success": true
    }
  }
}
```

**If Error:**
- Check `.env` file exists and has correct credentials
- Verify database user has proper permissions
- Check database host (might need to use remote host instead of 'localhost')

### Test 2: Health Check Endpoint

Visit: `https://blogs.indiapropertys.com/backend/api/health`

**Expected Result:**
```json
{
  "status": "ok",
  "services": {
    "database": {
      "status": "connected"
    },
    "api": {
      "status": "operational"
    }
  }
}
```

### Test 3: API Endpoints

Test these URLs in browser:

- [ ] `https://blogs.indiapropertys.com/backend/api/blogs` - Should return JSON
- [ ] `https://blogs.indiapropertys.com/backend/api/categories` - Should return JSON
- [ ] `https://blogs.indiapropertys.com/backend/api/health` - Should return health status

### Test 4: Frontend Connection

1. Open browser console (F12)
2. Visit your website: `https://blogs.indiapropertys.com`
3. Check for errors:
   - No CORS errors
   - No connection refused errors
   - API calls are successful

### Test 5: Image Upload

- [ ] Log into admin panel
- [ ] Try uploading an image
- [ ] Verify image is saved in `backend/uploads/images/`
- [ ] Verify image is accessible via URL

## 🚨 Common Issues & Solutions

### Issue: Database Connection Failed

**Symptoms:**
- `test-connection.php` shows database error
- API endpoints return 500 error

**Solutions:**
1. **Check `.env` file exists:**
   - File must be named exactly `.env` (not `.env.txt`)
   - Must be in `backend/` directory

2. **Verify credentials:**
   - Database name: `u449667423_Blogs`
   - Username: `u449667423_sneha`
   - Password: `Blogs@2026`
   - Host: Usually `localhost` for shared hosting, but might be different

3. **Check database host:**
   - For shared hosting, might need: `DB_HOST=127.0.0.1`
   - Or remote host: `DB_HOST=your-db-host.com`

4. **Verify database exists:**
   - Log into phpMyAdmin or database manager
   - Confirm database `u449667423_Blogs` exists

5. **Check user permissions:**
   - Database user must have SELECT, INSERT, UPDATE, DELETE permissions
   - User must be allowed to connect from your server IP

### Issue: CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- API requests fail with CORS policy error

**Solutions:**
1. **Verify CORS config:**
   - Check `backend/config/cors.php` includes your domain
   - Ensure CORS is loaded in `index.php`

2. **Check `.htaccess`:**
   - Verify CORS headers are set in `backend/.htaccess`

3. **Test CORS headers:**
   ```bash
   curl -I https://blogs.indiapropertys.com/backend/api/blogs
   ```
   Should see: `Access-Control-Allow-Origin: https://blogs.indiapropertys.com`

### Issue: 404 Errors on API

**Symptoms:**
- API endpoints return 404
- `index.php` routing not working

**Solutions:**
1. **Check `.htaccess` exists:**
   - Must be in `backend/` directory
   - Verify RewriteEngine is On

2. **Check mod_rewrite:**
   - Contact hosting support to enable `mod_rewrite`
   - Or verify it's enabled in server config

3. **Verify file paths:**
   - Ensure all files are uploaded correctly
   - Check file permissions

### Issue: Frontend Can't Connect to Backend

**Symptoms:**
- `ERR_CONNECTION_REFUSED`
- `Failed to fetch`

**Solutions:**
1. **Check API URL:**
   - Verify `frontend/src/config/api.js` has correct production URL
   - Should be: `https://blogs.indiapropertys.com/backend/api`

2. **Test backend directly:**
   - Visit `https://blogs.indiapropertys.com/backend/api/blogs` in browser
   - Should return JSON, not 404

3. **Check backend path:**
   - Verify backend is accessible at `/backend/` path
   - Or update API URL if backend is at different path

## 📝 Post-Deployment

### Security Checklist

- [ ] Delete `test-connection.php` after testing (contains sensitive info)
- [ ] Verify `.env` file is not publicly accessible
- [ ] Check `.htaccess` protects sensitive files
- [ ] Ensure error display is off in production
- [ ] Verify file uploads directory has proper restrictions

### Monitoring

- [ ] Set up error logging
- [ ] Monitor API response times
- [ ] Check database connection pool
- [ ] Monitor file upload directory size

## 🔗 Quick Test URLs

After deployment, test these URLs:

1. **Database Test:** `https://blogs.indiapropertys.com/backend/test-connection.php`
2. **Health Check:** `https://blogs.indiapropertys.com/backend/api/health`
3. **Blogs API:** `https://blogs.indiapropertys.com/backend/api/blogs`
4. **Categories API:** `https://blogs.indiapropertys.com/backend/api/categories`
5. **Frontend:** `https://blogs.indiapropertys.com`

All should work without errors!

## 📞 Need Help?

If you encounter issues:

1. Check server error logs (usually in hPanel → Error Logs)
2. Check PHP error logs
3. Use `test-connection.php` to diagnose database issues
4. Check browser console for frontend errors
5. Verify all files are uploaded correctly