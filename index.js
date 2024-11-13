// index.js

// Function to load the selected band's quiz page in a new tab
function loadBandQuiz(band) {
    // Display an alert for user feedback
    
  
    // Open the corresponding band page in a new tab
    const quizUrl = `subpages/${band}.html`;
    window.open(quizUrl, '_blank');
  }
  
  // Function to handle smooth scrolling to the band selection section
  function scrollToBands() {
    const bandSelection = document.getElementById('band-selection');
    bandSelection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Function to dynamically update the carousel captions with fun facts
  function updateCarouselCaptions() {
    const carouselCaptions = [
      {
        band: "BTS",
        message: "Did you know? BTS was the first K-pop group to perform at the Grammys!"
      },
      {
        band: "BLACKPINK",
        message: "Fun Fact: BLACKPINK was the first K-pop girl group to perform at Coachella."
      },
      {
        band: "TWICE",
        message: "Did you know? TWICE has won over 100 music awards since their debut."
      },
      {
        band: "ENHYPEN",
        message: "Fun Fact: ENHYPEN was formed through the survival show 'I-LAND'."
      }
    ];
  
    // Iterate through each caption in the carousel
    document.querySelectorAll('.carousel-caption').forEach((caption, index) => {
      caption.querySelector('p').textContent = carouselCaptions[index].message;
    });
  }
  
  // Initialize the event listeners for band selection
  function initializeEventListeners() {
    document.getElementById('bts-img').addEventListener('click', () => loadBandQuiz('bts'));
    document.getElementById('blackpink-img').addEventListener('click', () => loadBandQuiz('blackpink'));
    document.getElementById('twice-img').addEventListener('click', () => loadBandQuiz('twice'));
    document.getElementById('enhypen-img').addEventListener('click', () => loadBandQuiz('enhypen'));
  }
  
  // Run the initialization functions when the DOM content is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateCarouselCaptions();
  });
  