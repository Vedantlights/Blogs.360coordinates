<?php
/**
 * Authentication Helper
 * 
 * Provides functions to check if user is authenticated
 */

/**
 * Check if admin is logged in
 * 
 * @return bool
 */
function isAdminLoggedIn() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

/**
 * Require admin authentication
 * Redirects to login or returns error if not authenticated
 * 
 * @param bool $returnJson If true, returns JSON error instead of redirecting
 * @return bool True if authenticated, false otherwise
 */
function requireAdminAuth($returnJson = true) {
    if (!isAdminLoggedIn()) {
        if ($returnJson) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Authentication required',
                'authenticated' => false
            ]);
            exit();
        } else {
            header('Location: /admin/login');
            exit();
        }
    }
    
    return true;
}

/**
 * Get current admin user ID
 * 
 * @return int|null
 */
function getAdminUserId() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    return $_SESSION['admin_user_id'] ?? null;
}

/**
 * Get current admin username
 * 
 * @return string|null
 */
function getAdminUsername() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    return $_SESSION['admin_username'] ?? null;
}
