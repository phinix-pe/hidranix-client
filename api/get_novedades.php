<?php
require_once 'config.php';

$plataforma = $_GET['plataforma'] ?? 'phinix';
$tipo = $_GET['tipo'] ?? null; // 'evento' o 'novedad'

// Definir límite por defecto según el tipo
$defaultLimit = 10;
if ($tipo === 'evento') $defaultLimit = 3;
if ($tipo === 'novedad') $defaultLimit = 6;

$limit = (int)($_GET['limit'] ?? $defaultLimit);

// Validar plataforma
if (!in_array($plataforma, ['phinix', 'hidranix'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Plataforma inválida']);
    exit;
}

try {
    // Construcción dinámica de la consulta
    $sql = "SELECT id, titulo, descripcion, fecha, categoria, imagen, tipo 
            FROM novedades 
            WHERE plataforma = ? AND activo = TRUE";
    
    $types = "s";
    $params = [$plataforma];

    // Agregar filtro de tipo si existe
    if ($tipo) {
        $sql .= " AND tipo = ?";
        $types .= "s";
        $params[] = $tipo;
    }

    $sql .= " ORDER BY fecha DESC LIMIT ?";
    $types .= "i";
    $params[] = $limit;

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    
    $stmt->execute();
    $result = $stmt->get_result();

    $novedades = [];
    while ($row = $result->fetch_assoc()) {
        $novedades[] = $row;
    }

    echo json_encode($novedades);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$conn->close();
?>