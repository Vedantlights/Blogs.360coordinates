<?php
/**
 * Contact Controller
 * 
 * Handles contact message-related API requests
 */

require_once __DIR__ . '/../models/ContactMessage.php';
require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../helpers/Validator.php';

class ContactController {
    private $contactMessage;
    
    public function __construct() {
        $this->contactMessage = new ContactMessage();
    }
    
    /**
     * Create new contact message
     * POST /api/contact
     */
    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                Response::error('Invalid JSON data', 400);
            }
            
            $validation = Validator::validateContactMessage($input);
            
            if (!$validation['valid']) {
                Response::error('Validation failed', 400, $validation['errors']);
            }
            
            $data = $validation['sanitized'];
            
            $id = $this->contactMessage->create($data);
            
            if ($id === false) {
                Response::error('Failed to save contact message', 500);
            }
            
            $message = $this->contactMessage->getById($id);
            Response::success($message, 'Message sent successfully', 201);
        } catch (Exception $e) {
            error_log("ContactController::create Error: " . $e->getMessage());
            Response::error('Failed to send message', 500);
        }
    }
    
    /**
     * Get all contact messages (Admin)
     * GET /api/admin/contact-messages
     */
    public function getAll() {
        try {
            $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
            $perPage = isset($_GET['per_page']) ? max(1, min(100, (int)$_GET['per_page'])) : 20;
            
            $messages = $this->contactMessage->getAll($page, $perPage);
            $total = $this->contactMessage->getTotalCount();
            
            Response::paginated($messages, $page, $perPage, $total, 'Contact messages retrieved successfully');
        } catch (Exception $e) {
            error_log("ContactController::getAll Error: " . $e->getMessage());
            Response::error('Failed to retrieve contact messages', 500);
        }
    }
}
