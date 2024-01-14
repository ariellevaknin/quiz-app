const questions = [
    {
        question: "What is Taylor Swift's middle name?", 
        answers: [
            {text: 'Elizabeth', correct: false},
            {text: 'Allison', correct: true},
            {text: 'Marie', correct: false},
            {text: 'Kate', correct: false},
        ]
    }, 
    {
        question: "How many cats does Taylor Swift have?", 
        answers: [
            {text: 'Three', correct: true},
            {text: 'Four', correct: false},
            {text: 'One', correct: false},
            {text: 'Two', correct: false},
        ]
    },
    {
        question: "What is the name of Swift's third studio album?", 
        answers: [
            {text: 'Fearless', correct: false},
            {text: 'Speak Now', correct: true},
            {text: 'reputation', correct: false},
            {text: 'Red', correct: false},
        ]
    },
    {
        question: "Who is the song King Of My Heart about?", 
        answers: [
            {text: 'John Mayer', correct: false},
            {text: 'Harry Styles', correct: false},
            {text: 'Joe Jonas', correct: false},
            {text: 'Joe Alwyn', correct: true},
        ]
    },
    {
        question: "What zodiac sign is Taylor?", 
        answers: [
            {text: 'Pisces', correct: false},
            {text: 'Gemini', correct: false},
            {text: 'Sagittarius', correct: true},
            {text: 'Capricorn', correct: false},
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
    nextButton.innerHTML = 'Next';
    showQuestion();    
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectBtn.classList.add('correct');
        score++;
    } else {
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();