const totalQuestions = 10;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let answers = Array(totalQuestions).fill(null);
let score = 0;

// List of 20 Twice questions
const questions = [
    { question: "Who is the leader of TWICE?", answers: ["Nayeon", "Jeongyeon", "Jihyo", "Sana"], correct: "Jihyo" },
    { question: "Which year did TWICE debut?", answers: ["2015", "2014", "2016", "2013"], correct: "2015" },
    { question: "What is TWICE's fandom called?", answers: ["Once", "Blink", "Army", "Buddy"], correct: "Once" },
    { question: "Which TWICE song has the most YouTube views?", answers: ["TT", "Fancy", "Cheer Up", "Like OOH-AHH"], correct: "TT" },
    { question: "Who is the main dancer of TWICE?", answers: ["Momo", "Jihyo", "Mina", "Sana"], correct: "Momo" },
    { question: "Which song marked TWICE's debut?", answers: ["Like OOH-AHH", "Cheer Up", "Knock Knock", "Likey"], correct: "Like OOH-AHH" },
    { question: "Which member is known as the 'Fake Maknae'?", answers: ["Nayeon", "Momo", "Chaeyoung", "Dahyun"], correct: "Nayeon" },
    { question: "Which TWICE song features the lyrics 'Shy shy shy'?", answers: ["Cheer Up", "Fancy", "What is Love?", "Feel Special"], correct: "Cheer Up" },
    { question: "Who is the main vocalist of TWICE?", answers: ["Jihyo", "Nayeon", "Jeongyeon", "Mina"], correct: "Jihyo" },
    { question: "Which member was added through the reality show 'Sixteen'?", answers: ["Tzuyu", "Jihyo", "Momo", "Dahyun"], correct: "Tzuyu" },
    { question: "Which TWICE album includes the song 'Likey'?", answers: ["Twicetagram", "Fancy You", "Eyes Wide Open", "What is Love?"], correct: "Twicetagram" },
    { question: "Who is the youngest member (Maknae) of TWICE?", answers: ["Tzuyu", "Mina", "Chaeyoung", "Sana"], correct: "Tzuyu" },
    { question: "Which TWICE member is known for her unique rap style?", answers: ["Dahyun", "Chaeyoung", "Jeongyeon", "Momo"], correct: "Chaeyoung" },
    { question: "Which TWICE song was their first to achieve a Perfect All-Kill?", answers: ["Knock Knock", "Cheer Up", "Fancy", "What is Love?"], correct: "Cheer Up" },
    { question: "Who is known as the 'Eagle Eyes' in TWICE?", answers: ["Tzuyu", "Nayeon", "Mina", "Jeongyeon"], correct: "Tzuyu" },
    { question: "Which member of TWICE is from Taiwan?", answers: ["Tzuyu", "Mina", "Jihyo", "Chaeyoung"], correct: "Tzuyu" },
    { question: "Which song's music video features TWICE as princesses and fairytale characters?", answers: ["What is Love?", "Feel Special", "I Can't Stop Me", "Fancy"], correct: "What is Love?" },
    { question: "Which member is known for her 'Dubu' (Tofu) nickname?", answers: ["Dahyun", "Nayeon", "Jeongyeon", "Sana"], correct: "Dahyun" },
    { question: "What is the title of TWICE's first Japanese single?", answers: ["One More Time", "Candy Pop", "Breakthrough", "Fake & True"], correct: "One More Time" },
    { question: "Which TWICE song features the iconic line 'Neomuhae neomuhae'?", answers: ["TT", "Likey", "Dance the Night Away", "Yes or Yes"], correct: "TT" }
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
  const leaderboard = JSON.parse(localStorage.getItem('twiceLeaderboard')) || [];
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
  return localStorage.getItem('twiceAnswers') !== null;
}

// Function to start a new quiz
function startNewQuiz() {
    localStorage.removeItem('twiceAnswers');
    localStorage.removeItem('twiceCurrentIndex');
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
    const savedAnswers = JSON.parse(localStorage.getItem('twiceAnswers'));
    const savedIndex = parseInt(localStorage.getItem('twiceCurrentIndex'), 10);
    const savedQuestions = JSON.parse(localStorage.getItem('twiceSelectedQuestions'));

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
    localStorage.setItem('twiceAnswers', JSON.stringify(answers));
    localStorage.setItem('twiceCurrentIndex', currentQuestionIndex);
    localStorage.setItem('twiceSelectedQuestions', JSON.stringify(selectedQuestions));
  }
  

function leaveQuiz() {
if (confirm("Do you want to save your progress?")) {
    saveProgress();
    alert("Progress saved. You can resume later.");
} else {
    // Clear saved progress if the user chooses not to save
    localStorage.removeItem('twiceAnswers');
    localStorage.removeItem('twiceCurrentIndex');
    localStorage.removeItem('twiceSelectedQuestions');
}
window.location.href = "twice.html";
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
    const leaderboard = JSON.parse(localStorage.getItem('twiceLeaderboard')) || [];

    // Check if the score qualifies for the top 3
    if (leaderboard.length < 3 || score > leaderboard[2].score) {
        const playerName = prompt("You're in the top 3! Enter your name:");
        if (playerName) {
            leaderboard.push({ name: playerName, score });
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem('twiceLeaderboard', JSON.stringify(leaderboard.slice(0, 3)));
        }
    }

    // Clear saved progress after submission
    localStorage.removeItem('twiceAnswers');
    localStorage.removeItem('twiceCurrentIndex');
    localStorage.removeItem('twiceSelectedQuestions');

    // Display score without any save progress prompt
    alert(`Quiz completed! Your score: ${score} / ${totalQuestions}. Returning to the main page.`);
    window.location.href = "twice.html";
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
