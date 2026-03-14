function validatePassword(){
  let score = 0;
let level = 1;
let questionIndex = 0;
let totalQuestions = 10; // number of questions per level
let timerDuration = 10 * 60; // 10 minutes in seconds
let timerInterval;

let password =
document.getElementById("password").value;

let capital = /[A-Z]/;
let numbers = /[0-9].*[0-9]/;

if(password.length < 10){
alert("Password must be at least 10 characters");
return false;
}

if(!capital.test(password)){
alert("Password must contain a capital letter");
return false;
}

if(!numbers.test(password)){
alert("Password must contain 2 numbers");
return false;
}

return true;


}