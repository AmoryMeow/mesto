function showErrorMessage(formElement,inputElement,setting) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  formError.classList.add(setting.errorClass);
  formError.textContent = inputElement.validationMessage;
}

function hideErrorMessage(formElement,inputElement,setting) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  formError.classList.remove(setting.errorClass);
  formError.textContent = '';
}

function isValid(formElement,inputElement,setting) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement,inputElement,setting);
  } else{
    hideErrorMessage(formElement,inputElement,setting);
  }
}

function setEventListeners(formElement,setting) {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', function(evt) {
      isValid(formElement,inputElement,setting);
    })
  });
}

function enableValidation(setting) {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement,setting);
  });
  }

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

