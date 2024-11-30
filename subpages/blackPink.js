const totalQuestions = 10;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let answers = Array(totalQuestions).fill(null);
let score = 0;
let slideIndex = 0;

const questions = [
    { question: "Who is the leader of BLACKPINK?", answers: ["Jennie", "Jisoo", "Lisa", "Rosé"], correct: "Jisoo" },
    { question: "Which year did BLACKPINK debut?", answers: ["2016", "2015", "2017", "2018"], correct: "2016" },
    { question: "What is BLACKPINK's fandom called?", answers: ["Blink", "Army", "Once", "Reveluv"], correct: "Blink" },
    { question: "Which BLACKPINK song has the most YouTube views?", answers: ["DDU-DU DDU-DU", "Kill This Love", "How You Like That", "Boombayah"], correct: "DDU-DU DDU-DU" },
    { question: "Who is the main dancer of BLACKPINK?", answers: ["Lisa", "Jennie", "Jisoo", "Rosé"], correct: "Lisa" },
    { question: "Which song marked BLACKPINK's debut?", answers: ["Boombayah", "Whistle", "Playing with Fire", "Stay"], correct: "Boombayah" },
    { question: "Which member is known as the 'Golden Maknae'?", answers: ["Lisa", "Jennie", "Jisoo", "Rosé"], correct: "Lisa" },
    { question: "Which BLACKPINK song featured Selena Gomez?", answers: ["Ice Cream", "Lovesick Girls", "Pretty Savage", "Kill This Love"], correct: "Ice Cream" },
    { question: "What does 'BLACKPINK' stand for?", answers: ["Beauty and Strength", "Class and Elegance", "Black and Pink", "Bold and Pretty"], correct: "Beauty and Strength" },
    { question: "Which BLACKPINK member was the last to join?", answers: ["Lisa", "Jennie", "Jisoo", "Rosé"], correct: "Rosé" },
    { question: "Who is the lead rapper of BLACKPINK?", answers: ["Jennie", "Lisa", "Jisoo", "Rosé"], correct: "Jennie" },
    { question: "Which member is known for her deep voice?", answers: ["Jisoo", "Jennie", "Lisa", "Rosé"], correct: "Jisoo" },
    { question: "Which member is called the 'Human Chanel'?", answers: ["Jennie", "Jisoo", "Lisa", "Rosé"], correct: "Jennie" },
    { question: "Which song won BLACKPINK their first music show award?", answers: ["Whistle", "Boombayah", "Kill This Love", "Playing with Fire"], correct: "Whistle" },
    { question: "Which BLACKPINK album was the first to hit #1 on the Billboard 200?", answers: ["THE ALBUM", "Square Up", "Kill This Love", "Blackpink In Your Area"], correct: "THE ALBUM" },
    { question: "Which member often says 'I love you' in multiple languages?", answers: ["Lisa", "Rosé", "Jisoo", "Jennie"], correct: "Lisa" },
    { question: "Which song did BLACKPINK perform at Coachella?", answers: ["Kill This Love", "How You Like That", "DDU-DU DDU-DU", "Whistle"], correct: "Kill This Love" },
    { question: "Which BLACKPINK member is from Australia?", answers: ["Rosé", "Jennie", "Jisoo", "Lisa"], correct: "Rosé" },
    { question: "Who is known as the 'Queen of Dance' in BLACKPINK?", answers: ["Lisa", "Jisoo", "Jennie", "Rosé"], correct: "Lisa" },
    { question: "Which song did BLACKPINK collaborate with Lady Gaga?", answers: ["Sour Candy", "Ice Cream", "Bet You Wanna", "Love to Hate Me"], correct: "Sour Candy" }
];

function showSlides() {
  const slides = document.querySelectorAll('.slides');
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? 'block' : 'none';
  });
  slideIndex = (slideIndex + 1) % slides.length; 
  setTimeout(showSlides, 2000); 
}

function selectRandomQuestions() {
  selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
  console.log("Selected Questions:", selectedQuestions);
  }

function generateQuestionNav() {
  const questionNav = document.getElementById('question-nav');
  questionNav.innerHTML = '';
  for (let i = 0; i < totalQuestions; i++) {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-secondary', 'mb-2');
      button.innerText = answers[i] ? `${i + 1} ✔️` : i + 1;
      button.style.color = answers[i] ? 'green' : '';
      button.addEventListener('click', () => navigateToQuestion(i));
      questionNav.appendChild(button);
  }
  }

function updateLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('btsLeaderboard')) || [];
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

function checkForSavedSession() {
  return localStorage.getItem('btsAnswers') !== null;
  }

function startNewQuiz() {
  localStorage.removeItem('btsAnswers');
  localStorage.removeItem('btsCurrentIndex');
  answers = Array(totalQuestions).fill(null);
  currentQuestionIndex = 0;
  score = 0;
  hideControls();
  startQuiz();
  }

function hideControls() {
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('start-new-btn').style.display = 'none';
  document.getElementById('resume-quiz-btn').style.display = 'none';
  document.getElementById('leave-quiz-btn').style.display = 'block';
  document.getElementById('quiz-section').style.display = 'block';
  }  

function resumeQuiz() {
  const savedAnswers = JSON.parse(localStorage.getItem('btsAnswers'));
  const savedIndex = parseInt(localStorage.getItem('btsCurrentIndex'), 10);
  const savedQuestions = JSON.parse(localStorage.getItem('btsSelectedQuestions'));
  if (savedAnswers && !isNaN(savedIndex) && savedQuestions) {
      answers = savedAnswers;
      currentQuestionIndex = savedIndex;
      selectedQuestions = savedQuestions;

      hideControls();
      generateQuestionNav(); 
      showQuestion();
  } else {
      alert("No previous progress found.");
      document.getElementById('resume-quiz-btn').style.display = 'none';
  }
  }

function saveProgress() {
  localStorage.setItem('btsAnswers', JSON.stringify(answers));
  localStorage.setItem('btsCurrentIndex', currentQuestionIndex);
  localStorage.setItem('btsSelectedQuestions', JSON.stringify(selectedQuestions));
  }

function leaveQuiz() {
  if (confirm("Do you want to save your progress?")) {
    saveProgress();
    alert("Progress saved. You can resume later.");
  } else {
    localStorage.removeItem('btsAnswers');
    localStorage.removeItem('btsCurrentIndex');
    localStorage.removeItem('btsSelectedQuestions');
  }
  window.location.href = "bts.html";
  }

function startQuiz() {
  selectRandomQuestions();
  generateQuestionNav();
  showQuestion();
  }
function showQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  document.getElementById('question-text').innerText = currentQuestion.question;
  const answerButtons = document.getElementById('answer-buttons');
  answerButtons.innerHTML = '';
  currentQuestion.answers.forEach((answer) => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('btn', 'btn-outline-primary', 'my-1');
      if (answers[currentQuestionIndex] === answer) {
          button.classList.add('selected-answer');
      }
      button.addEventListener('click', () => saveAnswer(answer, button));
      answerButtons.appendChild(button);
  });
  document.getElementById('answer-status').innerText = answers[currentQuestionIndex] ? "Answer Saved" : "";
  generateQuestionNav(); 
  saveProgress(); 
  }

function saveAnswer(answer, selectedButton) {
  answers[currentQuestionIndex] = answer;
  document.querySelectorAll('#answer-buttons button').forEach(btn => btn.classList.remove('selected-answer'));
  selectedButton.classList.add('selected-answer');
  document.getElementById('answer-status').innerText = "Answer Saved";
  generateQuestionNav(); 
  saveProgress(); 
  }

function submitQuiz() {
  score = answers.filter((ans, i) => ans === selectedQuestions[i].correct).length;
  const leaderboard = JSON.parse(localStorage.getItem('btsLeaderboard')) || [];
  if (leaderboard.length < 3 || score > leaderboard[2].score) {
      const playerName = prompt("You're in the top 3! Enter your name:");
      if (playerName) {
          leaderboard.push({ name: playerName, score });
          leaderboard.sort((a, b) => b.score - a.score);
          localStorage.setItem('btsLeaderboard', JSON.stringify(leaderboard.slice(0, 3)));
      }
  }
  localStorage.removeItem('btsAnswers');
  localStorage.removeItem('btsCurrentIndex');
  localStorage.removeItem('btsSelectedQuestions');
  alert(`Quiz completed! Your score: ${score} / ${totalQuestions}. Returning to the main page.`);
  window.location.href = "bts.html";
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
window.addEventListener('DOMContentLoaded', () => {
  updateLeaderboard();
  document.getElementById('resume-quiz-btn').style.display = checkForSavedSession() ? 'block' : 'none';
  document.getElementById('start-new-btn').addEventListener('click', startNewQuiz);
  document.getElementById('resume-quiz-btn').addEventListener('click', resumeQuiz);
  document.getElementById('leave-quiz-btn').addEventListener('click', leaveQuiz);
  document.getElementById('submit-btn').addEventListener('click', submitQuiz);
  showSlides();
});