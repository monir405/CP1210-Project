const totalQuestions = 10;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let answers = Array(totalQuestions).fill(null);
let score = 0;
let slideIndex = 0;

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