<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Para desarrollo - cambia en producción
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$host = 'cpanel.phinix.com.pe'; // Cambia esto por tu dominio de cPanel
$dbname = 'phinixco_Pruebas';
$username = 'phinixco_christian';
$password = 'F3F!6DK,,4!fy$zB';

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
?>