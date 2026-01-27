-- =====================================================
-- Add "Sell" Category to Database
-- =====================================================
-- Run this SQL script to add the "Sell" category
-- to your existing database
-- =====================================================

INSERT INTO categories (name, slug, icon, description, display_order, is_active) 
VALUES ('Sell', 'sell', '💰', 'Complete guides for property sellers', 3, 1)
ON DUPLICATE KEY UPDATE name=name;

-- Update display_order for existing categories after "Sell"
UPDATE categories SET display_order = 4 WHERE slug = 'investment';
UPDATE categories SET display_order = 5 WHERE slug = 'legal';
UPDATE categories SET display_order = 6 WHERE slug = 'tips';
UPDATE categories SET display_order = 7 WHERE slug = 'news';
