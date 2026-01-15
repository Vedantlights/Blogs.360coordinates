# Database Schema Documentation

## Overview
This document describes the simplified database schema for the blog website. The schema focuses on **blog storage and display only** - no authentication required.

## Database File
- **File**: `database_schema.sql`
- **Compatible with**: MySQL, PostgreSQL (with minor modifications), SQLite (with modifications)

## Tables Structure

### 1. `categories` Table
Stores blog categories (Buy, Rent, Investment, Legal, Tips, News).

**Key Fields:**
- `id`: Primary key
- `name`: Category name
- `slug`: URL-friendly identifier
- `icon`: Emoji or icon identifier
- `description`: Category description
- `display_order`: Order for display
- `is_active`: Whether category is active

**Usage**: Organize blogs by category

---

### 2. `blogs` Table
Main table for blog posts.

**Key Fields:**
- `id`: Primary key
- `title`: Blog post title
- `slug`: URL-friendly identifier (e.g., "is-2026-right-time-invest")
- `content`: Full blog content (TEXT)
- `excerpt`: Short description/excerpt
- `category_id`: Foreign key to categories
- `image_url`: Main blog image URL
- `featured_image`: Optional featured image
- `is_featured`: Whether blog is featured
- `is_published`: Publication status
- `published_at`: When blog was published
- `views_count`: Number of views
- `meta_title`, `meta_description`, `meta_keywords`: SEO fields
- `created_at`, `updated_at`: Timestamps

**Usage**: Store all blog posts with full content

---

### 3. `contact_messages` Table
Stores contact form submissions.

**Key Fields:**
- `id`: Primary key
- `name`: Sender's name
- `email`: Sender's email
- `mobile`: Sender's phone number
- `message`: Message content
- `status`: Message status (new, read, replied, archived)
- `created_at`, `updated_at`: Timestamps

**Usage**: Manage contact form submissions

---

## Views

### `v_published_blogs`
Pre-joined view of published blogs with category information.

**Usage**: Quick access to published blogs with related category data

**Columns:**
- All blog fields
- `category_name`: Category name
- `category_slug`: Category slug
- `category_icon`: Category icon

### `v_contact_messages`
View of contact messages.

**Usage**: Easy access to contact messages

---

## Stored Procedures

### `sp_increment_blog_views(blog_id)`
Increments the view count for a blog post.

**Usage**: Track blog post views

**Example:**
```sql
CALL sp_increment_blog_views(1);
```

### `sp_get_featured_blogs(limit_count)`
Retrieves featured blog posts.

**Usage**: Get featured blogs for homepage

**Example:**
```sql
CALL sp_get_featured_blogs(4);
```

### `sp_get_blogs_by_category(category_slug, limit_count)`
Retrieves blogs by category.

**Usage**: Get blogs filtered by category

**Example:**
```sql
CALL sp_get_blogs_by_category('investment', 10);
```

---

## Installation Instructions

### MySQL
```bash
mysql -u your_username -p your_database_name < database_schema.sql
```

### PostgreSQL
1. Convert `AUTO_INCREMENT` to `SERIAL`
2. Convert `ENUM` to `VARCHAR` with `CHECK` constraints
3. Adjust syntax as needed

### SQLite
1. Remove `AUTO_INCREMENT` (use `INTEGER PRIMARY KEY`)
2. Remove `ENUM` types (use `VARCHAR`)
3. Remove stored procedures (not supported)
4. Views are supported in SQLite

---

## Default Data

The schema includes:
- **6 default categories**: Buy, Rent, Investment, Legal, Tips, News
- **3 sample blog posts**: For testing

---

## Common Queries

### Get All Published Blogs
```sql
SELECT * FROM v_published_blogs;
```

### Get Featured Blogs
```sql
SELECT * FROM v_published_blogs 
WHERE is_featured = TRUE 
ORDER BY published_at DESC 
LIMIT 4;
```

### Get Blogs by Category
```sql
SELECT * FROM v_published_blogs 
WHERE category_slug = 'investment' 
ORDER BY published_at DESC;
```

### Get Single Blog by Slug
```sql
SELECT * FROM v_published_blogs 
WHERE slug = 'is-2026-right-time-invest-indian-real-estate';
```

### Get All Categories
```sql
SELECT * FROM categories 
WHERE is_active = TRUE 
ORDER BY display_order;
```

### Create New Blog
```sql
INSERT INTO blogs (title, slug, content, excerpt, category_id, image_url, is_published, is_featured, published_at)
VALUES (
    'New Blog Title', 
    'new-blog-slug', 
    'Full content here...', 
    'Short excerpt...', 
    (SELECT id FROM categories WHERE slug = 'buy' LIMIT 1), 
    'https://example.com/image.jpg', 
    TRUE, 
    FALSE, 
    NOW()
);
```

### Update Blog
```sql
UPDATE blogs 
SET title = 'Updated Title', 
    content = 'Updated content...',
    updated_at = NOW()
WHERE id = 1;
```

### Delete Blog
```sql
DELETE FROM blogs WHERE id = 1;
```

### Get Contact Messages
```sql
SELECT * FROM v_contact_messages 
WHERE status = 'new' 
ORDER BY created_at DESC;
```

### Insert Contact Message
```sql
INSERT INTO contact_messages (name, email, mobile, message)
VALUES ('John Doe', 'john@example.com', '1234567890', 'Hello, I have a question...');
```

---

## API Integration Examples

### Backend Endpoints You'll Need

1. **GET /api/blogs** - Get all published blogs
   ```sql
   SELECT * FROM v_published_blogs;
   ```

2. **GET /api/blogs/featured** - Get featured blogs
   ```sql
   SELECT * FROM v_published_blogs WHERE is_featured = TRUE LIMIT 4;
   ```

3. **GET /api/blogs/category/:slug** - Get blogs by category
   ```sql
   SELECT * FROM v_published_blogs WHERE category_slug = ?;
   ```

4. **GET /api/blogs/:slug** - Get single blog
   ```sql
   SELECT * FROM v_published_blogs WHERE slug = ?;
   ```

5. **POST /api/blogs** - Create new blog
   ```sql
   INSERT INTO blogs (title, slug, content, excerpt, category_id, image_url, is_published, published_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, NOW());
   ```

6. **PUT /api/blogs/:id** - Update blog
   ```sql
   UPDATE blogs SET title = ?, content = ?, excerpt = ?, category_id = ?, image_url = ?, updated_at = NOW()
   WHERE id = ?;
   ```

7. **DELETE /api/blogs/:id** - Delete blog
   ```sql
   DELETE FROM blogs WHERE id = ?;
   ```

8. **GET /api/categories** - Get all categories
   ```sql
   SELECT * FROM categories WHERE is_active = TRUE ORDER BY display_order;
   ```

9. **POST /api/contact** - Submit contact form
   ```sql
   INSERT INTO contact_messages (name, email, mobile, message)
   VALUES (?, ?, ?, ?);
   ```

---

## Next Steps

1. **Set up your database** using the SQL file
2. **Create your backend API** (Node.js, Python, PHP, etc.)
3. **Connect your admin panel** to use real API calls instead of dummy data
4. **Implement file upload** for blog images (store URLs in `image_url` field)
5. **Set up email notifications** for contact form submissions (optional)

---

## Notes

- **No Authentication**: This schema doesn't include user authentication. If you need to secure your admin panel later, you can add authentication at the application level.
- **Image Storage**: The `image_url` field stores URLs. You can store:
  - External URLs (e.g., Unsplash, Cloudinary)
  - Relative paths to uploaded files (e.g., `/uploads/blog-image.jpg`)
  - Full URLs to your CDN or storage service
- **Slug Generation**: Generate slugs from titles (e.g., "My Blog Post" → "my-blog-post")
- **SEO Fields**: Use `meta_title`, `meta_description`, and `meta_keywords` for better SEO

---

## Support

For questions or issues with the schema, refer to the comments in the SQL file or modify as needed for your specific requirements.
