// getting input fields & from by ID
const form = document.getElementById('form');
const cardHolderNameInput = document.getElementById('holder-name-input');
const cardNoInput = document.getElementById('card-no-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const cvcInput = document.getElementById('cvc-input');

const successPage = document.getElementById('thankyou');

// getting divs for filling card
const cardHolderName = document.getElementById('card-holder-name');
const cardNumber = document.getElementById('card-number');
const cardMonth = document.getElementById('month');
const cardYear = document.getElementById('year');
const cardCVC = document.getElementById('cvc');

// Patterns
const namePattern = /^[a-zA-Z\s]*$/g;
const cardNoPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const monthPattern = /(^[1-9]$)|(^[0-1][1-2]$)|(^0[1-9]$)/;
const yearPattern = /^[0-9]{2}$/;
const cvcPattern = /^[0-9]{3}$/;

let successFlag = false;

// Listener for filling out card
document.addEventListener('input', handleFillCard);

// Form submit listner
form.addEventListener('submit', handleSubmitForm);

// Handle Card fill
function handleFillCard(e) {
  let name = 'Jane Appleseed';
  let number = '0000 0000 0000 0000';
  let month = '00';
  let year = '00';
  let cvc = '000';

  switch (e.target.name) {
    case 'holder-name-input':
      fillCard(e.target.value, cardHolderName, name);
      break;
    case 'card-no-input':
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

// Handle Form submit
function handleSubmitForm(e) {
  e.preventDefault();

  if (cardHolderNameInput.value === '') {
    showError(cardHolderNameInput, "Can't be blank");
  } else {
    handleValidateForm();
  }

  if (cardNoInput.value === '') {
    showError(cardNoInput, "Can't be blank");
  } else {
    handleValidateForm();
  }

  if (monthInput.value === '') {
    showError(monthInput, "Can't be blank");
    showError(yearInput, "Can't be blank");
  } else if (monthInput.value.length > 0) {
    handleValidateForm();

    if (yearInput.value === '') {
      showError(yearInput, "Can't be blank");
    } else {
      handleValidateForm();
    }
  }

  if (cvcInput.value === '') {
    showError(cvcInput, "Can't be blank");
  } else {
    handleValidateForm();
  }
}

// Form Validator
function handleValidateForm() {
  const isNameValidated = validate(cardHolderNameInput, namePattern);
  const isCardNoValidate = validate(cardNoInput, cardNoPattern);
  const isMonthValidated = validate(monthInput, monthPattern);
  const isYearValidated = validate(yearInput, yearPattern);
  const isCVCValidated = validate(cvcInput, cvcPattern);

  validateField(
    cardHolderNameInput,
    isNameValidated,
    'Wrong format, Letters only'
  );
  validateField(cardNoInput, isCardNoValidate, 'Wrong format for Card Number');
  if (isMonthValidated) {
    showSuccess(monthInput);
    validateField(yearInput, isYearValidated, 'Wrong format for year');
  } else {
    showError(monthInput, 'Wrong format for month');
    successFlag = false;
  }
  validateField(cvcInput, isCVCValidated, 'Wrong format for CVC');

  if (successFlag) {
    document.getElementById('form-section').classList.add('hidden');
    successPage.classList.add('show-success-page');
  }
}

// Helper Functions
function fillCard(targetValue, targetDiv, defaultValue) {
  if (targetValue === '') {
    targetDiv.innerText = defaultValue;
  } else {
    targetDiv.innerText = targetValue;
  }
}

function showError(input, message = 'Error! Something went wrong') {
  let parentElem = input.parentElement;

  if (input.name === 'month-input' || input.name === 'year-input') {
    parentElem = input.parentElement.parentElement;
  }

  const error = parentElem.querySelector('.error');
  input.classList.add('error-border');
  error.innerText = message;
  error.className = 'error show-error';
}

function showSuccess(input) {
  let parentElem = input.parentElement;

  if (input.name === 'month-input' || input.name === 'year-input') {
    parentElem = input.parentElement.parentElement;
  }

  const error = parentElem.querySelector('.error');
  error.classList.remove('show-error');
  input.classList.remove('error-border');
}

function validate(input, pattern) {
  if (input.value.match(pattern)) return true;
  else return false;
}

function validateField(input, validatedField, error) {
  if (validatedField) {
    showSuccess(input);
    successFlag = true;
  } else {
    showError(input, error);
    successFlag = false;
  }
}
