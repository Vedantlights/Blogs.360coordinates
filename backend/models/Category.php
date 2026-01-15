<?php
/**
 * Category Model
 * 
 * Handles all database operations for categories
 */

require_once __DIR__ . '/../config/database.php';

class Category {
    private $db;
    
    public function __construct() {
        $this->db = getDBConnection();
    }
    
    /**
     * Get all active categories ordered by display_order
     * 
     * @return array
     */
    public function getActive() {
        $sql = "SELECT * FROM categories WHERE is_active = TRUE ORDER BY display_order ASC, name ASC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get all categories (for admin)
     * 
     * @return array
     */
    public function getAll() {
        $sql = "SELECT * FROM categories ORDER BY display_order ASC, name ASC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get category by ID
     * 
     * @param int $id Category ID
     * @return array|null
     */
    public function getById($id) {
        $sql = "SELECT * FROM categories WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetch() ?: null;
    }
    
    /**
     * Get category by slug
     * 
     * @param string $slug Category slug
     * @return array|null
     */
    public function getBySlug($slug) {
        $sql = "SELECT * FROM categories WHERE slug = :slug LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':slug', $slug);
        $stmt->execute();
        
        return $stmt->fetch() ?: null;
    }
    
    /**
     * Check if slug exists
     * 
     * @param string $slug Category slug
     * @param int|null $excludeId Category ID to exclude (for updates)
     * @return bool
     */
    public function slugExists($slug, $excludeId = null) {
        $sql = "SELECT COUNT(*) as count FROM categories WHERE slug = :slug";
        $params = [':slug' => $slug];
        
        if ($excludeId !== null) {
            $sql .= " AND id != :exclude_id";
            $params[':exclude_id'] = $excludeId;
        }
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->execute();
        
        $result = $stmt->fetch();
        return (int)$result['count'] > 0;
    }
    
    /**
     * Create new category
     * 
     * @param array $data Category data
     * @return int|false Category ID on success, false on failure
     */
    public function create($data) {
        $sql = "INSERT INTO categories (name, slug, icon, description, display_order, is_active) 
                VALUES (:name, :slug, :icon, :description, :display_order, :is_active)";
        
        $stmt = $this->db->prepare($sql);
        
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':slug', $data['slug']);
        $stmt->bindValue(':icon', $data['icon'] ?? null);
        $stmt->bindValue(':description', $data['description'] ?? null);
        $stmt->bindValue(':display_order', $data['display_order'] ?? 0, PDO::PARAM_INT);
        $stmt->bindValue(':is_active', $data['is_active'] ?? true, PDO::PARAM_BOOL);
        
        if ($stmt->execute()) {
            return $this->db->lastInsertId();
        }
        
        return false;
    }
    
    /**
     * Update category
     * 
     * @param int $id Category ID
     * @param array $data Category data
     * @return bool
     */
    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];
        
        $allowedFields = ['name', 'slug', 'icon', 'description', 'display_order', 'is_active'];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }
        
        if (empty($fields)) {
            return false;
        }
        
        $sql = "UPDATE categories SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        
        foreach ($params as $key => $value) {
            if ($key === ':display_order') {
                $stmt->bindValue($key, $value, PDO::PARAM_INT);
            } elseif ($key === ':is_active') {
                $stmt->bindValue($key, $value, PDO::PARAM_BOOL);
            } else {
                $stmt->bindValue($key, $value);
            }
        }
        
        return $stmt->execute();
    }
    
    /**
     * Delete category
     * 
     * @param int $id Category ID
     * @return bool
     */
    public function delete($id) {
        $sql = "DELETE FROM categories WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        
        return $stmt->execute();
    }
}
