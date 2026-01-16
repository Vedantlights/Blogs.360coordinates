<?php
/**
 * Admin User Model
 * 
 * Handles admin user data access
 */

require_once __DIR__ . '/../config/database.php';

class AdminUser {
    private $pdo;
    
    public function __construct() {
        $this->pdo = getDBConnection();
    }
    
    /**
     * Find user by username
     * 
     * @param string $username
     * @return array|null
     */
    public function findByUsername($username) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM admin_users WHERE username = :username LIMIT 1");
            $stmt->execute(['username' => $username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user ?: null;
        } catch (PDOException $e) {
            error_log("AdminUser::findByUsername Error: " . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Verify user credentials
     * 
     * @param string $username
     * @param string $password
     * @return array|null User data if valid, null otherwise
     */
    public function verifyCredentials($username, $password) {
        $user = $this->findByUsername($username);
        
        if (!$user) {
            return null;
        }
        
        // Compare passwords (plain text as requested)
        if ($user['password'] === $password) {
            // Remove password from returned data
            unset($user['password']);
            return $user;
        }
        
        return null;
    }
    
    /**
     * Get user by ID
     * 
     * @param int $id
     * @return array|null
     */
    public function getById($id) {
        try {
            $stmt = $this->pdo->prepare("SELECT id, username, created_at, updated_at FROM admin_users WHERE id = :id LIMIT 1");
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user ?: null;
        } catch (PDOException $e) {
            error_log("AdminUser::getById Error: " . $e->getMessage());
            return null;
        }
    }
}
