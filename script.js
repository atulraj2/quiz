let quizData = [];
let currentQuestion = 0;
let score = 0;

// Fetch questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuestion();
    });

function loadQuestion() {
    if (quizData.length === 0) return;
    const quiz = quizData[currentQuestion];
    document.getElementById("question").innerText = quiz.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    quiz.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (quizData[currentQuestion].answer === selected) {
        score++;
    }
    document.getElementById("result").innerText = `Score: ${score}/${quizData.length}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        document.getElementById("result").innerText = "";
    } else {
        document.getElementById("question").innerText = "Quiz Completed!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("result").innerText = `Final Score: ${score}/${quizData.length}`;
    }
}
