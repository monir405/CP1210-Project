function loadBandQuiz(band) {
  const quizUrl = `subpages/${band}.html`;
  window.open(quizUrl, '_blank');
  }
function scrollToBands() {
  const bandSelection = document.getElementById('band-selection');
  bandSelection.scrollIntoView({ behavior: 'smooth' });
  }
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
  document.querySelectorAll('.carousel-caption').forEach((caption, index) => {
      caption.querySelector('p').textContent = carouselCaptions[index].message;
  });
  }
function initializeEventListeners() {
  document.getElementById('bts-img').addEventListener('click', () => loadBandQuiz('bts'));
  document.getElementById('blackpink-img').addEventListener('click', () => loadBandQuiz('blackpink'));
  document.getElementById('twice-img').addEventListener('click', () => loadBandQuiz('twice'));
  document.getElementById('enhypen-img').addEventListener('click', () => loadBandQuiz('enhypen'));
  }
function enableSpotifyAutoplay() {
  const spotifyIframe = document.getElementById('spotify-player');
  if (spotifyIframe) {
      let iframeSrc = spotifyIframe.src;
      if (!iframeSrc.includes("?autoplay=1")) {
          iframeSrc += "?autoplay=1";
          spotifyIframe.src = iframeSrc;
      }
      document.body.addEventListener('click', () => {
          spotifyIframe.src = iframeSrc; 
      }, { once: true });
  }
  }
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  updateCarouselCaptions();
  enableSpotifyAutoplay(); 
  });
