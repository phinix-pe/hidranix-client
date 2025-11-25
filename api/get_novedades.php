<?php
require_once 'config.php';

$plataforma = $_GET['plataforma'] ?? 'phinix';
$limit = (int)($_GET['limit'] ?? 10);

// Validar plataforma
if (!in_array($plataforma, ['phinix', 'hidranix'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Plataforma inválida']);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT id, titulo, descripcion, fecha, categoria, imagen
        FROM novedades
        WHERE plataforma = ? AND activo = TRUE
        ORDER BY fecha DESC
        LIMIT ?
    ");

    $stmt->bind_param("si", $plataforma, $limit);
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