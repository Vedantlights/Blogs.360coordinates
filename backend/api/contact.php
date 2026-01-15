<?php
/**
 * Contact API Endpoints (Public)
 * 
 * POST /api/contact - Create new contact message
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../controllers/ContactController.php';

$controller = new ContactController();
$method = $_SERVER['REQUEST_METHOD'];

// Route: POST /api/contact
if ($method === 'POST') {
    $controller->create();
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
