<?php
/**
 * Category API Endpoints (Public)
 * 
 * GET /api/categories - Get all active categories
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../controllers/CategoryController.php';

$controller = new CategoryController();
$method = $_SERVER['REQUEST_METHOD'];

// Route: GET /api/categories
if ($method === 'GET') {
    $controller->getActive();
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
