<?php
/**
 * Database Configuration
 * 
 * Loads database credentials from environment variables or uses defaults.
 * Create a .env file in the backend root directory with:
 * DB_HOST=localhost
 * DB_NAME=your_database_name
 * DB_USER=your_username
 * DB_PASS=your_password
 * DB_CHARSET=utf8mb4
 */

// Load environment variables from .env file if it exists
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }
        if (strpos($line, '=') === false) {
            continue;
        }
        list($name, $value) = explode('=', $line, 2);
        $value = trim($value);
        // Strip surrounding quotes if present
        if ((str_starts_with($value, '"') && str_ends_with($value, '"')) ||
            (str_starts_with($value, "'") && str_ends_with($value, "'"))) {
            $value = substr($value, 1, -1);
        }
        $_ENV[trim($name)] = $value;
    }
}

// Fallback: db_config.php (for hosts that block .env)
$dbConfigFile = __DIR__ . '/../db_config.php';
if (empty($_ENV['DB_PASS']) && file_exists($dbConfigFile)) {
    $dbConfig = require $dbConfigFile;
    $_ENV['DB_HOST'] = $_ENV['DB_HOST'] ?? $dbConfig['DB_HOST'] ?? 'localhost';
    $_ENV['DB_NAME'] = $_ENV['DB_NAME'] ?? $dbConfig['DB_NAME'] ?? 'u449667423_Blogsdata';
    $_ENV['DB_USER'] = $_ENV['DB_USER'] ?? $dbConfig['DB_USER'] ?? 'u449667423_blogsdata';
    $_ENV['DB_PASS'] = $dbConfig['DB_PASS'] ?? '';
    $_ENV['DB_CHARSET'] = $_ENV['DB_CHARSET'] ?? $dbConfig['DB_CHARSET'] ?? 'utf8mb4';
}

// Database configuration
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'u449667423_Blogsdata');
define('DB_USER', $_ENV['DB_USER'] ?? 'u449667423_blogsdata');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');
define('DB_CHARSET', $_ENV['DB_CHARSET'] ?? 'utf8mb4');

/**
 * Get PDO Database Connection
 * 
 * @return PDO
 * @throws PDOException
 */
function getDBConnection() {
    static $pdo = null;
    
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            $errorMsg = "Database Connection Error: " . $e->getMessage();
            error_log($errorMsg);
            error_log("DB_HOST: " . DB_HOST);
            error_log("DB_NAME: " . DB_NAME);
            error_log("DB_USER: " . DB_USER);
            throw new PDOException("Database connection failed: " . $e->getMessage(), 0, $e);
        }
    }
    
    return $pdo;
}
