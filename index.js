const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextbtn = document.querySelector(".next-btn");
const scoreCard = document.querySelector(".scorecard");
const alert = document.querySelector(".alert");
const playbtn = document.querySelector(".play-btn");
const timer = document.querySelector(".timer");

//Question,Choices,Answer array
const quiz = [
  {
    question: "Q.1 What does HTML stand for?",
    choices: [
      "A.Hyper Text Multi Language",
      "B.Hyper Text Multiple Language",
      "C.Hyper Text Markup Language",
      "D.Home Text Multi Language",
    ],
    answer: "C.Hyper Text Markup Language",
  },
  {
    question: "Q.2 What does CSS stand for?",
    choices: [
      "A.Cascading style Sheet",
      "B.Cute style Sheet",
      "C.Computer style Sheet",
      "D.Codehal style Sheet",
    ],
    answer: "A.Cascading style Sheet",
  },
  {
    question: "Q.3 What does PHP stand for?",
    choices: [
      "A.Hypertext Programming",
      "B.Hypertext Preprocessor",
      "C.Hypertext Preprogramming",
      "D.Programming Hypertext Preprocessor ",
    ],
    answer: "B.Hypertext Preprocessor",
  },
  {
    question: "Q.4 What does SQL stand for?",
    choices: [
      "A.Strength Query Language",
      "B.Stylesheet Query Language",
      "C.Science Question Language",
      "D.Structured Query Language",
    ],
    answer: "D.Structured Query Language",
  },
  {
    question: "Q.5 What does XML stand for?",
    choices: [
      "A.Excellent Multiple Language",
      "B.Explore Multiple Language",
      "C.Extensible Markup Language",
      "D.Extra Markup Language",
    ],
    answer: "C.Extensible Markup Language",
  },
];

//Variable
let questionIndex = 0;
let score = 0;
let timeleft = 30;
let timerId = null;

//Function to show questions
const showQuestions = () => {
  const questionDetails = quiz[questionIndex];
  questionBox.textContent = questionDetails.question;
  choicesBox.textContent = "";
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const currentDiv = document.createElement("div");
    currentDiv.textContent = currentChoice;
    currentDiv.classList.add("choicediv");
    choicesBox.appendChild(currentDiv);

    currentDiv.addEventListener("click", () => {
      if (currentDiv.classList.contains("selected")) {
        currentDiv.classList.remove("selected");
      } else {
        currentDiv.classList.add("selected");
      }
    });
  }
};

// Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".selected");
  if (selectedChoice.textContent == quiz[questionIndex].answer) {
    displayAlert("Your Answer Is Correct!!");
    score++;
  } else {
    displayAlert(
      `Your Answer Is Incorrect!! Correct Answer:${quiz[questionIndex].answer}`
    );
  }
  questionIndex++;
  if (questionIndex < quiz.length) {
    showQuestions();
  } else {
    showScore();
  }
};

//Function to show score
const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  nextbtn.style.display = "none";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  displayAlert("You Have Successfully Completed The Quiz.Congrats!!");
  stopTimer();
  playbtn.style.display = "block";
  timer.style.display = "none";
};

//Function to show alert
const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

// Function to show timeleft
const startTimer = () => {
  timerId = setInterval(() => {
    timeleft--;
    timer.textContent = timeleft;
    if (timeleft == 0) {
      const confirmUser = confirm("Time Up!Do you want to play again?");
      if (confirmUser) {
        timeleft = 30;
        questionIndex = 0;
        showQuestions();
      } else {
        showScore();
      }
    }
  }, 1000);
};

//Function to stop timer
const stopTimer = () => {
  clearInterval(timerId);
};

showQuestions();
startTimer();

nextbtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".selected");
  if (!selectedChoice && nextbtn.textContent === "Next") {
    displayAlert("Select Your Answer");
  } else {
    checkAnswer();
  }
});
