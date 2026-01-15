<?php
/**
 * Blog API Endpoints (Public)
 * 
 * GET /api/blogs - Get all published blogs
 * GET /api/blogs/{slug} - Get single blog by slug
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../controllers/BlogController.php';

$controller = new BlogController();
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

// Remove leading slash
$path = ltrim($path, '/');

// Route: GET /api/blogs
if ($method === 'GET' && empty($path)) {
    $controller->getPublishedBlogs();
}

// Route: GET /api/blogs/{slug}
elseif ($method === 'GET' && !empty($path)) {
    $slug = $path;
    $controller->getBySlug($slug);
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
