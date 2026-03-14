<?php
session_start();

$conn = new mysqli("localhost","root","","banana_game");

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    if(password_verify($password,$row['password'])){
        $_SESSION['user_id'] = $row['id']; // make sure your users table has id
        header("Location: choose_game.html");
        exit();
    } else {
        echo "Wrong password";
    }
} else {
    echo "User not found";
}
?>