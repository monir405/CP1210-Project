const totalQuestions = 10;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let answers = Array(totalQuestions).fill(null);
let score = 0;
let slideIndex = 0;
let slideTimer;

const questions = [
  { question: "Who is the leader of BTS?", answers: ["RM", "Jin", "Suga", "J-Hope"], correct: "RM" },
  { question: "Which year did BTS debut?", answers: ["2013", "2012", "2014", "2015"], correct: "2013" },
  { question: "What is BTS' fandom called?", answers: ["Army", "Blink", "Once", "Stay"], correct: "Army" },
  { question: "Which album features the song 'Dynamite'?", answers: ["BE", "Map of the Soul: 7", "Love Yourself", "Wings"], correct: "BE" },
  { question: "Who is the eldest member of BTS?", answers: ["Jin", "Suga", "Jungkook", "V"], correct: "Jin" },
  { question: "Which member is known as the 'Golden Maknae'?", answers: ["Jungkook", "V", "Jimin", "J-Hope"], correct: "Jungkook" },
  { question: "What was BTS' first English single?", answers: ["Dynamite", "Butter", "Life Goes On", "Permission to Dance"], correct: "Dynamite" },
  { question: "Which BTS member is known for his cooking skills?", answers: ["Jin", "RM", "Suga", "Jimin"], correct: "Jin" },
  { question: "Which song brought BTS international fame?", answers: ["DNA", "Fire", "I Need U", "Blood Sweat & Tears"], correct: "DNA" },
  { question: "What does BTS stand for?", answers: ["Bangtan Sonyeondan", "Behind the Scenes", "Big Time Stars", "Beyond the Scene"], correct: "Bangtan Sonyeondan" },
  { question: "Which member was the last to join BTS?", answers: ["Jimin", "V", "Jungkook", "Suga"], correct: "Jimin" },
  { question: "Which BTS song has the most YouTube views?", answers: ["Dynamite", "Boy With Luv", "Fake Love", "Butter"], correct: "Dynamite" },
  { question: "Which member is known for his deep voice?", answers: ["V", "Jin", "Suga", "J-Hope"], correct: "V" },
  { question: "Which member is called the 'Sunshine'?", answers: ["J-Hope", "RM", "Jin", "V"], correct: "J-Hope" },
  { question: "What is the title of BTS' debut song?", answers: ["No More Dream", "We Are Bulletproof", "N.O", "Run"], correct: "No More Dream" },
  { question: "Which member is the main dancer?", answers: ["J-Hope", "Jimin", "V", "RM"], correct: "J-Hope" },
  { question: "Which song won BTS their first Daesang?", answers: ["I Need U", "Blood Sweat & Tears", "Fire", "Spring Day"], correct: "I Need U" },
  { question: "Which BTS album was the first to hit #1 on the Billboard 200?", answers: ["Love Yourself: Tear", "Map of the Soul: Persona", "Wings", "BE"], correct: "Love Yourself: Tear" },
  { question: "Which member often says 'I purple you'?", answers: ["V", "Jungkook", "Suga", "RM"], correct: "V" },
  { question: "Which member is known for his high notes?", answers: ["Jimin", "Jin", "V", "J-Hope"], correct: "Jimin" }
  ];

function showSlides() {
  const slides = document.querySelectorAll('.slides');
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? 'block' : 'none';
  });
  slideIndex = (slideIndex + 1) % slides.length; 
  slideTimer = setTimeout(showSlides, 2000);
}

function stopSlides() {
  clearTimeout(slideTimer); 
  const slides = document.querySelectorAll('.slides');
  slides.forEach(slide => {
    slide.style.display = 'none'; 
  });
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
      if (answers[i]) {
        button.classList.add('answered'); 
      }      
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
  stopSlides();
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
  stopSlides();
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