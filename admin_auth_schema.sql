-- =====================================================
-- Admin Authentication Table
-- =====================================================
-- Table for storing admin user credentials
-- Note: In production, passwords should be encrypted/hashed
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
);

-- =====================================================
-- INSERT DEFAULT ADMIN USER
-- =====================================================
-- Default credentials: username: admin, password: admin123
-- IMPORTANT: Change these credentials after first login!
-- =====================================================

INSERT INTO admin_users (username, password) VALUES
('admin', 'admin123')
ON DUPLICATE KEY UPDATE username=username;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Username must be unique
-- 2. Password is stored as plain text (as requested)
-- 3. You can add more admin users by inserting into this table
-- 4. Example to add another user:
--    INSERT INTO admin_users (username, password) VALUES ('newuser', 'password123');
-- =====================================================
