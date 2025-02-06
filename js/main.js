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
// Modal
const $modalView = document.querySelector('.modal-view');
const $dialog = document.querySelector('dialog');
const $openModal = document.querySelector('#open-modal');
const $closeModal = document.querySelector('#close-modal-icon');
const $addLog = document.querySelector('#add-log');
const $addLogView = document.querySelector('.add-log-view');
const $viewLog = document.querySelector('#view-log');
const $viewLogView = document.querySelector('.view-log-view');
const $editLog = document.querySelector('#edit-log');
const $editLogView = document.querySelector('.edit-log-view');
if (!$modalView) throw new Error('$modalView query failed.');
if (!$dialog) throw new Error('$dialog query failed.');
if (!$openModal) throw new Error('$openModal query failed.');
if (!$closeModal) throw new Error('$closeModal query failed.');
if (!$addLog) throw new Error('$addLog query failed.');
if (!$addLogView) throw new Error('$logView query failed');
if (!$viewLog) throw new Error('$viewLog query failed.');
if (!$viewLogView) throw new Error('$viewLogView query failed.');
if (!$editLog) throw new Error('$editLog query failed.');
if (!$editLogView) throw new Error('$editLogView query failed.');
$openModal.addEventListener('click', () => {
  $dialog.showModal();
});
$closeModal.addEventListener('click', () => {
  $dialog.close();
});
$addLog.addEventListener('click', () => {
  $modalView.classList.add('hidden');
  $addLogView.classList.remove('hidden');
  $dialog.close();
});
$viewLog.addEventListener('click', () => {
  $modalView.classList.add('hidden');
  $viewLogView.classList.remove('hidden');
  $dialog.close();
});
$editLog.addEventListener('click', () => {
  $modalView.classList.add('hidden');
  $editLogView.classList.remove('hidden');
  $dialog.close();
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
    if (country === 'default') {
      const $placeholderRow = document.createElement('tr');
      const $placeholderText = document.createElement('td');
      $placeholderText.setAttribute('colspan', '4');
      $placeholderText.className = 'table-placeholder';
      $placeholderText.textContent =
        'Select a country to view Dive Sites Information';
      $placeholderRow.appendChild($placeholderText);
      $siteTbody.appendChild($placeholderRow);
    }
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
      $tdSiteName.className = 'site-tbody-data border-left';
      const $tdOcean = document.createElement('td');
      $tdOcean.textContent = diveSites.ocean;
      $tdOcean.className = 'site-tbody-data';
      const $tdLocation = document.createElement('td');
      $tdLocation.textContent = diveSites.location;
      $tdLocation.className = 'site-tbody-data';
      const $tdRegion = document.createElement('td');
      $tdRegion.textContent = diveSites.region;
      $tdRegion.className = 'site-tbody-data border-right';
      if (i === lastIndex - 1) {
        $tdSiteName.classList.add('border-bottom');
        $tdOcean.classList.add('border-bottom');
        $tdLocation.classList.add('border-bottom');
        $tdRegion.classList.add('border-bottom');
      }
      $tr.append($tdSiteName, $tdOcean, $tdLocation, $tdRegion);
      $siteTbody.appendChild($tr);
    }
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error(error);
  }
  // Define parameters for Dive Centers fetch request
  const urlDiveCenters = `https://world-dive-centres-api.p.rapidapi.com/divecentres?query=${country}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a94ad0ffc1msha4f057f28cdacdap142d8cjsnb40cd9745386',
      'x-rapidapi-host': 'world-dive-centres-api.p.rapidapi.com',
    },
  };
  try {
    // Initiate a fetch request and await its response
    const centersFetch = await fetch(urlDiveCenters, options);
    // Ensure the response status indicates success
    if (!centersFetch.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${centersFetch.status}`);
    }
    // Await the parsing of the response body as JSON
    const result = await centersFetch.json();
    // Access Dive Site data
    const diveCentersData = result.data;
    // Query the center-table-body to append DOM tree
    const $centerTbody = document.querySelector('.center-tbody');
    if (!$centerTbody) throw new Error('$siteTbody query failed');
    $centerTbody.textContent = '';
    if (country === 'default') {
      const $placeholderRow = document.createElement('tr');
      const $placeholderText = document.createElement('td');
      $placeholderText.setAttribute('colspan', '3');
      $placeholderText.className = 'table-placeholder';
      $placeholderText.textContent =
        'Select a country to view Dive Sites Information';
      $placeholderRow.appendChild($placeholderText);
      $centerTbody.appendChild($placeholderRow);
    }
    // Access the first 10 or the total dive sites (whichever is lower)
    const lastIndex = diveCentersData.length > 10 ? 10 : diveCentersData.length;
    for (let i = 0; i < lastIndex; i++) {
      const diveCenters = {
        name: diveCentersData[i].name,
        location: diveCentersData[i].location,
        type: diveCentersData[i].type,
      };
      // Create the DOM tree to successfully handle and output the object
      const $tr = document.createElement('tr');
      const $tdCenterName = document.createElement('td');
      $tdCenterName.textContent = diveCenters.name;
      $tdCenterName.className = 'center-tbody-data border-left';
      const $tdLocation = document.createElement('td');
      $tdLocation.textContent = diveCenters.location;
      $tdLocation.className = 'center-tbody-data';
      const $tdType = document.createElement('td');
      $tdType.textContent = diveCenters.type;
      $tdType.className = 'center-tbody-data border-right';
      if (i === lastIndex - 1) {
        $tdCenterName.classList.add('border-bottom');
        $tdLocation.classList.add('border-bottom');
        $tdType.classList.add('border-bottom');
      }
      $tr.append($tdCenterName, $tdLocation, $tdType);
      $centerTbody.appendChild($tr);
    }
  } catch (error) {
    console.error(error);
  }
  // Define parameters for Geocode fetch request
  const apiKeyGeocode = 'AIzaSyB6fiptPxdTsjan6PcC1eWu2bWnHOjenKk';
  const urlGeocode = 'https://maps.googleapis.com/maps/api/geocode/json';
  try {
    // Query the center-table-body to append DOM tree
    const $weatherTbody = document.querySelector('.weather-tbody');
    if (!$weatherTbody) throw new Error('$weatherTbody query failed');
    $weatherTbody.textContent = '';
    if (country === 'default') {
      const $placeholderRow = document.createElement('tr');
      const $placeholderText = document.createElement('td');
      $placeholderText.setAttribute('colspan', '7');
      $placeholderText.className = 'table-placeholder';
      $placeholderText.textContent =
        'Select a country to view Dive Sites Information';
      $placeholderRow.appendChild($placeholderText);
      $weatherTbody.appendChild($placeholderRow);
    }
    // Initiate a fetch request and await its response
    const locationFetch = await fetch(
      `${urlGeocode}?address=${country}&key=${apiKeyGeocode}`,
    );
    // Ensure the response status indicates success
    if (!locationFetch.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${locationFetch.status}`);
    }
    // Await the parsing of the response body as JSON
    const locationResult = await locationFetch.json();
    const geoLocation = locationResult.results[0].geometry.location;
    const lat = geoLocation.lat;
    const lng = geoLocation.lng;
    // Define parameter for Weather fetch request
    const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto&forecast_days=16`;
    // Initiate a fetch request and await its response
    const weatherFetch = await fetch(urlWeather);
    // Ensure the response status indicates success
    if (!weatherFetch.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${weatherFetch.status}`);
    }
    // Await the parsing of the response body as JSON
    const result = await weatherFetch.json();
    // Access Weather data
    const weatherData = result.daily;
    const date = weatherData.time;
    const minTemp = weatherData.temperature_2m_min;
    const maxTemp = weatherData.temperature_2m_max;
    const uvIndex = weatherData.uv_index_max;
    const precipitation = weatherData.precipitation_sum;
    const windSpeed = weatherData.wind_speed_10m_max;
    const windGusts = weatherData.wind_gusts_10m_max;
    const weather = {
      date,
      minTemp,
      maxTemp,
      uvIndex,
      precipitation,
      windSpeed,
      windGusts,
    };
    // Successfully handle and output the object
    // Create the HTML for the weather.date
    for (let i = 0; i < weather.date.length; i++) {
      const $trWeather = document.createElement('tr');
      $trWeather.className = 'tr-weather';
      const $tdDate = document.createElement('td');
      $tdDate.className = 'weather-tbody-data border-left';
      $tdDate.textContent = weather.date[i];
      if (i === weather.date.length - 1) {
        $tdDate.classList.add('border-bottom');
      }
      $trWeather.appendChild($tdDate);
      $weatherTbody.appendChild($trWeather);
    }
    // Query the rows to append data
    const $trWeatherRow = document.querySelectorAll('.tr-weather');
    if (!$trWeatherRow) throw new Error('$trWeatherRow query failed');
    // Create the HTML for the weather.minTemp
    for (let i = 0; i < weather.minTemp.length; i++) {
      const $tdMinTemp = document.createElement('td');
      $tdMinTemp.className = 'weather-tbody-data';
      $tdMinTemp.textContent = String(weather.minTemp[i]);
      if (i === weather.minTemp.length - 1) {
        $tdMinTemp.classList.add('border-bottom');
      }
      $trWeatherRow[i].appendChild($tdMinTemp);
    }
    // Create the HTML for the weather.maxTemp
    for (let i = 0; i < weather.maxTemp.length; i++) {
      const $tdMaxTemp = document.createElement('td');
      $tdMaxTemp.className = 'weather-tbody-data';
      $tdMaxTemp.textContent = String(weather.maxTemp[i]);
      if (i === weather.maxTemp.length - 1) {
        $tdMaxTemp.classList.add('border-bottom');
      }
      $trWeatherRow[i].appendChild($tdMaxTemp);
    }
    // Create the HTML for the weather.uvIndex
    for (let i = 0; i < weather.uvIndex.length; i++) {
      const $tdUVindex = document.createElement('td');
      $tdUVindex.className = 'weather-tbody-data';
      $tdUVindex.textContent = String(weather.uvIndex[i]);
      if (i === weather.uvIndex.length - 1) {
        $tdUVindex.classList.add('border-bottom');
      }
      $trWeatherRow[i].appendChild($tdUVindex);
    }
    // Create the HTML for the weather.precipitation
    for (let i = 0; i < weather.precipitation.length; i++) {
      const $tdPrecipitation = document.createElement('td');
      $tdPrecipitation.className = 'weather-tbody-data';
      $tdPrecipitation.textContent = String(weather.precipitation[i]);
      if (i === weather.uvIndex.length - 1) {
        $tdPrecipitation.classList.add('border-bottom');
      }
      $trWeatherRow[i].appendChild($tdPrecipitation);
    }
    // Create the HTML for the weather.windSpeed
    for (let i = 0; i < weather.windSpeed.length; i++) {
      const $tdWindSpeed = document.createElement('td');
      $tdWindSpeed.className = 'weather-tbody-data';
      $tdWindSpeed.textContent = String(weather.windSpeed[i]);
      if (i === weather.uvIndex.length - 1) {
        $tdWindSpeed.classList.add('border-bottom');
      }
      $trWeatherRow[i].appendChild($tdWindSpeed);
    }
    // Create the HTML for the weather.windGusts
    for (let i = 0; i < weather.windGusts.length; i++) {
      const $tdWindGusts = document.createElement('td');
      $tdWindGusts.className = 'weather-tbody-data border-right';
      $tdWindGusts.textContent = String(weather.windGusts[i]);
      if (i === weather.uvIndex.length - 1) {
        $tdWindGusts.classList.add('border-bottom');
      }
      $trWeatherRow[i].appendChild($tdWindGusts);
    }
  } catch (error) {
    // Log any errors that arise during the fetch operation
    console.error(error);
  }
}
// Query img and placeholder img to update src
const $imgFile = document.querySelector('#img-file');
const $placeholderImg = document.querySelector('.placeholder-image');
if (!$imgFile) throw new Error('$imgFile query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');
// Add an event listener to update Photo URL
$imgFile.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const $file = $eventTarget.files?.[0];
  if (!$file) return;
  const $imgSrc = URL.createObjectURL($file);
  $placeholderImg.setAttribute('src', $imgSrc);
});
// querying the form to access form.elements
const $diveLogForm = document.querySelector('.dive-log-form');
if (!$diveLogForm) throw new Error('$formElements query failed.');
const $formElements = $diveLogForm.elements;
// adding an event listener to handle submit
$diveLogForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const log = {
    'dive-number': $formElements['dive-number'].value,
    date: $formElements.date.value,
    location: $formElements.location.value,
    'site-name': $formElements['site-name'].value,
    'img-file': $formElements['img-file'].value,
    'time-in': $formElements['time-in'].value,
    'time-out': $formElements['time-out'].value,
    'bottom-time': $formElements['bottom-time'].value,
    'total-time': $formElements['total-time'].value,
    'total-hours': $formElements['total-hours'].value,
    'max-depth': $formElements['max-depth'].value,
    visibility: $formElements.visibility.value,
    'air-in': $formElements['air-in'].value,
    'air-out': $formElements['air-out'].value,
    weights: $formElements.weights.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.logs.unshift(log);
  writeData();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $diveLogForm.reset();
  const $homeView = document.querySelector('.home-view');
  if (!$homeView) throw new Error('$homeView query failed');
  $homeView.classList.add('hidden');
  $addLogView.classList.add('hidden');
  $viewLogView.classList.remove('hidden');
});
