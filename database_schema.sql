-- =====================================================
-- Blog Website Database Schema
-- =====================================================
-- This SQL file contains the database schema
-- for the React-based blog website.
-- Focus: Blog storage and display only (no authentication)
-- Compatible with MySQL, PostgreSQL, and SQLite
-- =====================================================

-- =====================================================
-- 1. CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_display_order (display_order)
);

-- =====================================================
-- 2. BLOGS TABLE (main blog posts)
-- =====================================================
CREATE TABLE IF NOT EXISTS blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category_id INT,
    image_url VARCHAR(500),
    featured_image VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    views_count INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_published (is_published, published_at),
    INDEX idx_featured (is_featured),
    INDEX idx_created (created_at)
);

-- =====================================================
-- 3. CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(20),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default categories
INSERT INTO categories (name, slug, icon, description, display_order) VALUES
('Buy', 'buy', '🏠', 'Complete guides for property buyers', 1),
('Rent', 'rent', '🔑', 'Rental guides and lease tips', 2),
('Investment', 'investment', '📈', 'Smart property investment strategies', 3),
('Legal', 'legal', '📋', 'Legal guides and document checklists', 4),
('Tips', 'tips', '💡', 'Property tips and advice', 5),
('News', 'news', '📰', 'Latest real estate news and updates', 6)
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample blog posts
INSERT INTO blogs (title, slug, content, excerpt, category_id, image_url, is_published, is_featured, published_at) VALUES
(
    'Is 2026 the Right Time to Invest in Indian Real Estate?',
    'is-2026-right-time-invest-indian-real-estate',
    'Explore market trends, government policies, and expert predictions to make informed investment decisions. The Indian real estate market has shown remarkable resilience and growth in recent years. With government initiatives like RERA, affordable housing schemes, and infrastructure development, the sector presents numerous opportunities for investors. This comprehensive guide will help you understand the current market dynamics, identify the best investment opportunities, and make informed decisions about your real estate investments in 2026.',
    'Explore market trends, government policies, and expert predictions to make informed investment decisions.',
    (SELECT id FROM categories WHERE slug = 'investment' LIMIT 1),
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    TRUE,
    TRUE,
    NOW()
),
(
    'Top 7 Mistakes First-Time Home Buyers Make in India',
    'top-7-mistakes-first-time-home-buyers-india',
    'Avoid common pitfalls and make your first property purchase smooth and successful with these expert tips. Buying your first home is one of the most significant financial decisions you will make. However, many first-time buyers fall into common traps that can cost them time, money, and peace of mind. This article outlines the seven most common mistakes and provides practical advice on how to avoid them.',
    'Avoid common pitfalls and make your first property purchase smooth and successful with these expert tips.',
    (SELECT id FROM categories WHERE slug = 'buy' LIMIT 1),
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    TRUE,
    TRUE,
    NOW()
),
(
    'RERA Act: Complete Guide for Property Buyers',
    'rera-act-complete-guide-property-buyers',
    'Understand how RERA protects your interests and what you need to know before buying property. The Real Estate (Regulation and Development) Act, 2016 (RERA) was introduced to bring transparency and accountability to the real estate sector. This comprehensive guide explains how RERA protects homebuyers, what rights you have under the act, and how to file complaints if needed.',
    'Understand how RERA protects your interests and what you need to know before buying property.',
    (SELECT id FROM categories WHERE slug = 'legal' LIMIT 1),
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    TRUE,
    TRUE,
    NOW()
)
ON DUPLICATE KEY UPDATE title=title;

-- =====================================================
-- VIEWS (for easier querying)
-- =====================================================

-- View for published blogs with category info
CREATE OR REPLACE VIEW v_published_blogs AS
SELECT 
    b.id,
    b.title,
    b.slug,
    b.content,
    b.excerpt,
    b.image_url,
    b.is_featured,
    b.views_count,
    b.published_at,
    b.created_at,
    b.updated_at,
    c.name AS category_name,
    c.slug AS category_slug,
    c.icon AS category_icon
FROM blogs b
LEFT JOIN categories c ON b.category_id = c.id
WHERE b.is_published = TRUE
ORDER BY b.published_at DESC;

-- View for contact messages
CREATE OR REPLACE VIEW v_contact_messages AS
SELECT 
    id,
    name,
    email,
    mobile,
    message,
    status,
    created_at,
    updated_at
FROM contact_messages
ORDER BY created_at DESC;

-- =====================================================
-- STORED PROCEDURES (Optional - for common operations)
-- =====================================================

-- Procedure to increment blog views
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_increment_blog_views(IN blog_id INT)
BEGIN
    UPDATE blogs 
    SET views_count = views_count + 1 
    WHERE id = blog_id;
END //
DELIMITER ;

-- Procedure to get featured blogs
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_get_featured_blogs(IN limit_count INT)
BEGIN
    SELECT * FROM v_published_blogs
    WHERE is_featured = TRUE
    ORDER BY published_at DESC
    LIMIT limit_count;
END //
DELIMITER ;

-- Procedure to get blogs by category
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_get_blogs_by_category(IN category_slug VARCHAR(50), IN limit_count INT)
BEGIN
    SELECT * FROM v_published_blogs
    WHERE category_slug = category_slug
    ORDER BY published_at DESC
    LIMIT limit_count;
END //
DELIMITER ;

-- =====================================================
-- COMMON QUERIES (for reference)
-- =====================================================

-- Get all published blogs
-- SELECT * FROM v_published_blogs;

-- Get featured blogs
-- SELECT * FROM v_published_blogs WHERE is_featured = TRUE LIMIT 4;

-- Get blogs by category
-- SELECT * FROM v_published_blogs WHERE category_slug = 'investment';

-- Get single blog by slug
-- SELECT * FROM v_published_blogs WHERE slug = 'is-2026-right-time-invest-indian-real-estate';

-- Get all categories
-- SELECT * FROM categories WHERE is_active = TRUE ORDER BY display_order;

-- Get contact messages
-- SELECT * FROM v_contact_messages WHERE status = 'new';

-- =====================================================
-- NOTES
-- =====================================================
-- 1. This schema is simplified - no authentication required
-- 2. Adjust data types based on your database system:
--    - MySQL: Use the schema as-is
--    - PostgreSQL: Change AUTO_INCREMENT to SERIAL, ENUM to VARCHAR with CHECK constraints
--    - SQLite: Remove AUTO_INCREMENT, use INTEGER PRIMARY KEY, remove ENUM types
-- 3. For production, add proper indexes based on your query patterns
-- 4. Consider adding soft delete functionality (deleted_at column) if needed
-- 5. Full-text search index for blogs (MySQL):
--    ALTER TABLE blogs ADD FULLTEXT INDEX ft_search (title, content, excerpt);
-- =====================================================
