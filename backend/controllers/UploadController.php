<?php
/**
 * Upload Controller
 * 
 * Handles file upload operations
 */

require_once __DIR__ . '/../helpers/Response.php';

class UploadController {
    private $uploadDir;
    private $allowedTypes;
    private $maxFileSize; // 5MB in bytes
    
    public function __construct() {
        $this->uploadDir = __DIR__ . '/../uploads/images/';
        $this->allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        $this->maxFileSize = 5 * 1024 * 1024; // 5MB
        
        // Ensure upload directory exists
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }
    
    /**
     * Upload image file
     * POST /api/admin/upload
     */
    public function uploadImage() {
        try {
            // Check if file was uploaded
            if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
                $errorMsg = $this->getUploadError($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE);
                Response::error($errorMsg, 400);
            }
            
            $file = $_FILES['image'];
            
            // Validate file type
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);
            
            if (!in_array($mimeType, $this->allowedTypes)) {
                Response::error('Invalid file type. Allowed types: JPG, PNG, GIF, WEBP', 400);
            }
            
            // Validate file size
            if ($file['size'] > $this->maxFileSize) {
                Response::error('File size exceeds maximum allowed size of 5MB', 400);
            }
            
            // Validate file extension
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            
            if (!in_array($extension, $allowedExtensions)) {
                Response::error('Invalid file extension', 400);
            }
            
            // Generate unique filename
            $filename = $this->generateFilename($extension);
            $filepath = $this->uploadDir . $filename;
            
            // Move uploaded file
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                Response::error('Failed to save uploaded file', 500);
            }
            
            // Generate URL (relative to backend root)
            // Adjust this based on your server setup
            $basePath = dirname(dirname($_SERVER['SCRIPT_NAME']));
            if ($basePath === '/') {
                $url = '/backend/uploads/images/' . $filename;
            } else {
                $url = $basePath . '/uploads/images/' . $filename;
            }
            
            // Return success with file info
            Response::success([
                'filename' => $filename,
                'url' => $url,
                'size' => $file['size'],
                'type' => $mimeType
            ], 'Image uploaded successfully', 201);
            
        } catch (Exception $e) {
            error_log("UploadController::uploadImage Error: " . $e->getMessage());
            Response::error('Failed to upload image', 500);
        }
    }
    
    /**
     * Delete uploaded image
     * DELETE /api/admin/upload/{filename}
     */
    public function deleteImage($filename) {
        try {
            if (empty($filename)) {
                Response::error('Filename is required', 400);
            }
            
            // Security: prevent directory traversal
            $filename = basename($filename);
            
            $filepath = $this->uploadDir . $filename;
            
            if (!file_exists($filepath)) {
                Response::error('File not found', 404);
            }
            
            // Check if file is in uploads directory (security)
            $realPath = realpath($filepath);
            $realUploadDir = realpath($this->uploadDir);
            
            if (strpos($realPath, $realUploadDir) !== 0) {
                Response::error('Invalid file path', 403);
            }
            
            if (!unlink($filepath)) {
                Response::error('Failed to delete file', 500);
            }
            
            Response::success(null, 'Image deleted successfully');
            
        } catch (Exception $e) {
            error_log("UploadController::deleteImage Error: " . $e->getMessage());
            Response::error('Failed to delete image', 500);
        }
    }
    
    /**
     * Generate unique filename
     * 
     * @param string $extension File extension
     * @return string Unique filename
     */
    private function generateFilename($extension) {
        return date('Ymd_His') . '_' . uniqid() . '.' . $extension;
    }
    
    /**
     * Get upload error message
     * 
     * @param int $errorCode PHP upload error code
     * @return string Error message
     */
    private function getUploadError($errorCode) {
        switch ($errorCode) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return 'File size exceeds maximum allowed size';
            case UPLOAD_ERR_PARTIAL:
                return 'File was only partially uploaded';
            case UPLOAD_ERR_NO_FILE:
                return 'No file was uploaded';
            case UPLOAD_ERR_NO_TMP_DIR:
                return 'Missing temporary folder';
            case UPLOAD_ERR_CANT_WRITE:
                return 'Failed to write file to disk';
            case UPLOAD_ERR_EXTENSION:
                return 'File upload stopped by extension';
            default:
                return 'Unknown upload error';
        }
    }
}
