'use strict';
// query the DOM element to add an event listener
const $navLinks = document.querySelector('.nav-links');
const $navElement = document.querySelectorAll('.nav-element');
const $view = document.querySelectorAll('.view');
const $heartIcon = document.querySelector('.heart-icon');
const $userIcon = document.querySelector('.user-icon');
if (!$navLinks) throw new Error('$navLinks query failed.');
if (!$navElement || !$view)
  throw new Error('$navElement or $view query failed.');
if (!$heartIcon || !$userIcon)
  throw new Error('$heartIcon or $userIcon query failed.');
// add an eventListener to the nav-bar
$navLinks.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  swapView($eventTarget);
});
// Define a function to swap views and update the color of nav elements
function swapView(eventTarget) {
  // to update color of nav-elements
  if (eventTarget.matches('.nav-element.cursor')) {
    for (let i = 0; i < $navElement.length; i++) {
      if (eventTarget === $navElement[i]) {
        $navElement[i].classList.add('active-nav-element');
      } else {
        $navElement[i].classList.remove('active-nav-element');
        $heartIcon?.classList.remove('active-icon');
      }
    }
  } else if (eventTarget === $heartIcon) {
    $heartIcon.classList.add('active-icon');
    for (let i = 0; i < $navElement.length; i++) {
      $navElement[i].classList.remove('active-nav-element');
    }
  } else if (eventTarget === $userIcon) {
    $heartIcon?.classList.remove('active-icon');
    for (let i = 0; i < $navElement.length; i++) {
      $navElement[i].classList.remove('active-nav-element');
    }
  }
  // to swap views
  if (eventTarget.matches('.nav-element.cursor')) {
    const $dataView = eventTarget.dataset.view;
    for (let i = 0; i < $view.length; i++) {
      if ($view[i].getAttribute('data-view') !== $dataView) {
        $view[i].classList.add('hidden');
      } else {
        $view[i].classList.remove('hidden');
      }
    }
  } else if (eventTarget === $heartIcon) {
    $heartIcon.classList.remove('hidden');
    for (let i = 0; i < $view.length; i++) {
      $view[i].classList.add('hidden');
    }
  } else if (eventTarget === $userIcon) {
    $heartIcon?.classList.remove('hidden');
    for (let i = 0; i < $view.length; i++) {
      $view[i].classList.add('hidden');
    }
  }
}
// Query for dropdown for log options
const $dropdownBtn = document.getElementById('log-options');
const $dropdownMenu = document.getElementById('dropdown');
const $toggleArrow = document.getElementById('arrow');
if (!$dropdownBtn) throw new Error('$dropdownBtn query failed');
if (!$dropdownMenu) throw new Error('$dropdownMenu query failed');
if (!$toggleArrow) throw new Error('$toggleArrow query failed');
// Query for log option views
const $addLogView = document.querySelector('.add-log-view');
const $viewLogView = document.querySelector('.view-log-view');
if (!$addLogView || !$viewLogView)
  throw new Error('$logView or $viewLogView query failed');
// Toggle dropdown function
const toggleDropdown = function () {
  $dropdownMenu.classList.toggle('show');
  $toggleArrow.classList.toggle('arrow');
};
// Toggle dropdown open/close when dropdown button is clicked
$dropdownBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleDropdown();
});
// Query log options btns
const $addLogBtn = document.getElementById('add-log');
const $viewLogBtn = document.getElementById('view-logbook');
if (!$addLogBtn || !$viewLogBtn)
  throw new Error('$addLogBtn or $viewLogBtn query failed.');
// Listen for an event on log options
$addLogBtn.addEventListener('click', () => {
  for (let i = 0; i < $navElement.length; i++) {
    $navElement[i].classList.remove('active-nav-element');
  }
  for (let i = 0; i < $view.length; i++) {
    $view[i].classList.add('hidden');
  }
  $addLogView.classList.remove('hidden');
  $diveLogForm.reset();
});
$viewLogBtn.addEventListener('click', () => {
  for (let i = 0; i < $navElement.length; i++) {
    $navElement[i].classList.remove('active-nav-element');
  }
  for (let i = 0; i < $view.length; i++) {
    $view[i].classList.add('hidden');
  }
  $viewLogView.classList.remove('hidden');
});
// Close dropdown when dom element is clicked
document.documentElement.addEventListener('click', function () {
  if ($dropdownMenu.classList.contains('show')) {
    toggleDropdown();
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
  const $tip = document.querySelector('.dive-center-tip');
  if (!$tip) throw new Error('$tip query failed.');
  $tip.classList.remove('hidden');
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
const $imgURL = document.querySelector('#img-url');
const $placeholderImg = document.querySelector('.placeholder-image');
if (!$imgURL) throw new Error('$imgURL query failed.');
if (!$placeholderImg) throw new Error('$placeholderImg query failed.');
// Add an event listener to update Photo URL
$imgURL.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  const $imgSrc = $eventTarget.value;
  $placeholderImg.setAttribute('src', $imgSrc);
});
// Query the form to access form.elements
const $diveLogForm = document.querySelector('.dive-log-form');
if (!$diveLogForm) throw new Error('$formElements query failed.');
const $formElements = $diveLogForm.elements;
// Query the container to list logs
const $entriesContainer = document.querySelector('#log-list');
if (!$entriesContainer) throw new Error('$entriesContainer query failed.');
// Add an event listener to handle submit
$diveLogForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const log = {
    'dive-number': $formElements['dive-number'].value,
    date: $formElements.date.value,
    location: $formElements.location.value,
    'site-name': $formElements['site-name'].value,
    imgURL: $formElements.imgURL.value,
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
  // adding a condition to check if it's a new entry or the user is editing an old entry
  if (data.editing === null) {
    const diveLog = renderEntry(log);
    $entriesContainer.prepend(diveLog);
    data.logs.unshift(log);
    data.nextEntryId++;
  } else {
    log.entryId = data.editing.entryId;
    // replacing the old object with the new object in the array
    for (let i = 0; i < data.logs.length; i++) {
      if (log.entryId === data.logs[i].entryId) {
        data.logs.splice(i, 1, log);
      }
    }
    // replacing the old DOM Tree with the updated DOM Tree
    const editedLogEntry = renderEntry(log);
    const $liList = document.querySelectorAll('li');
    if (!$liList) throw new Error('$liList query failed');
    for (let i = 0; i < $liList.length; i++) {
      if ($liList[i].dataset.entryId === String(log.entryId)) {
        $liList[i].replaceWith(editedLogEntry);
      }
    }
    data.editing = null;
  }
  data.nextEntryId++;
  writeData();
  toggleNoLogs();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $diveLogForm.reset();
  // Swap views on form submit
  const $homeView = document.querySelector('.home-view');
  if (!$homeView) throw new Error('$homeView query failed');
  $homeView.classList.add('hidden');
  swapLogView('viewLogView');
});
// Define a function to create a DOM Tree
function renderEntry(log) {
  const $li = document.createElement('li');
  $li.className = 'flex flex-wrap log-item';
  $li.setAttribute('data-entry-id', String(log.entryId));
  const $imgContainer = document.createElement('div');
  $imgContainer.className = 'col-full flex justify';
  const $logImg = document.createElement('img');
  $logImg.setAttribute('src', log.imgURL);
  $logImg.setAttribute('alt', 'log-img');
  $logImg.className = 'log-image';
  $imgContainer.appendChild($logImg);
  const $contentContainer = document.createElement('div');
  $contentContainer.className = 'col-full log-content';
  const $diveNumPencilContainer = document.createElement('div');
  $diveNumPencilContainer.className = 'flex num-pen-container';
  const $logDiveNum = document.createElement('p');
  $logDiveNum.className = 'log-data log-dive-number col-90';
  $logDiveNum.textContent = `DIVE NUMBER: ${log['dive-number']}`;
  const $pencilContainer = document.createElement('div');
  $pencilContainer.className = 'flex justify col-10';
  const $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pencil pencil-icon cursor';
  $pencilContainer.appendChild($pencil);
  $diveNumPencilContainer.append($logDiveNum, $pencilContainer);
  const $logDate = document.createElement('p');
  $logDate.className = 'log-data log-date';
  $logDate.textContent = `DATE: ${log.date}`;
  const $logLocation = document.createElement('p');
  $logLocation.className = 'log-data log-location';
  $logLocation.textContent = `LOCATION: ${log.location}`;
  const $logSite = document.createElement('p');
  $logSite.className = 'log-data log-site';
  $logSite.textContent = `DIVE SITE: ${log['site-name']}`;
  const $logContainerWrapper = document.createElement('div');
  $logContainerWrapper.className = 'flex log-container-wrapper';
  const $logTimeContainer = document.createElement('div');
  $logTimeContainer.className = 'col-half log-time-container';
  const $logTimeIn = document.createElement('p');
  $logTimeIn.className = 'log-data log-time-in';
  $logTimeIn.textContent = `TIME IN: ${log['time-in']}`;
  const $logTimeOut = document.createElement('p');
  $logTimeOut.className = 'log-data log-time-out';
  $logTimeOut.textContent = `TIME OUT: ${log['time-out']}`;
  const $logBottomTime = document.createElement('p');
  $logBottomTime.className = 'log-data log-bottom-time';
  $logBottomTime.textContent = `BOTTOM TIME: ${log['bottom-time']}`;
  const $logTotalTime = document.createElement('p');
  $logTotalTime.className = 'log-data log-total-time';
  $logTotalTime.textContent = `TOTAL TIME: ${log['total-time']}`;
  const $logHours = document.createElement('p');
  $logHours.className = 'log-data log-hours';
  $logHours.textContent = `TOTAL DIVE HOURS: ${log['total-hours']}`;
  $logTimeContainer.append(
    $logTimeIn,
    $logTimeOut,
    $logBottomTime,
    $logTotalTime,
    $logHours,
  );
  const $logMiscContainer = document.createElement('div');
  $logMiscContainer.className = 'col-half log-misc-container';
  const $logDepth = document.createElement('p');
  $logDepth.className = 'log-data log-depth';
  $logDepth.textContent = `MAX-DEPTH: ${log['max-depth']}`;
  const $logVisibility = document.createElement('p');
  $logVisibility.className = 'log-data log-visibility';
  $logVisibility.textContent = `VISIBILITY: ${log.visibility}`;
  const $logAirIn = document.createElement('p');
  $logAirIn.className = 'log-data log-air-in';
  $logAirIn.textContent = `AIR IN: ${log['air-in']}`;
  const $logAirOut = document.createElement('p');
  $logAirOut.className = 'log-data log-air-out';
  $logAirOut.textContent = `AIR OUT: ${log['air-out']}`;
  const $logWeights = document.createElement('p');
  $logWeights.className = 'log-data log-weights';
  $logWeights.textContent = `WEIGHTS: ${log.weights}`;
  $logMiscContainer.append(
    $logDepth,
    $logVisibility,
    $logAirIn,
    $logAirOut,
    $logWeights,
  );
  $logContainerWrapper.append($logTimeContainer, $logMiscContainer);
  const $logNotes = document.createElement('p');
  $logNotes.className = 'log-data log-notes';
  $logNotes.textContent = log.notes;
  $contentContainer.append(
    $diveNumPencilContainer,
    $logDate,
    $logLocation,
    $logSite,
    $logContainerWrapper,
    $logNotes,
  );
  $li.append($imgContainer, $contentContainer);
  return $li;
}
// Adding an event listener to update the entries
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.logs.length; i++) {
    const $entry = renderEntry(data.logs[i]);
    $entriesContainer.append($entry);
  }
  // viewSwap(data.view);
  toggleNoLogs();
});
function swapLogView(view) {
  if (view === 'addLogView') {
    $addLogView?.classList.remove('hidden');
    $viewLogView?.classList.add('hidden');
    addSaveBtnToggle('add');
  } else if (view === 'viewLogView') {
    $viewLogView?.classList.remove('hidden');
    $addLogView?.classList.add('hidden');
  }
}
// Define a function to hide no-record message
function toggleNoLogs() {
  const $noLogs = document.querySelector('.no-record-container');
  if (!$noLogs) throw new Error('$noEntries query failed.');
  if (data.logs.length !== 0) {
    $noLogs.classList.add('hidden');
  } else {
    $noLogs.classList.remove('hidden');
  }
}
const $newLogBtn = document.querySelector('.new-log-btn');
if (!$newLogBtn) throw new Error('$newBtn query failed.');
$newLogBtn.addEventListener('click', () => {
  $diveLogForm.reset();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapLogView('addLogView');
  addSaveBtnToggle('add');
});
const $deleteLogBtn = document.querySelector('.delete-log-btn');
if (!$deleteLogBtn) throw new Error('$deleteLogBtn query failed.');
// Adding an event listener to the <ul> -> pencil-icon with event delegation
$entriesContainer.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.classList.contains('pencil-icon')) {
    return;
  }
  swapLogView('addLogView');
  const $listItem = $eventTarget.closest('li');
  const $itemID = Number($listItem?.dataset.entryId);
  for (let i = 0; i < data.logs.length; i++) {
    if (data.logs[i].entryId === $itemID) {
      data.editing = data.logs[i];
    }
  }
  if (data.editing) {
    $formElements['dive-number'].value = data.editing['dive-number'];
    $formElements.date.value = data.editing.date;
    $formElements.location.value = data.editing.location;
    $formElements['site-name'].value = data.editing['site-name'];
    $formElements.imgURL.value = data.editing.imgURL;
    $formElements['time-in'].value = data.editing['time-in'];
    $formElements['time-out'].value = data.editing['time-out'];
    $formElements['bottom-time'].value = data.editing['bottom-time'];
    $formElements['total-time'].value = data.editing['total-time'];
    $formElements['total-hours'].value = data.editing['total-hours'];
    $formElements['max-depth'].value = data.editing['max-depth'];
    $formElements['air-in'].value = data.editing['air-in'];
    $formElements['air-out'].value = data.editing['air-out'];
    $formElements.visibility.value = data.editing.visibility;
    $formElements.weights.value = data.editing.weights;
    $formElements.notes.value = data.editing.notes;
    $placeholderImg.setAttribute('src', data.editing.imgURL);
    addSaveBtnToggle('save');
    $deleteLogBtn.classList.remove('hidden');
    const $logBtnContainer = document.querySelector('.log-btn-container');
    if (!$logBtnContainer) throw new Error('$logBtnContainer query failed.');
    $logBtnContainer.classList.replace('justify', 'btn-space');
  }
});
function addSaveBtnToggle(btnValue) {
  const $saveLogBtn = document.querySelector('.add-log-btn');
  if (!$saveLogBtn) throw new Error('$saveLogBtn query failed.');
  if (btnValue === 'add') {
    $saveLogBtn.setAttribute('value', 'Add');
  } else if (btnValue === 'save') {
    $saveLogBtn.setAttribute('value', 'Save');
  }
}
$deleteLogBtn.addEventListener('click', () => {
  if (data.editing) {
    const $li = document.querySelectorAll('li');
    for (let i = 0; i < $li.length; i++) {
      if ($li[i].dataset.entryId === String(data.editing.entryId)) {
        $li[i].remove();
      }
    }
    for (let i = 0; i < data.logs.length; i++) {
      if (data.logs[i].entryId === data.editing.entryId) {
        data.logs.splice(i, 1);
      }
    }
  }
  writeData();
  toggleNoLogs();
  swapLogView('viewLogView');
});
