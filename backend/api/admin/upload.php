<?php
/**
 * Admin Upload API Endpoints
 * 
 * POST /api/admin/upload - Upload image file
 * DELETE /api/admin/upload/{filename} - Delete image file
 */

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../controllers/UploadController.php';

$controller = new UploadController();
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

// Remove leading slash
$path = ltrim($path, '/');

// Route: POST /api/admin/upload
if ($method === 'POST' && empty($path)) {
    $controller->uploadImage();
}

// Route: DELETE /api/admin/upload/{filename}
elseif ($method === 'DELETE' && !empty($path)) {
    $filename = $path;
    $controller->deleteImage($filename);
}

// Method not allowed
else {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
