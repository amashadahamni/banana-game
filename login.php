<?php

$conn = new mysqli("localhost","root","","banana_game");

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if($result->num_rows > 0){

$row = $result->fetch_assoc();

if(password_verify($password,$row['password'])){

header("Location: game.html");
exit();

}else{

echo "Wrong password";

}

}else{

echo "User not found";

}

?>