<?php
/**
 * Health Check Endpoint
 * 
 * GET /api/health - Check backend and database health
 * 
 * Returns:
 * - Database connection status
 * - API status
 * - Basic system info
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json');

$health = [
    'status' => 'ok',
    'timestamp' => date('Y-m-d H:i:s'),
    'services' => []
];

// Check database connection
try {
    $pdo = getDBConnection();
    $health['services']['database'] = [
        'status' => 'connected',
        'host' => DB_HOST,
        'database' => DB_NAME,
        'version' => $pdo->getAttribute(PDO::ATTR_SERVER_VERSION)
    ];
} catch (Exception $e) {
    $health['status'] = 'error';
    $health['services']['database'] = [
        'status' => 'disconnected',
        'error' => $e->getMessage()
    ];
    http_response_code(503);
}

// Check API
$health['services']['api'] = [
    'status' => 'operational',
    'version' => '1.0'
];

// Check uploads directory
$uploadsDir = __DIR__ . '/../../uploads';
$health['services']['uploads'] = [
    'status' => file_exists($uploadsDir) && is_writable($uploadsDir) ? 'ready' : 'not_ready',
    'writable' => file_exists($uploadsDir) ? is_writable($uploadsDir) : false
];

echo json_encode($health, JSON_PRETTY_PRINT);