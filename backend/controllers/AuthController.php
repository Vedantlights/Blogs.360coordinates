<?php
/**
 * Authentication Controller
 * 
 * Handles admin login and authentication
 */

require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../models/AdminUser.php';

class AuthController {
    private $adminUser;
    
    public function __construct() {
        $this->adminUser = new AdminUser();
    }
    
    /**
     * Login endpoint
     * POST /api/auth/login
     */
    public function login() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                Response::error('Invalid JSON data', 400);
            }
            
            $username = trim($input['username'] ?? '');
            $password = trim($input['password'] ?? '');
            
            // Validate input
            if (empty($username) || empty($password)) {
                Response::error('Username and password are required', 400);
            }
            
            // Verify credentials
            $user = $this->adminUser->verifyCredentials($username, $password);
            
            if (!$user) {
                Response::error('Invalid username or password', 401);
            }
            
            // Start session
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            // Set session data
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            
            // Return success with user data (without password)
            Response::success([
                'user' => $user,
                'session_id' => session_id()
            ], 'Login successful');
            
        } catch (Exception $e) {
            error_log("AuthController::login Error: " . $e->getMessage());
            Response::error('Login failed', 500);
        }
    }
    
    /**
     * Logout endpoint
     * POST /api/auth/logout
     */
    public function logout() {
        try {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            // Destroy session
            $_SESSION = [];
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
            
            Response::success(null, 'Logout successful');
            
        } catch (Exception $e) {
            error_log("AuthController::logout Error: " . $e->getMessage());
            Response::error('Logout failed', 500);
        }
    }
    
    /**
     * Check authentication status
     * GET /api/auth/check
     */
    public function check() {
        try {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
                $user = $this->adminUser->getById($_SESSION['admin_user_id']);
                Response::success([
                    'authenticated' => true,
                    'user' => $user
                ], 'User is authenticated');
            } else {
                Response::success([
                    'authenticated' => false
                ], 'User is not authenticated');
            }
            
        } catch (Exception $e) {
            error_log("AuthController::check Error: " . $e->getMessage());
            Response::error('Authentication check failed', 500);
        }
    }
}
