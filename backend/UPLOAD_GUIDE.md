# Image Upload Guide

Complete guide for the image upload functionality.

## 📁 Storage Location

Images are stored in: `backend/uploads/images/`

## 🔧 Configuration

### Upload Settings

Edit `backend/controllers/UploadController.php` to customize:

```php
private $maxFileSize = 5 * 1024 * 1024; // 5MB (change as needed)
private $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
```

### Directory Permissions

Ensure the uploads directory is writable:

```bash
# Linux/Mac
chmod 755 backend/uploads/images

# Windows
# Right-click folder > Properties > Security > Allow write permissions
```

## 📡 API Endpoints

### Upload Image

**POST** `/api/admin/upload`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with field `image`

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "filename": "20260115_164830_abc123.jpg",
    "url": "/backend/uploads/images/20260115_164830_abc123.jpg",
    "size": 245678,
    "type": "image/jpeg"
  }
}
```

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('image', file);

const response = await fetch('http://localhost/backend/api/admin/upload', {
  method: 'POST',
  body: formData
});
```

### Delete Image

**DELETE** `/api/admin/upload/{filename}`

**Example:**
```javascript
await fetch('http://localhost/backend/api/admin/upload/filename.jpg', {
  method: 'DELETE'
});
```

## 🎨 Frontend Usage

### Using the Admin Panel

1. Go to Admin Panel (`/admin`)
2. Click "Choose File" for Image or Featured Image
3. Select an image file
4. Image uploads automatically
5. Preview appears immediately
6. URL is automatically filled in the form

### Programmatic Upload

```javascript
import { adminAPI } from '../services/api';

// Upload image
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

try {
  const response = await adminAPI.upload.image(file);
  if (response.success) {
    console.log('Image URL:', response.data.url);
    // Use response.data.url in your blog form
  }
} catch (error) {
  console.error('Upload failed:', error);
}
```

## 🔒 Security Features

1. **File Type Validation**
   - MIME type checking
   - Extension validation
   - Only images allowed

2. **File Size Limit**
   - Maximum 5MB per file
   - Configurable in controller

3. **Secure Filenames**
   - Auto-generated unique names
   - Prevents directory traversal
   - No user input in filename

4. **Directory Protection**
   - PHP execution blocked
   - Only images accessible
   - Directory listing disabled

## 🐛 Troubleshooting

### Upload Fails with 500 Error

**Check:**
1. Directory permissions (must be writable)
2. PHP `upload_max_filesize` in `php.ini`
3. PHP `post_max_size` in `php.ini`
4. Server error logs

### Images Not Displaying

**Check:**
1. File path is correct
2. `.htaccess` allows image access
3. Web server can serve files from uploads directory
4. CORS settings (if accessing from different domain)

### File Size Too Large

**Solutions:**
1. Increase `upload_max_filesize` in `php.ini`
2. Increase `post_max_size` in `php.ini`
3. Reduce image size before upload
4. Update `$maxFileSize` in `UploadController.php`

## 📝 Notes

- Images are stored permanently until manually deleted
- Consider implementing image cleanup for old/unused images
- For production, consider using CDN or cloud storage (S3, Cloudinary, etc.)
- Image optimization/resizing can be added if needed
