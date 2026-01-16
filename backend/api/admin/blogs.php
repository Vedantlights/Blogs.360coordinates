<?php
/**
 * Admin Blog API Endpoints
 * 
 * GET /api/admin/blogs - Get all blogs
 * POST /api/admin/blogs - Create new blog
 * PUT /api/admin/blogs/{id} - Update blog
 * DELETE /api/admin/blogs/{id} - Delete blog
 */

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../controllers/BlogController.php';

// Require authentication for all admin endpoints
requireAdminAuth();

$controller = new BlogController();
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

// Remove leading slash
$path = ltrim($path, '/');

// Route: GET /api/admin/blogs
if ($method === 'GET' && empty($path)) {
    $controller->getAll();
}

// Route: POST /api/admin/blogs
elseif ($method === 'POST' && empty($path)) {
    $controller->create();
}

// Route: PUT /api/admin/blogs/{id}
elseif ($method === 'PUT' && !empty($path) && is_numeric($path)) {
    $id = (int)$path;
    $controller->update($id);
}

// Route: DELETE /api/admin/blogs/{id}
elseif ($method === 'DELETE' && !empty($path) && is_numeric($path)) {
    $id = (int)$path;
    $controller->delete($id);
}

// Not found
else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Endpoint not found'
    ]);
}
