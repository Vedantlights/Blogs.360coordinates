<?php
/**
 * Admin Contact Messages API Endpoints
 * 
 * GET /api/admin/contact-messages - Get all contact messages
 */

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../controllers/ContactController.php';

$controller = new ContactController();
$method = $_SERVER['REQUEST_METHOD'];

// Route: GET /api/admin/contact-messages
if ($method === 'GET') {
    $controller->getAll();
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
