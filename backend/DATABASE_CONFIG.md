# Database Configuration

## Current Database Settings

The database credentials are configured in `backend/.env`:

```
DB_HOST=localhost
DB_NAME=u449667423_Blogsdata
DB_USER=u449667423_blogsdata
DB_PASS=Shital@765
DB_CHARSET=utf8mb4
```

## How It Works

The `backend/config/database.php` file automatically loads these credentials from the `.env` file.

## Testing Connection

To test if the database connection works, you can:

1. **Via Test Script (Recommended):**
   - Visit: `https://blogs.360coordinates.com/backend/test-connection.php`
   - This script will check:
     - `.env` file exists and is readable
     - Database configuration is loaded
     - Database connection works
     - Database queries execute successfully
     - PHP extensions are installed
     - File permissions are correct
   - **⚠️ SECURITY:** Delete this file after testing in production!

2. **Via Health Check API:**
   - Visit: `https://blogs.360coordinates.com/backend/api/health`
   - Returns JSON with database connection status

3. **Via PHP Code:**
   ```php
   require_once 'config/database.php';
   try {
       $pdo = getDBConnection();
       echo "Database connected successfully!";
   } catch (Exception $e) {
       echo "Error: " . $e->getMessage();
   }
   ```

4. **Via API Endpoints:**
   - Try accessing any API endpoint (e.g., `/api/blogs`)
   - Check server error logs if connection fails

## Important Notes

- The `.env` file is in `.gitignore` (not tracked by git)
- Never commit database credentials to version control
- For production, use environment variables or secure credential storage

## Troubleshooting

### Connection Failed

1. **Check database exists:**
   ```sql
   SHOW DATABASES LIKE 'u449667423_Blogsdata';
   ```

2. **Check user permissions:**
   ```sql
   SHOW GRANTS FOR 'u449667423_blogsdata'@'localhost';
   ```

3. **Check MySQL service is running**

4. **Verify credentials:**
   - Database name: `u449667423_Blogsdata`
   - Username: `u449667423_blogsdata`
   - Password: `Shital@765`

### Remote Database

If your database is on a remote server, update `DB_HOST` in `.env`:
```
DB_HOST=your-remote-host.com
```

## Security

- ✅ `.env` file is excluded from git
- ✅ Credentials are not hardcoded
- ✅ Database connection uses PDO prepared statements
- ⚠️ Ensure `.env` file has proper file permissions (not world-readable)
