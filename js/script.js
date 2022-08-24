// getting input fields & from by ID
const form = document.getElementById('form');
const nameInput = document.getElementById('cardholder-input');
const cardNoInput = document.getElementById('cardNo-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const cvcInput = document.getElementById('cvc-input');

const formSubmitted = document.getElementById('submitted');

// getting divs for filling card
const cardName = document.getElementById('card-front-name');
const cardNumber = document.getElementById('card-front-number');
const cardMonth = document.getElementById('card-front-month');
const cardYear = document.getElementById('card-front-year');
const cardCVC = document.getElementById('card-back-cvc');

// Patterns
const namePattern = /^[a-zA-Z\s]*$/g;
const cardNoPattern =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const monthPattern = /(^[1-9]$)|(^[0-1][1-2]$)|(^0[1-9]$)/;
const yearPattern = /^[0-9]{2}$/;
const cvcPattern = /^[0-9]{3}$/;

// Listener for filling out card
document.addEventListener('input', handleFillCard);
// Form submit listner
form.addEventListener('submit', handleSubmitForm);

// Function to fill card values
function handleFillCard(e) {
  let name = 'Jane Appleseed';
  let number = '0000 0000 0000 0000';
  let month = '00';
  let year = '00';
  let cvc = '000';

  switch (e.target.name) {
    case 'cardholder-input':
      fillCard(e.target.value, cardName, name);
      break;
    case 'cardNo-input':
      fillCard(e.target.value, cardNumber, number);
      break;
    case 'month-input':
      fillCard(e.target.value, cardMonth, month);
      break;
    case 'year-input':
      fillCard(e.target.value, cardYear, year);
      break;
    case 'cvc-input':
      fillCard(e.target.value, cardCVC, cvc);
      break;
    default:
      alert('Something went wrong');
  }
}

// Function to handle the form Submission
function handleSubmitForm(e) {
  e.preventDefault();

  const isNameValidated = validate(nameInput, namePattern);
  const isCardNoValidate = validate(cardNoInput, cardNoPattern);
  const isMonthValidated = validate(monthInput, monthPattern);
  const isYearValidated = validate(yearInput, yearPattern);
  const isCVCValidated = validate(cvcInput, cvcPattern);

  if (nameInput.value == '') {
    showError(nameInput, "Can't be blank");
  } else if (!isNameValidated) {
    showError(nameInput, 'Wrong format, Letters only');
  } else {
    showSuccess(nameInput);
  }

  if (cardNoInput.value == '') {
    showError(cardNoInput, "Can't be blank");
  } else if (!isCardNoValidate) {
    showError(cardNoInput, 'Wrong format for Card Number');
  } else {
    showSuccess(cardNoInput);
  }

  if (monthInput.value == '' && yearInput.value == '') {
    showError(monthInput, "Can't be blank");
    showError(yearInput, "Can't be blank");
  } else if (monthInput.value && yearInput.value == '') {
    showError(yearInput, "Can't be blank");
  } else if (monthInput.value == '' && yearInput.value) {
    showError(monthInput, "Can't be blank");
  } else if (monthInput.value && yearInput.value) {
    if (!isMonthValidated && !isYearValidated) {
      showError(monthInput, 'Wrong format for month');
      showError(yearInput, 'Wrong format for year');
    } else if (!isMonthValidated && isYearValidated) {
      showError(yearInput, 'Wrong format for month');
    } else if (isMonthValidated && !isYearValidated) {
      showError(monthInput, 'Wrong format for year');
    } else {
      showSuccess(monthInput);
      showSuccess(yearInput);
    }
  }

  if (cvcInput.value == '') {
    showError(cvcInput, "Can't be blank");
  } else if (!isCVCValidated) {
    showError(cvcInput, 'Wrong format for CVC');
  } else {
    showSuccess(cvcInput);
  }

  if (
    isNameValidated &&
    isCardNoValidate &&
    isMonthValidated &&
    isYearValidated &&
    isCVCValidated
  ) {
    document.getElementById('form').classList.add('hidden');
    formSubmitted.classList.add('show-success-page');
  }
}

// Helper Functions
function fillCard(targetValue, targetDiv, defaultValue) {
  if (targetValue == '') targetDiv.innerText = defaultValue;
  else targetDiv.innerText = targetValue;
}

function showError(input, message = 'Error! Something went wrong') {
  let parentElem = input.parentElement;

  if (input.name == 'month-input' || input.name == 'year-input') {
    parentElem = input.parentElement.parentElement;
  }

  const error = parentElem.querySelector('.error');
  input.classList.add('error-border');
  error.innerText = message;
  error.className = 'error visible-error';
}

function showSuccess(input) {
  let parentElem = input.parentElement;

  if (input.name == 'month-input' || input.name == 'year-input') {
    parentElem = input.parentElement.parentElement;
  }

  const error = parentElem.querySelector('.error');
  error.classList.remove('visible-error');
  input.classList.remove('error-border');
}

function validate(input, pattern) {
  if (input.name == 'holder-name-input' && input.value == '') {
    showError(input, "Can't be blank");
  } else {
    if (input.value.match(pattern)) return true;
    else return false;
  }
}

function successContinue() {
  location.href = '/';
}
