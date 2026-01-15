<?php
/**
 * Backend Entry Point
 * 
 * Routes API requests to appropriate endpoints
 */

// Enable error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Get the request URI and parse it
$requestUri = $_SERVER['REQUEST_URI'];
$scriptName = $_SERVER['SCRIPT_NAME'];

// Remove query string
$requestUri = strtok($requestUri, '?');

// Remove base path if running in subdirectory
$basePath = dirname($scriptName);
if ($basePath !== '/') {
    $requestUri = substr($requestUri, strlen($basePath));
}

// Remove leading/trailing slashes
$requestUri = trim($requestUri, '/');

// Parse the route
$segments = explode('/', $requestUri);

// Route to appropriate API endpoint
if (count($segments) >= 2 && $segments[0] === 'api') {
    $endpoint = $segments[1];
    
    // Route to public endpoints
    if ($endpoint === 'blogs') {
        // Extract slug or ID from remaining segments
        $slug = isset($segments[2]) ? $segments[2] : '';
        $_SERVER['PATH_INFO'] = $slug ? '/' . $slug : '';
        require_once __DIR__ . '/api/blogs.php';
        exit();
    }
    
    if ($endpoint === 'categories') {
        $_SERVER['PATH_INFO'] = '';
        require_once __DIR__ . '/api/categories.php';
        exit();
    }
    
    if ($endpoint === 'contact') {
        $_SERVER['PATH_INFO'] = '';
        require_once __DIR__ . '/api/contact.php';
        exit();
    }
    
    // Route to admin endpoints
    if ($endpoint === 'admin' && isset($segments[2])) {
        $adminEndpoint = $segments[2];
        $adminId = isset($segments[3]) ? $segments[3] : '';
        
        // Set PATH_INFO for admin API files
        $_SERVER['PATH_INFO'] = $adminId ? '/' . $adminId : '';
        
        if ($adminEndpoint === 'blogs') {
            require_once __DIR__ . '/api/admin/blogs.php';
            exit();
        }
        
        if ($adminEndpoint === 'categories') {
            require_once __DIR__ . '/api/admin/categories.php';
            exit();
        }
        
        if ($adminEndpoint === 'contact-messages') {
            $_SERVER['PATH_INFO'] = ''; // contact-messages doesn't use PATH_INFO
            require_once __DIR__ . '/api/admin/contacts.php';
            exit();
        }
        
        if ($adminEndpoint === 'upload') {
            $_SERVER['PATH_INFO'] = $adminId ? '/' . $adminId : '';
            require_once __DIR__ . '/api/admin/upload.php';
            exit();
        }
    }
}

// 404 Not Found
http_response_code(404);
header('Content-Type: application/json');
echo json_encode([
    'success' => false,
    'message' => 'API endpoint not found'
]);
