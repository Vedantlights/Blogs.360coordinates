# Uploads Directory

This directory stores uploaded images for the blog website.

## Structure

```
uploads/
├── images/          # Blog images stored here
└── .htaccess        # Security configuration
```

## Security

- PHP files are blocked from execution
- Only image files (jpg, jpeg, png, gif, webp, svg) are allowed
- Directory listing is disabled

## File Naming

Uploaded files are automatically renamed with:
- Timestamp: `YYYYMMDD_HHMMSS`
- Unique ID: `uniqid()`
- Original extension preserved

Example: `20260115_164830_abc123def456.jpg`

## Access

Uploaded images are accessible via:
```
http://yourdomain.com/backend/uploads/images/filename.jpg
```

## Notes

- Maximum file size: 5MB
- Allowed types: JPG, JPEG, PNG, GIF, WEBP
- Files are validated before upload
- Old files should be cleaned up periodically
