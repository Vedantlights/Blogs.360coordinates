<?php
/**
 * Authentication API Endpoints
 * 
 * POST /api/auth/login - Admin login
 * POST /api/auth/logout - Admin logout
 * GET /api/auth/check - Check authentication status
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../controllers/AuthController.php';

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$controller = new AuthController();
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

// Remove leading slash
$path = ltrim($path, '/');

// Route: POST /api/auth/login (path can be empty or 'login')
if ($method === 'POST' && (empty($path) || $path === 'login')) {
    $controller->login();
    exit();
}

// Route: POST /api/auth/logout
elseif ($method === 'POST' && $path === 'logout') {
    $controller->logout();
    exit();
}

// Route: GET /api/auth/check
elseif ($method === 'GET' && $path === 'check') {
    $controller->check();
    exit();
}

// Method not allowed
else {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Expected POST /api/auth/login, POST /api/auth/logout, or GET /api/auth/check'
    ]);
    exit();
}
