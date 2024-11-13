const totalQuestions = 10;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let answers = Array(totalQuestions).fill(null);
let score = 0;

// List of 20 Enhypen questions
const questions = [
    { question: "Which year did ENHYPEN debut?", answers: ["2020", "2019", "2021", "2018"], correct: "2020" },
    { question: "What is ENHYPEN's fandom called?", answers: ["ENGENE", "MOA", "ARMY", "STAY"], correct: "ENGENE" },
    { question: "Which reality show formed ENHYPEN?", answers: ["I-LAND", "Produce 101", "Under Nineteen", "The Unit"], correct: "I-LAND" },
    { question: "What is the title of ENHYPEN's debut album?", answers: ["BORDER: DAY ONE", "DIMENSION: DILEMMA", "MANIFESTO: DAY 1", "FEVER: Part 1"], correct: "BORDER: DAY ONE" },
    { question: "Who is the leader of ENHYPEN?", answers: ["Jungwon", "Heeseung", "Sunghoon", "Jay"], correct: "Jungwon" },
    { question: "Which ENHYPEN member is known for figure skating?", answers: ["Sunghoon", "Jake", "Sunoo", "Ni-ki"], correct: "Sunghoon" },
    { question: "Which ENHYPEN song features the lyrics 'Drunk-Dazed'?", answers: ["Drunk-Dazed", "Fever", "Given-Taken", "Tamed-Dashed"], correct: "Drunk-Dazed" },
    { question: "Which member of ENHYPEN is the youngest (Maknae)?", answers: ["Ni-ki", "Jungwon", "Sunoo", "Jay"], correct: "Ni-ki" },
    { question: "Which ENHYPEN album features the song 'Fever'?", answers: ["BORDER: CARNIVAL", "BORDER: DAY ONE", "DIMENSION: ANSWER", "MANIFESTO: DAY 1"], correct: "BORDER: CARNIVAL" },
    { question: "Who is the main vocalist of ENHYPEN?", answers: ["Heeseung", "Jay", "Jungwon", "Jake"], correct: "Heeseung" },
    { question: "Which member of ENHYPEN was born in Australia?", answers: ["Jake", "Sunghoon", "Heeseung", "Sunoo"], correct: "Jake" },
    { question: "What is the title of ENHYPEN's first Japanese single?", answers: ["Forget Me Not", "Always", "Given-Taken (Japanese Version)", "Dilemma"], correct: "Forget Me Not" },
    { question: "Which ENHYPEN member is known for his dancing skills?", answers: ["Ni-ki", "Jay", "Jungwon", "Heeseung"], correct: "Ni-ki" },
    { question: "Which song by ENHYPEN has the theme of a summer sports festival?", answers: ["Tamed-Dashed", "Drunk-Dazed", "Fever", "Given-Taken"], correct: "Tamed-Dashed" },
    { question: "Which member of ENHYPEN is known for his deep voice?", answers: ["Jay", "Heeseung", "Sunghoon", "Jake"], correct: "Jay" },
    { question: "Which song marked ENHYPEN's first music show win?", answers: ["Given-Taken", "Fever", "Drunk-Dazed", "Tamed-Dashed"], correct: "Given-Taken" },
    { question: "Which ENHYPEN member is called 'Ice Prince'?", answers: ["Sunghoon", "Ni-ki", "Sunoo", "Jake"], correct: "Sunghoon" },
    { question: "Which album features the song 'Polaroid Love'?", answers: ["DIMENSION: ANSWER", "BORDER: DAY ONE", "DIMENSION: DILEMMA", "MANIFESTO: DAY 1"], correct: "DIMENSION: ANSWER" },
    { question: "Which ENHYPEN song is known for its vampire concept?", answers: ["Given-Taken", "Fever", "Drunk-Dazed", "Tamed-Dashed"], correct: "Given-Taken" },
    { question: "What is the title of ENHYPEN's official fan meeting?", answers: ["EN-CONNECT", "ENGENE ZONE", "I-LAND REUNION", "CONNECT: ENHYPEN"], correct: "EN-CONNECT" }
];

  
function selectRandomQuestions() {
    selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    console.log("Selected Questions:", selectedQuestions);
  }
// Function to generate navigation buttons for questions (1-10)
function generateQuestionNav() {
    const questionNav = document.getElementById('question-nav');
    questionNav.innerHTML = '';

    for (let i = 0; i < totalQuestions; i++) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-secondary', 'mb-2');

        // Display a tick mark if the question is answered
        button.innerText = answers[i] ? `${i + 1} ✔️` : i + 1;
        button.style.color = answers[i] ? 'green' : '';
        button.addEventListener('click', () => navigateToQuestion(i));
        questionNav.appendChild(button);
    }
}

  
  
// Function to update the leaderboard
function updateLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('enhypenLeaderboard')) || [];
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = '';

  leaderboard.slice(0, 3).forEach((entry, index) => {
    const crown = ['🥇', '🥈', '🥉'][index];
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = `${crown} ${entry.name} - ${entry.score} points`;
    leaderboardList.appendChild(listItem);
  });
}

// Function to check if a saved session exists
function checkForSavedSession() {
  return localStorage.getItem('enhypenAnswers') !== null;
}

// Function to start a new quiz
function startNewQuiz() {
    localStorage.removeItem('enhypenAnswers');
    localStorage.removeItem('enhypenCurrentIndex');
    answers = Array(totalQuestions).fill(null);
    currentQuestionIndex = 0;
    score = 0;
    hideControls();
    startQuiz();
  }
  

// Function to hide leaderboard and control buttons
function hideControls() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('start-new-btn').style.display = 'none';
    document.getElementById('resume-quiz-btn').style.display = 'none';
    document.getElementById('leave-quiz-btn').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'block';
  }  
  
  
// Function to resume a saved quiz session
function resumeQuiz() {
    const savedAnswers = JSON.parse(localStorage.getItem('enhypenAnswers'));
    const savedIndex = parseInt(localStorage.getItem('enhypenCurrentIndex'), 10);
    const savedQuestions = JSON.parse(localStorage.getItem('enhypenSelectedQuestions'));

    // Check if there's saved progress
    if (savedAnswers && !isNaN(savedIndex) && savedQuestions) {
        answers = savedAnswers;
        currentQuestionIndex = savedIndex;
        selectedQuestions = savedQuestions;

        hideControls();
        generateQuestionNav(); // Regenerate the navigation with saved answers
        showQuestion();
    } else {
        alert("No previous progress found.");
        document.getElementById('resume-quiz-btn').style.display = 'none';
    }
}

  

// Function to save progress
function saveProgress() {
    localStorage.setItem('enhypenAnswers', JSON.stringify(answers));
    localStorage.setItem('enhypenCurrentIndex', currentQuestionIndex);
    localStorage.setItem('enhypenSelectedQuestions', JSON.stringify(selectedQuestions));
  }
  

function leaveQuiz() {
if (confirm("Do you want to save your progress?")) {
    saveProgress();
    alert("Progress saved. You can resume later.");
} else {
    // Clear saved progress if the user chooses not to save
    localStorage.removeItem('enhypenAnswers');
    localStorage.removeItem('enhypenCurrentIndex');
    localStorage.removeItem('enhypenSelectedQuestions');
}
window.location.href = "enhypen.html";
}


// Function to start the quiz
function startQuiz() {
    selectRandomQuestions();
    generateQuestionNav();
    showQuestion();
  }
  

// Function to display a question
function showQuestion() {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.question;
    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn', 'btn-outline-primary', 'my-1');

        // Apply the 'selected-answer' class if the answer was previously selected
        if (answers[currentQuestionIndex] === answer) {
            button.classList.add('selected-answer');
        }

        button.addEventListener('click', () => saveAnswer(answer, button));
        answerButtons.appendChild(button);
    });

    document.getElementById('answer-status').innerText = answers[currentQuestionIndex] ? "Answer Saved" : "";
    generateQuestionNav(); // Update the side question numbers
    saveProgress(); // Save the current progress
}

  

  
  

// Function to save the selected answer
function saveAnswer(answer, selectedButton) {
    answers[currentQuestionIndex] = answer;

    // Update button styles
    document.querySelectorAll('#answer-buttons button').forEach(btn => btn.classList.remove('selected-answer'));
    selectedButton.classList.add('selected-answer');

    document.getElementById('answer-status').innerText = "Answer Saved";
    generateQuestionNav(); // Update the side question numbers
    saveProgress(); // Save the progress
}

  

// Submit the quiz
function submitQuiz() {
    score = answers.filter((ans, i) => ans === selectedQuestions[i].correct).length;
    const leaderboard = JSON.parse(localStorage.getItem('enhypenLeaderboard')) || [];

    // Check if the score qualifies for the top 3
    if (leaderboard.length < 3 || score > leaderboard[2].score) {
        const playerName = prompt("You're in the top 3! Enter your name:");
        if (playerName) {
            leaderboard.push({ name: playerName, score });
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem('enhypenLeaderboard', JSON.stringify(leaderboard.slice(0, 3)));
        }
    }

    // Clear saved progress after submission
    localStorage.removeItem('enhypenAnswers');
    localStorage.removeItem('enhypenCurrentIndex');
    localStorage.removeItem('enhypenSelectedQuestions');

    // Display score without any save progress prompt
    alert(`Quiz completed! Your score: ${score} / ${totalQuestions}. Returning to the main page.`);
    window.location.href = "enhypen.html";
}




function navigateToQuestion(index) {
    currentQuestionIndex = index;
    showQuestion();
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      showQuestion();
    }
  });
  
  
// Initialize the leaderboard and check for saved session
window.addEventListener('DOMContentLoaded', () => {
  updateLeaderboard();
  document.getElementById('resume-quiz-btn').style.display = checkForSavedSession() ? 'block' : 'none';
  document.getElementById('start-new-btn').addEventListener('click', startNewQuiz);
  document.getElementById('resume-quiz-btn').addEventListener('click', resumeQuiz);
  document.getElementById('leave-quiz-btn').addEventListener('click', leaveQuiz);
  document.getElementById('submit-btn').addEventListener('click', submitQuiz);

});
