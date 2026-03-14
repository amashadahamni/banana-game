<?php
session_start();

$conn = new mysqli("localhost", "root", "", "banana_game");

if(isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $score = $_POST['score'];
    $level = $_POST['level'];

    $stmt = $conn->prepare("INSERT INTO scores (user_id, score, level) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $user_id, $score, $level);
    $stmt->execute();
}

echo "saved";
?>