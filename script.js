// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const quest = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Render questions
function renderQuestions() {
  quest.innerHTML = ""; // clear before rendering
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore previous selection from sessionStorage
      if (progress[i] === choice) {
        choiceElement.checked = true;
      }

      // Save selection to sessionStorage
      choiceElement.addEventListener("change", function () {
        progress[i] = this.value;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    quest.appendChild(questionElement);
  }
}

// Calculate score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] === questions[i].answer) {
      score++;
    }
  }
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Show stored score if available
function showStoredScore() {
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
  }
}

// Event listener for submit
submitBtn.addEventListener("click", calculateScore);

// Initial render
renderQuestions();
showStoredScore();
