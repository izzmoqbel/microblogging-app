<?php

session_start();

session_unset();

if (session_destroy()) {
    echo json_encode(['success' => true, 'message' => 'Logout successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to destroy the session']);
}
