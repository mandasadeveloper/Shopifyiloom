let buttons = document.querySelectorAll('[data-gtag-manager]');

// Function to set a cookie with a given name, value, and expiration date
const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
};

// Function to hide all buttons
const hideAllButtons = () => {
  buttons.forEach(button => {
    button.style.display = 'none';
  });
};

// Function to show all buttons
const showAllButtons = () => {
  buttons.forEach(button => {
    button.style.display = ''; // Set display to default (e.g., 'block' or 'inline')
  });
};

// Function to handle button click event
const handleButtonClick = event => {
  const button = event.target;
  const existingArray = JSON.parse(getCookie('productArray')) || [];
  const productId = button.getAttribute('data-product-id');

  const index = existingArray.findIndex(product => product.productId === productId);

  if (index === -1) {
    existingArray.push({ productId });
    setCookie('productArray', JSON.stringify(existingArray), 30);

    button.classList.add('active');
    button.innerText = '完全的';

    buttons.forEach(btn => {
      if (btn.dataset.productId == productId) {
        btn.classList.add('active');
        btn.innerText = '完全的';
      }
    });
  }
};

// Function to get the value of a cookie by name
const getCookie = name => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

// Function to initialize the buttons on page load
const initializeButtons = () => {
  hideAllButtons();

  const existingArray = JSON.parse(getCookie('productArray')) || [];

  existingArray.forEach(product => {
    const productId = product.productId;
    buttons.forEach(button => {
      if (button.dataset.productId == productId) {
        button.classList.add('active');
        button.innerText = '完全的';
        button.style.display = ''; // Set display to default (e.g., 'block' or 'inline')
      }
    });
  });

  showAllButtons();
};

const selectAllButtons = () => {
  const updatedButtons = document.querySelectorAll('[data-gtag-manager]');
  buttons = Array.from(updatedButtons);
  observer.disconnect();

  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
};

const observerCallback = () => {
  selectAllButtons();
  initializeButtons();
  observer.observe(document.body, observerConfig);
};

const observerConfig = { childList: true, subtree: true };
const observer = new MutationObserver(observerCallback);

initializeButtons();

// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

observer.observe(document.body, observerConfig);
