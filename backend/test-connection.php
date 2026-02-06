<?php
/**
 * Database Connection Test Script
 * 
 * Use this script to test database connectivity after deployment
 * Access via: https://blogs.360coordinates.com/backend/test-connection.php
 * 
 * SECURITY: Delete this file after testing in production!
 */

header('Content-Type: application/json');

$results = [
    'timestamp' => date('Y-m-d H:i:s'),
    'status' => 'testing',
    'checks' => []
];

// Check 1: .env file exists
$envFile = __DIR__ . '/.env';
$results['checks']['env_file'] = [
    'exists' => file_exists($envFile),
    'path' => $envFile,
    'readable' => file_exists($envFile) ? is_readable($envFile) : false
];

// Check 2: Load database config
require_once __DIR__ . '/config/database.php';

$results['checks']['config_loaded'] = [
    'success' => true,
    'db_host' => defined('DB_HOST') ? DB_HOST : 'NOT_DEFINED',
    'db_name' => defined('DB_NAME') ? DB_NAME : 'NOT_DEFINED',
    'db_user' => defined('DB_USER') ? DB_USER : 'NOT_DEFINED',
    'db_pass' => defined('DB_PASS') ? (DB_PASS ? '***SET***' : 'EMPTY') : 'NOT_DEFINED',
];

// Check 3: Test database connection
try {
    $pdo = getDBConnection();
    $results['checks']['database_connection'] = [
        'success' => true,
        'message' => 'Database connected successfully',
        'server_info' => $pdo->getAttribute(PDO::ATTR_SERVER_INFO),
        'server_version' => $pdo->getAttribute(PDO::ATTR_SERVER_VERSION)
    ];
    
    // Check 4: Test query
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM blogs");
    $blogCount = $stmt->fetch(PDO::FETCH_ASSOC);
    $results['checks']['database_query'] = [
        'success' => true,
        'message' => 'Query executed successfully',
        'blog_count' => $blogCount['count'] ?? 0
    ];
    
    // Check 5: Test categories table
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM categories");
    $categoryCount = $stmt->fetch(PDO::FETCH_ASSOC);
    $results['checks']['categories_table'] = [
        'success' => true,
        'category_count' => $categoryCount['count'] ?? 0
    ];
    
    $results['status'] = 'success';
    $results['message'] = 'All checks passed! Database is accessible.';
    
} catch (PDOException $e) {
    $results['checks']['database_connection'] = [
        'success' => false,
        'error' => $e->getMessage(),
        'code' => $e->getCode()
    ];
    
    $results['status'] = 'error';
    $results['message'] = 'Database connection failed: ' . $e->getMessage();
    http_response_code(500);
}

// Check 6: PHP version
$results['checks']['php_version'] = [
    'version' => PHP_VERSION,
    'meets_requirements' => version_compare(PHP_VERSION, '7.4.0', '>=')
];

// Check 7: Required PHP extensions
$requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];
$results['checks']['php_extensions'] = [];
foreach ($requiredExtensions as $ext) {
    $results['checks']['php_extensions'][$ext] = extension_loaded($ext);
}

// Check 8: File permissions
$uploadsDir = __DIR__ . '/uploads';
$results['checks']['uploads_directory'] = [
    'exists' => file_exists($uploadsDir),
    'writable' => file_exists($uploadsDir) ? is_writable($uploadsDir) : false,
    'path' => $uploadsDir
];

echo json_encode($results, JSON_PRETTY_PRINT);