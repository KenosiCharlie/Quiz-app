const questions = [
    {
        question: "What does AI stand for?",
        answers: [
            {text: "Artificial Insight", correct: false},
            {text: "Artificial Intelligence", correct: true},
            {text: "Artificial Induction", correct: false},
            {text: "Advanced Integration", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a subset of AI?",
        answers: [
            {text: "Natural Language Processing", correct: false},
            {text: "Augmented Reality", correct: true},
            {text: "Robotics", correct: false},
            {text: "Machine Learning", correct: false},
        ]
    },
    {
        question: "What is the Turing Test used for in AI?",
        answers: [
            {text: "To measure the memory capacity of AI systems.", correct: false},
            {text: "To evaluate the energy efficiency of AI hardware.", correct: false},
            {text: "To test the speed of AI algorithms.", correct: false},
            {text: "To assess a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human.", correct: true},
        ]
    },
    {
        question: "Which programming language is commonly used in AI development?",
        answers: [
            {text: "Python", correct: true},
            {text: "C++", correct: false},
            {text: "Java", correct: false},
            {text: "Ruby", correct: false},
        ]
    },
    {
        question: "What type of learning does a neural network use to improve its performance?",
        answers: [
            {text: "Reinforcement Learning", correct: false},
            {text: "Supervised Learning", correct: false},
            {text: "Unsupervised Learning", correct: false},
            {text: "All of the above", correct: true},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
    // Remove event listener for "Try Again" button
    nextButton.removeEventListener("click", startQuiz);
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(correct){
    const buttons = answerButtons.querySelectorAll("button");
    const correctAnswerText = questions[currentQuestionIndex].answers.find(ans => ans.correct).text;
    buttons.forEach(button => {
        button.disabled = true; // Disable all buttons after selecting an answer
        if (button.textContent === correctAnswerText) {
            button.classList.add("correct");
        } else if (!correct) {
            button.classList.add("wrong");
        }
    });

    if(correct){
        score++;
    }
    nextButton.style.display = "block"; // Always display the 'Next' button after selecting an answer
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // Display the score
        questionElement.innerHTML = `Quiz Ended! Your Score: ${score} out of ${questions.length}`;
        // display the 'Try Again' button
        nextButton.innerHTML = "Try again";
        nextButton.style.display = "block";
        // Change the event listener to start the quiz again
        nextButton.addEventListener("click", startQuiz);
        // Clear answer buttons
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
});

startQuiz();