<?php
/**
 * Contact Message Model
 * 
 * Handles all database operations for contact messages
 */

require_once __DIR__ . '/../config/database.php';

class ContactMessage {
    private $db;
    
    public function __construct() {
        $this->db = getDBConnection();
    }
    
    /**
     * Get all contact messages
     * 
     * @param int $page Page number
     * @param int $perPage Items per page
     * @return array
     */
    public function getAll($page = 1, $perPage = 20) {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT * FROM v_contact_messages ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', (int)$perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Get total count of contact messages
     * 
     * @return int
     */
    public function getTotalCount() {
        $sql = "SELECT COUNT(*) as total FROM contact_messages";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch();
        return (int)$result['total'];
    }
    
    /**
     * Get contact message by ID
     * 
     * @param int $id Message ID
     * @return array|null
     */
    public function getById($id) {
        $sql = "SELECT * FROM contact_messages WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetch() ?: null;
    }
    
    /**
     * Create new contact message
     * 
     * @param array $data Message data
     * @return int|false Message ID on success, false on failure
     */
    public function create($data) {
        $sql = "INSERT INTO contact_messages (name, email, mobile, message) 
                VALUES (:name, :email, :mobile, :message)";
        
        $stmt = $this->db->prepare($sql);
        
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':email', $data['email']);
        $stmt->bindValue(':mobile', $data['mobile'] ?? null);
        $stmt->bindValue(':message', $data['message']);
        
        if ($stmt->execute()) {
            return $this->db->lastInsertId();
        }
        
        return false;
    }
    
    /**
     * Update contact message status
     * 
     * @param int $id Message ID
     * @param string $status New status
     * @return bool
     */
    public function updateStatus($id, $status) {
        $allowedStatuses = ['new', 'read', 'replied', 'archived'];
        
        if (!in_array($status, $allowedStatuses)) {
            return false;
        }
        
        $sql = "UPDATE contact_messages SET status = :status WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':status', $status);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        
        return $stmt->execute();
    }
    
    /**
     * Delete contact message
     * 
     * @param int $id Message ID
     * @return bool
     */
    public function delete($id) {
        $sql = "DELETE FROM contact_messages WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        
        return $stmt->execute();
    }
}
