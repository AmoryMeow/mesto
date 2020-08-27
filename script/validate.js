const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

function hasInvalidInput(inputList) {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButton(inputList,buttonElement,inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(formElement,setting) {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButton(inputList,buttonElement, setting.inactiveButtonClass);

  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', function(evt) {
      isValid(formElement,inputElement,setting);
      toggleButton(inputList,buttonElement, setting.inactiveButtonClass);
    });
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

function checkPopupValid(modal) {
  const formElement = modal.querySelector(setting.formSelector);
  if (formElement != null) {
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);

    toggleButton(inputList,buttonElement,setting.inactiveButtonClass);
  }
}

enableValidation(setting);


