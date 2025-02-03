'use strict';
// querying the DOM elements to add an event listener
const $navLinks = document.querySelector('.nav-links');
const $navElement = document.querySelectorAll('.nav-element');
const $heartIcon = document.querySelector('.heart-icon');
const $userIcon = document.querySelector('.user-icon');
if (!$navLinks) throw new Error('$navLinks query failed.');
if (!$navElement) throw new Error('$navElement query failed.');
if (!$heartIcon) throw new Error('$heartIcon query failed.');
if (!$userIcon) throw new Error('$userIcon query failed.');
// adding an eventListener to the nav-bar to update color of nav-elements
$navLinks.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.matches('.nav-element.cursor')) {
    for (let i = 0; i < $navElement.length; i++) {
      if ($eventTarget === $navElement[i]) {
        $navElement[i].classList.add('active-nav-element');
      } else {
        $navElement[i].classList.remove('active-nav-element');
        $heartIcon.classList.remove('active-icon');
      }
    }
  } else if ($eventTarget === $heartIcon) {
    $heartIcon.classList.add('active-icon');
    for (let i = 0; i < $navElement.length; i++) {
      $navElement[i].classList.remove('active-nav-element');
    }
  } else if ($eventTarget === $userIcon) {
    $heartIcon.classList.remove('active-icon');
    for (let i = 0; i < $navElement.length; i++) {
      $navElement[i].classList.remove('active-nav-element');
    }
  }
});
// defining a function for the carousel
function initializeCarousel(siteContainerSelector, centerContainerSelector) {
  const $siteContainer = document.querySelector(siteContainerSelector);
  const $centerContainer = document.querySelector(centerContainerSelector);
  const $siteCards = document.querySelectorAll('.carousel-card');
  const $centerCards = document.querySelectorAll('.carousel-center-card');
  const $sitePrevButton = $siteContainer.querySelector('#angle-left');
  const $siteNextButton = $siteContainer.querySelector('#angle-right');
  const $centerPrevButton = $centerContainer.querySelector('#angle-left2');
  const $centerNextButton = $centerContainer.querySelector('#angle-right2');
  if (!$siteContainer) throw new Error('$siteContainer query failed');
  if (!$centerContainer) throw new Error('$centerContainer query failed');
  if (!$siteCards) throw new Error('$siteCards query failed');
  if (!$centerCards) throw new Error('$centerCards query failed');
  if (!$sitePrevButton) throw new Error('$sitePrevButton query failed');
  if (!$siteNextButton) throw new Error('$siteNextButton query failed');
  if (!$centerPrevButton) throw new Error('$centerPrevButton query failed');
  if (!$centerNextButton) throw new Error('$centerNextButton query failed');
  let currentSiteIndex = 0;
  let currentCenterIndex = 0;
  let visibleCards = window.innerWidth <= 768 ? 3 : 5;
  const totalCards = $siteCards.length;
  let interval;
  function updateVisibleCards() {
    visibleCards = window.innerWidth <= 768 ? 3 : 5;
    updateCarousel(currentSiteIndex, 'site');
    updateCarousel(currentCenterIndex, 'center');
  }
  function updateCarousel(index, type) {
    if (type === 'site') {
      $siteCards.forEach((card, i) => {
        if (i >= index && i < index + visibleCards) {
          card.classList.remove('carousel-hidden');
          card.classList.remove('carousel-hidden-desktop');
        } else {
          card.classList.add('carousel-hidden');
          card.classList.add('carousel-hidden-desktop');
        }
      });
    } else {
      $centerCards.forEach((card, i) => {
        if (i >= index && i < index + visibleCards) {
          card.classList.remove('carousel-hidden');
          card.classList.remove('carousel-hidden-desktop');
        } else {
          card.classList.add('carousel-hidden');
          card.classList.add('carousel-hidden-desktop');
        }
      });
    }
  }
  function autoSlide() {
    if (interval !== undefined) clearInterval(interval);
    interval = window.setInterval(() => {
      currentSiteIndex =
        (currentSiteIndex + 1) % (totalCards - visibleCards + 1);
      currentCenterIndex =
        (currentCenterIndex + 1) % (totalCards - visibleCards + 1);
      updateCarousel(currentSiteIndex, 'site');
      updateCarousel(currentCenterIndex, 'center');
    }, 3000);
  }
  $sitePrevButton.addEventListener('click', () => {
    if (interval !== undefined) clearInterval(interval);
    currentSiteIndex = Math.max(0, currentSiteIndex - 1);
    updateCarousel(currentSiteIndex, 'site');
    autoSlide();
  });
  $siteNextButton.addEventListener('click', () => {
    if (interval !== undefined) clearInterval(interval);
    currentSiteIndex = Math.min(
      totalCards - visibleCards,
      currentSiteIndex + 1,
    );
    updateCarousel(currentSiteIndex, 'site');
    autoSlide();
  });
  $centerPrevButton.addEventListener('click', () => {
    if (interval !== undefined) clearInterval(interval);
    currentCenterIndex = Math.max(0, currentCenterIndex - 1);
    updateCarousel(currentCenterIndex, 'center');
    autoSlide();
  });
  $centerNextButton.addEventListener('click', () => {
    if (interval !== undefined) clearInterval(interval);
    currentCenterIndex = Math.min(
      totalCards - visibleCards,
      currentCenterIndex + 1,
    );
    updateCarousel(currentCenterIndex, 'center');
    autoSlide();
  });
  window.addEventListener('resize', updateVisibleCards);
  updateVisibleCards();
  autoSlide();
}
initializeCarousel('#dive-sites-carousel', '#dive-centers-carousel'); // calling the carousel function
