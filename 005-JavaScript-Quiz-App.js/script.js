const questionBox = document.querySelector(".question-box");
const quizSection = document.querySelector(".quiz-section");
const finishSection = document.querySelector(".finishe-quiz-box");
const answersBox = document.querySelector(".answers");
const questionNum = document.querySelector(".question-num");
const questionText = document.querySelector(".question-text");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const currentQuestionFromAll = document.querySelector(
  ".currentQuestionFromAll"
);
const warningMessage = document.querySelector(".warningMessageForSelectAnswer");
const questionCircles = document.querySelector(".question-circles");
const finalScore = document.querySelector(".quiz-finish-content strong");
const correctScore =document.querySelector(".correct")
const incorrectScore =document.querySelector(".incorrect")
const reviewButton = document.querySelector(".review-btn");

let jsQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswers = [];

let answeredQuestions = [];
let correctAnswered = 0;
let wrongAnswer = 0;
let wrongQuestions = [];


function getRandomQuestions(questions, numberOfQuestions) {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfQuestions);
}


function loadQuestions() {
  fetch("./questions.json")
    .then((response) => response.json())
    .then((data) => {
      jsQuestions = getRandomQuestions(data, 20);

      console.log(jsQuestions);
      displayQuestion();
      displayQuestionCircles();
    })
    .catch((error) => console.error("Error loading questions:", error));
}

function displayQuestion() {
  const question = jsQuestions[currentQuestionIndex];
  let totalQuestions = jsQuestions.length;
  questionNum.textContent = `Question ${currentQuestionIndex + 1}`;
  questionText.textContent = question.question;

  currentQuestionFromAll.textContent = `Question ${
    currentQuestionIndex + 1
  } / ${totalQuestions}`;

  answersBox.innerHTML = "";
  question.answers.forEach((answer, userSelectIndex) => {
    const li = document.createElement("li");
    li.classList.add("answer");
    li.textContent = answer;
    li.onclick = () => selectAnswer(userSelectIndex);
    if (selectedAnswers[currentQuestionIndex] === userSelectIndex) {
      li.classList.add("selected");
    }
    answersBox.appendChild(li);
  });

  updateQuestionCircles();
}

function selectAnswer(userSelectIndex) {

    const previousAnswer = selectedAnswers[currentQuestionIndex];
    if (previousAnswer !== undefined && previousAnswer === userSelectIndex) {
        return;
    }

    if (previousAnswer !== undefined) {

      if (previousAnswer === jsQuestions[currentQuestionIndex].correct && userSelectIndex !== jsQuestions[currentQuestionIndex].correct) {
        correctAnswered--;
      }

      else if (previousAnswer !== jsQuestions[currentQuestionIndex].correct && userSelectIndex === jsQuestions[currentQuestionIndex].correct) {
        wrongAnswer--;

      }
    }

  selectedAnswers[currentQuestionIndex] = userSelectIndex;

  if (!answeredQuestions.includes(currentQuestionIndex)) {
    answeredQuestions.push(currentQuestionIndex);
    warningMessage.style.display = "none";
  }
  checkCorrectAnswered(userSelectIndex);
  displayQuestion();
}

function nextQuestion() {
  if (selectedAnswers[currentQuestionIndex] !== undefined) {
    currentQuestionIndex++;
    if (currentQuestionIndex < jsQuestions.length) {
      displayQuestion();
    } else {
      quizSection.style.display = "none";
      finishSection.style.display = "block";
    }
  } else {
    warningMessage.style.display = "block";
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

prevButton.addEventListener("click", prevQuestion);
nextButton.addEventListener("click", nextQuestion);

// console.log(currentQuestionIndex);

// currentQuestionFromAll.textContent = `Question ${currentQuestionIndex} /${totalQuestions}`;

function displayQuestionCircles() {
    let totalQuestions = jsQuestions.length;

  questionCircles.innerHTML = "";

  for (let i = 0; i < totalQuestions; i++) {
    let circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = i + 1;
    questionCircles.appendChild(circle);
  }
}
function updateQuestionCircles() {
  let circles = questionCircles.querySelectorAll(".circle");
  circles.forEach((circle, index) => {
    circle.classList.remove("answered", "current");

    if (answeredQuestions.includes(index)) {
      circle.classList.add("answered");
    }

    if (index === currentQuestionIndex) {
      circle.classList.add("current");
    }
  });
}

function checkCorrectAnswered(userSelectIndex) {
    let qus = jsQuestions
  let question = jsQuestions[currentQuestionIndex];
  let totalQuestions =jsQuestions.length

  console.log("Index:", question.id);
  console.log("User Selected Index:", userSelectIndex);
  console.log("Correct Answer Index:", question.correct);

  if (userSelectIndex === question.correct) {
    correctAnswered++;
  }else{
    wrongAnswer++;
    wrongQuestions.push({
        questionNumber: currentQuestionIndex + 1,
        correctAnswer: question.correct,
      });
  }
  console.log("Correct Answers So Far:", correctAnswered);
  console.log("Wrong Answers So Far:", wrongAnswer);

  let yourScore = (correctAnswered / totalQuestions) * 100;
console.log(yourScore);


  if (totalQuestions > 0) {
    finalScore.textContent = Math.floor(yourScore) + "%";
  } else {
    finalScore.textContent = "0%";
  }


  correctScore.textContent = correctAnswered;
  incorrectScore.textContent = wrongAnswer;

}

function reviewQuiz() {

    const reviewContainer = document.querySelector(".review-container");
    reviewContainer.innerHTML = "";
    reviewContainer.style.visibility = "visible";

    if (wrongQuestions.length === 0) {
      reviewContainer.innerHTML = "<p>All questions have been answered correctly!👏🏻😎</p>";
    } else {
      wrongQuestions.forEach((wrongQuestion) => {
        const questionIndex = wrongQuestion.questionNumber - 1;
        const correctAnswer = jsQuestions[questionIndex].answers[jsQuestions[questionIndex].correct];
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `
          <p>${wrongQuestion.questionNumber} : ${jsQuestions[questionIndex].question}</p>
          <p class="aswr"> ${correctAnswer}</p>
        `;
        reviewContainer.appendChild(reviewItem);
      });
    }
  }

  reviewButton.addEventListener("click", reviewQuiz);

loadQuestions();
