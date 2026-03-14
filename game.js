let correctAnswer = 0;
let score = 0;
let level = 1;
let questionIndex = 0;
const questionsPerLevel = 10;
const maxLevel = 100;
let timerDuration = 10; // seconds
let timer;
let currentGame = "banana";

// Get the game from URL parameter
const params = new URLSearchParams(window.location.search);
if(params.has("game")) {
    currentGame = params.get("game");
}
document.getElementById("game-title").innerText = currentGame === "banana" ? "Banana Math Game" : "Tomato Math Game";

function startTimer() {
    let timeLeft = timerDuration;
    document.getElementById("timer").innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if(timeLeft <= 0){
            clearInterval(timer);
            document.getElementById("result").innerText = `Time's up! Correct answer was: ${correctAnswer}`;
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    let apiURL = currentGame === "banana" ? 
        "https://marcconrad.com/uob/banana/api.php" : 
        "https://marcconrad.com/uob/tomato/api.php";

    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        document.getElementById("question").innerHTML = `<img src="${data.question}" width="250">`;
        correctAnswer = data.solution;
        document.getElementById("answer").value = "";
        document.getElementById("result").innerText = "";
        startTimer();
    })
    .catch(() => {
        document.getElementById("question").innerText = "⚠ Failed to load question.";
    });
}

function nextQuestion() {
    questionIndex++;
    if(questionIndex >= questionsPerLevel){
        level++;
        questionIndex = 0;
        if(level > maxLevel){
            alert("Congratulations! You completed all 100 levels.");
            return;
        } else {
            alert(`Level up! Welcome to Level ${level}`);
        }
    }
    document.getElementById("level").innerText = level;
    loadQuestion();
}

document.getElementById("submit").addEventListener("click", function(){
    clearInterval(timer);
    const userAnswer = parseInt(document.getElementById("answer").value);
    if(userAnswer === correctAnswer){
        score += 10;
        document.getElementById("score").innerText = score;
        document.getElementById("result").innerText = "Correct! +10 marks";
    } else {
        document.getElementById("result").innerText = `Wrong! Correct answer was: ${correctAnswer}`;
    }

    // Save score (optional, PHP)
    fetch("score.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "score=" + score
    });

    // Move to next question after short delay
    setTimeout(nextQuestion, 1000);
});

document.getElementById("next").addEventListener("click", function(){
    clearInterval(timer);
    nextQuestion();
});

loadQuestion();