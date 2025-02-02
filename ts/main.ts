// queried the DOM elements to add an event listener
const $navLinks = document.querySelector('.nav-links');
const $navElement = document.querySelectorAll('.nav-element');
const $heartIcon = document.querySelector('.heart-icon');
const $userIcon = document.querySelector('.user-icon');

if (!$navLinks) throw new Error('$navLinks query failed.');
if (!$navElement) throw new Error('$navElement query failed.');
if (!$heartIcon) throw new Error('$heartIcon query failed.');
if (!$userIcon) throw new Error('$userIcon query failed.');

// added an eventListener to the nav-bar to update color of nav-elements
$navLinks.addEventListener('click', (event) => {
  const $eventTarget = event.target as HTMLAnchorElement;
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
