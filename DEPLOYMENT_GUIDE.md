# Deployment Guide - React Router Fix for hPanel

## Problem
When deploying a React app with React Router (BrowserRouter) to hPanel, direct URL access (like `/admin`) fails with 404 errors. This happens because the server tries to find a file at that path instead of serving your React app.

## Solution

### Step 1: Add `.htaccess` file

I've created an `.htaccess` file in your `frontend/public/` folder. This file will automatically be copied to your `build/` folder when you run `npm run build`.

**File Location:** `frontend/public/.htaccess`

### Step 2: Build your React app

```bash
cd frontend
npm run build
```

This creates a `build/` folder with all your production files, including the `.htaccess` file.

### Step 3: Deploy to hPanel

1. **Via File Manager:**
   - Log into hPanel
   - Navigate to File Manager
   - Go to `public_html` (or your domain's root directory)
   - Upload all contents of the `build/` folder
   - Make sure the `.htaccess` file is uploaded (it may be hidden, enable "Show Hidden Files" in File Manager)

2. **Via FTP:**
   - Connect to your hPanel FTP
   - Navigate to `public_html`
   - Upload all contents of the `build/` folder
   - Ensure `.htaccess` is uploaded (enable "Show hidden files" in your FTP client)

### Step 4: Verify `.htaccess` is working

1. Make sure `.htaccess` is in your domain root (same location as `index.html`)
2. Check file permissions (should be 644)
3. Test direct URL access: `https://blogs.indiapropertys.com/admin`

## Alternative Solutions

### If `.htaccess` doesn't work:

#### Option 1: Create `web.config` (for IIS/Windows hosting)
If hPanel uses Windows/IIS instead of Apache, create `web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

#### Option 2: Contact hPanel Support
If neither `.htaccess` nor `web.config` works, contact hPanel support and ask them to:
- Enable `mod_rewrite` module (for Apache)
- Configure the server to redirect all requests to `index.html` for your React app

#### Option 3: Use HashRouter (temporary fix)
If you can't fix the server configuration, you can temporarily switch to HashRouter:

**In `frontend/src/App.jsx`:**
```jsx
// Change from:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// To:
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
```

**Note:** This will make URLs look like `https://blogs.indiapropertys.com/#/admin` instead of `https://blogs.indiapropertys.com/admin`. This is a workaround, not the ideal solution.

## Verification Checklist

- [ ] `.htaccess` file is in `frontend/public/` folder
- [ ] Built the app with `npm run build`
- [ ] `.htaccess` is uploaded to server root (same as `index.html`)
- [ ] File permissions are correct (644)
- [ ] Direct URL access works: `https://blogs.indiapropertys.com/admin`
- [ ] All routes work on refresh

## Troubleshooting

### Issue: Still getting 404 errors
**Solution:** 
- Verify `.htaccess` is in the root directory
- Check if `mod_rewrite` is enabled (contact hPanel support)
- Try clearing browser cache

### Issue: `.htaccess` file not uploading
**Solution:**
- Enable "Show Hidden Files" in File Manager/FTP client
- Ensure file name starts with a dot (`.htaccess`)
- Upload manually if automatic upload fails

### Issue: Server returns 500 error
**Solution:**
- Check `.htaccess` syntax for errors
- Verify `mod_rewrite` is enabled
- Check server error logs in hPanel

## Testing Your Deployment

After deploying, test these URLs:
1. `https://blogs.indiapropertys.com/` - Should work
2. `https://blogs.indiapropertys.com/admin` - Should work (direct access)
3. `https://blogs.indiapropertys.com/blog` - Should work
4. `https://blogs.indiapropertys.com/about` - Should work
5. Refresh any page - Should still work

All routes should work both when navigating internally and when accessing directly.
