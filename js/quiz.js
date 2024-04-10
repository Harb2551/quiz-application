let quizData = [
    {
        question: "What is the capital of Italy?",
        options: ["Berlin","Madrid","Paris","Rome"],
        answer: "Rome"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus","Mars","Jupiter","Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest Mammal in the World?",
        options: ["Elephant","Blue Whale","Giraffe","Hippopotamous"],
        answer: "Blue Whale"
    },
    {
        question: "In which year did Christopher Columbus reach the Americas?",
        options: ["1492","1520","1607","1620"],
        answer: "1492"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens","William Shakespeare","Jane Austen","Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest ocean in the World?",
        options: ["Atlantic Ocean","Indian Ocean","Southern Ocean","Pacific Ocean"],
        answer: "Pacific Ocean"
    }
]

let currentQuestionIndex = -1;
let userAnswers = [];
let timer;
let timeLeft = 59;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click",loadNextQuestion);
submitButton.addEventListener("click",showQuizResults);

loadNextQuestion();

function updateTimer(){
    if(timeLeft>0){
        const seconds = timeLeft;
        const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

        timerDisplay.textContent = `${displaySeconds}`;
        timeLeft--;
    }
    else{
        clearInterval(timer);
        timerDisplay.textContent = "0";
        showQuizResults();
    }
}

function startTimer(){
    updateTimer();
    timer = setInterval(updateTimer,1000);
}

function loadNextQuestion(){
    clearInterval(timer);
    if(currentQuestionIndex < quizData.length - 1){
        currentQuestionIndex++;
        displayQuestion();
        startTimer();
    }
    else{
        clearInterval(timer);
        timerDisplay.textContent = "!!!";
        showQuizResults();
    }
}

function displayQuestion(){
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    const optionLetters = ["A","B","C","D"];

    currentQuestion.options.forEach((option,index)=>{
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("quiz-card");

        const optionLabel = document.createElement("span");
        optionLabel.textContent = optionLetters[index];
        optionLabel.classList.add("option-label");
        optionContainer.appendChild(optionLabel);

        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("quiz-option");
        optionButton.setAttribute("data-option",option);
        optionButton.addEventListener("click",() => selectAnswer(option));
        optionContainer.appendChild(optionButton);

        optionsContainer.appendChild(optionContainer);
    });
}

function selectAnswer(answer){
    const optionButtons = document.querySelectorAll(".quiz-option");
    optionButtons.forEach((button)=> button.classList.remove("selected"));
    
    const selectedOption = optionsContainer.querySelector(
        `.quiz-option[data-option="${answer}"]`
    );
    selectedOption.classList.add("selected");
    userAnswers[currentQuestionIndex] = answer;
}

function evaluateUserAnswers(){
    let score = 0;
    quizData.forEach((question,index)=>{
        if(userAnswers[index] === question.answer){
            score += 10;
        }
    });
    return score;
}

function showQuizResults(){
    clearInterval(timer);
    const userScore = evaluateUserAnswers();
    scoreContainer.textContent = `Your Score: ${userScore} out of ${quizData.length*10}`;
}