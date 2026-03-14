let correctAnswer = 0;
let score = 0;
let level = 1;
let questionIndex = 0;
const questionsPerLevel = 10;
const maxLevel = 100;
let timerDuration = 10;
let timer;

const params = new URLSearchParams(window.location.search);
const currentGame = params.get('game') || 'banana';
const character = params.get('character') || 'monco';

document.getElementById("game-title").innerText = currentGame === "banana" ? "Banana Math Game" : "Tomato Math Game";
document.getElementById("character-name").innerText = character.charAt(0).toUpperCase() + character.slice(1);

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
            setTimeout(nextQuestion, 1000);
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

    fetch("score.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "score=" + score + "&level=" + level
    });

    setTimeout(nextQuestion, 1000);
});

document.getElementById("next").addEventListener("click", function(){
    clearInterval(timer);
    nextQuestion();
});

loadQuestion();