export class FormValidator {

  constructor(setting, formElement) {
    this._formElement = formElement;
    this._formSelector = setting.formSelector;
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
  }

  _showErrorMessage = (inputElement) => {
    const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.classList.add(this._errorClass);
    formError.textContent = inputElement.validationMessage;
  }

  _hideErrorMessage = (inputElement) => {
    const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  }

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement);
    } else{
      this._hideErrorMessage(inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButton = (inputList,buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = '';
    }
  }

  _resetForm = (inputList) => {
    inputList.forEach( (inputElement) => {
      this._hideErrorMessage(inputElement);
    })
  }

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButton(inputList,buttonElement);
    this._resetForm(inputList);

    inputList.forEach( (inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButton(inputList,buttonElement);
      });
    });

  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
