let userName = '';
let userGroup = '';

const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: 2 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let results = [];

const userInfoEl = document.getElementById('user-info');
const userForm = document.getElementById('user-form');
const quizEl = document.getElementById('quiz');
const questionEl = document.querySelector('.question');
const optionEls = document.querySelectorAll('.option');

// Handle user input and start the quiz
userForm.onsubmit = (e) => {
    e.preventDefault();
    userName = document.getElementById('name').value;
    userGroup = document.getElementById('group').value;

    if (userName && userGroup) {
        userInfoEl.classList.add('hidden');
        quizEl.classList.remove('hidden');
        loadQuestion();
    }
};

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionEls.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.onclick = () => handleAnswer(index);
    });
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Store the answer
    results.push({
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[selectedIndex],
        correctAnswer: currentQuestion.options[currentQuestion.correctAnswer]
    });

    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionEl.textContent = `You scored ${score} out of ${questions.length}`;
    document.querySelector('.options').style.display = 'none';

    // Save the result
    saveResults();
}

function saveResults() {
    const userResult = {
        name: userName,
        group: userGroup,
        score: score,
        details: results
    };

    console.log("User Result:", userResult); // You can replace this with actual file saving logic

    // You can also save it to a file or a database:
    // In Electron, you can use fs (file system module) to save the results as a JSON file:
    const fs = require('fs');
    const filePath = `results_${userName}_${userGroup}.json`;
    
    fs.writeFileSync(filePath, JSON.stringify(userResult, null, 2));
}