<?php
/**
 * Admin Category API Endpoints
 * 
 * GET /api/admin/categories - Get all categories
 * POST /api/admin/categories - Create new category
 * PUT /api/admin/categories/{id} - Update category
 * DELETE /api/admin/categories/{id} - Delete category
 */

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/Auth.php';
require_once __DIR__ . '/../../controllers/CategoryController.php';

// Require authentication for all admin endpoints
requireAdminAuth();

$controller = new CategoryController();
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

// Remove leading slash
$path = ltrim($path, '/');

// Route: GET /api/admin/categories
if ($method === 'GET' && empty($path)) {
    $controller->getAll();
}

// Route: POST /api/admin/categories
elseif ($method === 'POST' && empty($path)) {
    $controller->create();
}

// Route: PUT /api/admin/categories/{id}
elseif ($method === 'PUT' && !empty($path) && is_numeric($path)) {
    $id = (int)$path;
    $controller->update($id);
}

// Route: DELETE /api/admin/categories/{id}
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
