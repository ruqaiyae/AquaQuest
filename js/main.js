'use strict';
// query the DOM elements to add an event listener
const $navLinks = document.querySelector('.nav-links');
const $navElement = document.querySelectorAll('.nav-element');
const $heartIcon = document.querySelector('.heart-icon');
const $userIcon = document.querySelector('.user-icon');
const $view = document.querySelectorAll('.view');
if (!$navLinks) throw new Error('$navLinks query failed.');
if (!$navElement) throw new Error('$navElement query failed.');
if (!$heartIcon) throw new Error('$heartIcon query failed.');
if (!$userIcon) throw new Error('$userIcon query failed.');
if (!$view) throw new Error('$view query failed.');
// add an eventListener to the nav-bar
$navLinks.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  // to update color of nav-elements
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
  // to swap views
  if ($eventTarget.matches('.nav-element.cursor')) {
    const $dataView = $eventTarget.dataset.view;
    for (let i = 0; i < $view.length; i++) {
      if ($view[i].getAttribute('data-view') !== $dataView) {
        $view[i].classList.add('hidden');
      } else {
        $view[i].classList.remove('hidden');
      }
    }
  } else if ($eventTarget === $heartIcon) {
    $heartIcon.classList.remove('hidden');
    for (let i = 0; i < $view.length; i++) {
      $view[i].classList.add('hidden');
    }
  } else if ($eventTarget === $userIcon) {
    $heartIcon.classList.remove('hidden');
    for (let i = 0; i < $view.length; i++) {
      $view[i].classList.add('hidden');
    }
  }
});
// define a function for the carousel
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
// query the form element and the select element to access user select
const $form = document.querySelector('.country-form');
const $select = document.querySelector('#country');
if (!$form) throw new Error('$form query failed');
if (!$select) throw new Error('$select query failed');
// add an event listener to form to handle submit
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedCountry = $select.value;
  // Execute the async function to perform the fetch operation
  fetchData(selectedCountry);
});
// Define an asynchronous function to fetch data
async function fetchData(country) {
  // Define parameters for Dive Sites Fetch request
  const urlDiveSites = `https://world-scuba-diving-sites-api.p.rapidapi.com/divesites?query=${country}`;
  const optionsDiveSites = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '19049dc8b8mshabc64b184d913e7p119f99jsnc1edc9cdf914',
      'x-rapidapi-host': 'world-scuba-diving-sites-api.p.rapidapi.com',
    },
  };
  try {
    // Initiate a fetch request and await its response
    const sitesFetch = await fetch(urlDiveSites, optionsDiveSites);
    // Ensure the response status indicates success
    if (!sitesFetch.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${sitesFetch.status}`);
    }
    // Await the parsing of the response body as JSON
    const result = await sitesFetch.json();
    // Access Dive Site data
    const diveSitesData = result.data;
    // Query the site-table-body to append DOM tree
    const $siteTbody = document.querySelector('.site-tbody');
    if (!$siteTbody) throw new Error('$siteTbody query failed');
    $siteTbody.textContent = '';
    // Access the first 10 or the total dive sites (whichever is lower)
    const lastIndex = diveSitesData.length > 10 ? 10 : diveSitesData.length;
    for (let i = 0; i < lastIndex; i++) {
      const diveSites = {
        name: diveSitesData[i].name,
        ocean: diveSitesData[i].ocean,
        location: diveSitesData[i].location,
        region: diveSitesData[i].region,
      };
      // Create the DOM tree to successfully handle and output the object
      const $tr = document.createElement('tr');
      const $tdSiteName = document.createElement('td');
      $tdSiteName.textContent = diveSites.name;
      $tdSiteName.className = 'site-tbody-data';
      const $tdOcean = document.createElement('td');
      $tdOcean.textContent = diveSites.ocean;
      $tdOcean.className = 'site-tbody-data';
      const $tdLocation = document.createElement('td');
      $tdLocation.textContent = diveSites.location;
      $tdLocation.className = 'site-tbody-data';
      const $tdRegion = document.createElement('td');
      $tdRegion.textContent = diveSites.region;
      $tdRegion.className = 'site-tbody-data';
      $tr.append($tdSiteName, $tdOcean, $tdLocation, $tdRegion);
      $siteTbody.appendChild($tr);
    }
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error(error);
  }
}
