const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "HyperText Markup Language", correct: true},
            {text: "Home Tool Markup Language", correct: false},
            {text: "Hyperlinks and Text Markup Language", correct: false},
            {text: "HighText Markup Language", correct: false},
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            {text: "class", correct: false},
            {text: "style", correct: true},
            {text: "id", correct: false},
            {text: "font", correct: false},
        ]
    },
    {
        question: "Which of the following is used to structure web pages?",
        answers: [
            {text: "CSS", correct: false},
            {text: "JavaScript", correct: false},
            {text: "PHP", correct: false},
            {text: "HTML", correct: true},
        ]
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        answers: [
            {text: "color", correct: false},
            {text: "background-color", correct: true},
            {text: "font-color", correct: false},
            {text: "bg-color", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
