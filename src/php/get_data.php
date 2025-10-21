<?php
require_once 'db-connect.php';

// Function to send JSON response
function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Get contact_info
if ($_GET['type'] === 'contact_info') {
    $sql = "SELECT email, phone, address, map_link FROM cad_contact_info LIMIT 1";
    $result = $conn->query($sql);
    
    $data = [];
    if ($result->num_rows > 0) {
        $data[] = $result->fetch_assoc();
    }
    
    sendResponse($data);
}

// Get home
if ($_GET['type'] === 'home') {
    $sql = "SELECT img, title, subtitle, headline, mission, call_to_arms_title, call_to_arms_desc, latest_projects 
            FROM cad_home LIMIT 1";
    $result = $conn->query($sql);
    
    $data = [];
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $row['latest_projects'] = (bool)$row['latest_projects'];
        $data[] = $row;
    }
    
    sendResponse($data);
}

// Get terms_and_conditions
if ($_GET['type'] === 'terms_and_conditions') {
    $sql = "SELECT id, title, last_updated FROM cad_terms_and_conditions LIMIT 1";
    $result = $conn->query($sql);
    
    $data = [];
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $terms_id = $row['id'];
        
        // Get sections
        $sections_sql = "SELECT heading, content FROM cad_terms_sections WHERE terms_id = ?";
        $stmt = $conn->prepare($sections_sql);
        $stmt->bind_param("i", $terms_id);
        $stmt->execute();
        $sections_result = $stmt->get_result();
        
        $row['sections'] = [];
        while ($section = $sections_result->fetch_assoc()) {
            $row['sections'][] = $section;
        }
        
        $data[] = $row;
        $stmt->close();
    }
    
    sendResponse($data);
}

// Get projects (database.json)
if ($_GET['type'] === 'projects') {
    $sql = "SELECT id, image, title, category, description FROM cad_projects";
    $result = $conn->query($sql);
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    sendResponse($data);
}

// Get about_us
if ($_GET['type'] === 'about_us') {
    $sql = "SELECT id, title, subtitle, description, mission FROM cad_about_us LIMIT 1";
    $result = $conn->query($sql);
    
    $data = [];
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $about_id = $row['id'];
        
        // Get values
        $values_sql = "SELECT value FROM cad_about_values WHERE about_id = ?";
        $stmt = $conn->prepare($values_sql);
        $stmt->bind_param("i", $about_id);
        $stmt->execute();
        $values_result = $stmt->get_result();
        
        $row['values'] = [];
        while ($value = $values_result->fetch_assoc()) {
            $row['values'][] = $value['value'];
        }
        
        // Get team
        $team_sql = "SELECT name, role, bio FROM cad_about_team WHERE about_id = ?";
        $stmt = $conn->prepare($team_sql);
        $stmt->bind_param("i", $about_id);
        $stmt->execute();
        $team_result = $stmt->get_result();
        
        $row['team'] = [];
        while ($team = $team_result->fetch_assoc()) {
            $row['team'][] = $team;
        }
        
        $data[] = $row;
        $stmt->close();
    }
    
    sendResponse($data);
}

// If no valid type is provided
sendResponse(['error' => 'Invalid request type']);

$conn->close();
?>