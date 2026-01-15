<?php
/**
 * Validator Helper
 * 
 * Provides input validation functions
 */

class Validator {
    /**
     * Validate required fields
     * 
     * @param array $data Input data
     * @param array $required Required field names
     * @return array Array of validation errors (empty if valid)
     */
    public static function validateRequired($data, $required) {
        $errors = [];
        
        foreach ($required as $field) {
            if (!isset($data[$field]) || trim($data[$field]) === '') {
                $errors[$field] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
            }
        }
        
        return $errors;
    }
    
    /**
     * Validate email format
     * 
     * @param string $email Email address
     * @return bool
     */
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    
    /**
     * Validate slug format
     * 
     * @param string $slug Slug string
     * @return bool
     */
    public static function validateSlug($slug) {
        return preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) === 1;
    }
    
    /**
     * Sanitize string input
     * 
     * @param string $input Input string
     * @return string Sanitized string
     */
    public static function sanitizeString($input) {
        return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Sanitize integer input
     * 
     * @param mixed $input Input value
     * @return int|null
     */
    public static function sanitizeInt($input) {
        return filter_var($input, FILTER_VALIDATE_INT);
    }
    
    /**
     * Sanitize boolean input
     * 
     * @param mixed $input Input value
     * @return bool
     */
    public static function sanitizeBool($input) {
        if (is_bool($input)) {
            return $input;
        }
        if (is_string($input)) {
            return in_array(strtolower($input), ['true', '1', 'yes', 'on']);
        }
        return (bool)$input;
    }
    
    /**
     * Validate and sanitize blog data
     * 
     * @param array $data Blog data
     * @param bool $isUpdate Whether this is an update operation
     * @return array ['valid' => bool, 'errors' => array, 'sanitized' => array]
     */
    public static function validateBlog($data, $isUpdate = false) {
        $errors = [];
        $sanitized = [];
        
        // Required fields (only for create)
        if (!$isUpdate) {
            $required = ['title', 'slug', 'content'];
            $requiredErrors = self::validateRequired($data, $required);
            $errors = array_merge($errors, $requiredErrors);
        }
        
        // Validate slug format if provided
        if (isset($data['slug']) && !empty($data['slug'])) {
            if (!self::validateSlug($data['slug'])) {
                $errors['slug'] = 'Slug must contain only lowercase letters, numbers, and hyphens';
            } else {
                $sanitized['slug'] = self::sanitizeString($data['slug']);
            }
        }
        
        // Validate email if provided
        if (isset($data['email']) && !empty($data['email'])) {
            if (!self::validateEmail($data['email'])) {
                $errors['email'] = 'Invalid email format';
            } else {
                $sanitized['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            }
        }
        
        // Sanitize other fields
        $fields = ['title', 'content', 'excerpt', 'image_url', 'featured_image', 
                   'meta_title', 'meta_description', 'meta_keywords'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $sanitized[$field] = self::sanitizeString($data[$field]);
            }
        }
        
        // Sanitize integers
        if (isset($data['category_id'])) {
            $sanitized['category_id'] = self::sanitizeInt($data['category_id']);
            if ($sanitized['category_id'] === false) {
                $errors['category_id'] = 'Category ID must be a valid integer';
            }
        }
        
        // Sanitize booleans
        if (isset($data['is_featured'])) {
            $sanitized['is_featured'] = self::sanitizeBool($data['is_featured']);
        }
        
        if (isset($data['is_published'])) {
            $sanitized['is_published'] = self::sanitizeBool($data['is_published']);
        }
        
        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'sanitized' => $sanitized
        ];
    }
    
    /**
     * Validate and sanitize category data
     * 
     * @param array $data Category data
     * @param bool $isUpdate Whether this is an update operation
     * @return array ['valid' => bool, 'errors' => array, 'sanitized' => array]
     */
    public static function validateCategory($data, $isUpdate = false) {
        $errors = [];
        $sanitized = [];
        
        // Required fields (only for create)
        if (!$isUpdate) {
            $required = ['name', 'slug'];
            $requiredErrors = self::validateRequired($data, $required);
            $errors = array_merge($errors, $requiredErrors);
        }
        
        // Validate slug format if provided
        if (isset($data['slug']) && !empty($data['slug'])) {
            if (!self::validateSlug($data['slug'])) {
                $errors['slug'] = 'Slug must contain only lowercase letters, numbers, and hyphens';
            } else {
                $sanitized['slug'] = self::sanitizeString($data['slug']);
            }
        }
        
        // Sanitize string fields
        $fields = ['name', 'icon', 'description'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $sanitized[$field] = self::sanitizeString($data[$field]);
            }
        }
        
        // Sanitize integers
        if (isset($data['display_order'])) {
            $sanitized['display_order'] = self::sanitizeInt($data['display_order']);
            if ($sanitized['display_order'] === false) {
                $errors['display_order'] = 'Display order must be a valid integer';
            }
        }
        
        // Sanitize booleans
        if (isset($data['is_active'])) {
            $sanitized['is_active'] = self::sanitizeBool($data['is_active']);
        }
        
        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'sanitized' => $sanitized
        ];
    }
    
    /**
     * Validate and sanitize contact message data
     * 
     * @param array $data Contact message data
     * @return array ['valid' => bool, 'errors' => array, 'sanitized' => array]
     */
    public static function validateContactMessage($data) {
        $errors = [];
        $sanitized = [];
        
        // Required fields
        $required = ['name', 'email', 'message'];
        $requiredErrors = self::validateRequired($data, $required);
        $errors = array_merge($errors, $requiredErrors);
        
        // Validate email
        if (isset($data['email']) && !empty($data['email'])) {
            if (!self::validateEmail($data['email'])) {
                $errors['email'] = 'Invalid email format';
            } else {
                $sanitized['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            }
        }
        
        // Sanitize string fields
        $fields = ['name', 'mobile', 'message'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $sanitized[$field] = self::sanitizeString($data[$field]);
            }
        }
        
        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'sanitized' => $sanitized
        ];
    }
}
