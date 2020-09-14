import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './data.js';

/*popup user*/
const popupUser = document.querySelector('.popup_type_user');
const popupName = popupUser.querySelector('.popup__input_type_name');
const popupBio = popupUser.querySelector('.popup__input_type_bio');
/**button**/
const popupClose = popupUser.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const formElement = popupUser.querySelector('.popup__form');
/*profile*/
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileBio = profile.querySelector('.profile__bio');
/*popup cards*/
const cardList = document.querySelector('.cards');
const popupCard = document.querySelector('.popup_type_card');
const popupPlace = popupCard.querySelector('.popup__input_type_place');
const popupLink = popupCard.querySelector('.popup__input_type_link');
/**button**/
const addButton = document.querySelector('.profile__add-button');
const popupCloseAddCard = popupCard.querySelector('.popup__close');
const formAddCard = popupCard.querySelector('.popup__form');
/*popup image*/
const popupImage = document.querySelector('.popup_type_image');
const popupImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
/**button**/
const popupCloseImage = popupImage.querySelector('.popup__close');
/****/
const popupList = document.querySelectorAll('.popup');

const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/***открытие-закрытие модальных окон***/
function openPopup(modal) {
  setListenerPopup(modal);
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  removeListenerPopup(modal);
}

/*закрытие по клику мимо и esc*/
function setListenerPopup(popupItem) {
  popupItem.addEventListener('click', closeByClickOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closeByClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/* при открытии попапа убираем сообщения об ошибках*/
function checkPopupValid(modal) {
  const formElement = modal.querySelector(setting.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  inputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(setting.inputErrorClass);
    formError.classList.remove(setting.errorClass);
    formError.textContent = '';
  });
}

/*удаление обработчиков окна*/
function removeListenerPopup(popupItem){
  popupItem.removeEventListener('click', closeByClickOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

/***popup user***/
function openPopupUser() {
  popupName.value = profileName.textContent;
  popupBio.value = profileBio.textContent;
  checkPopupValid(popupUser);
  openPopup(popupUser);
}

function saveProfile (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileBio.textContent = popupBio.value;
  closePopup(popupUser);
}

function openPopupAddCard() {
  popupPlace.value = '';
  popupLink.value = '';
  checkPopupValid(popupCard);
  openPopup(popupCard);
}

function saveNewCard (evt) {
  evt.preventDefault();
  addCard(popupPlace.value,popupLink.value);
  closePopup(popupCard);
};

/***popup image***/
export function openPopupImage(cardName, cardLink) {
  popupImg.src = cardLink;
  popupImg.alt = cardName;

  popupCaption.textContent = cardName;

  openPopup(popupImage);
}

/***events***/
popupClose.addEventListener('click', () => {closePopup(popupUser);});
editButton.addEventListener('click', openPopupUser);
formElement.addEventListener('submit', saveProfile);
addButton.addEventListener('click', openPopupAddCard);
popupCloseAddCard.addEventListener('click', () => {closePopup(popupCard);});
formAddCard.addEventListener('submit', saveNewCard);
popupCloseImage.addEventListener('click', () => {closePopup(popupImage);});


function renderInitialCards() {
  initialCards.forEach( item => {
    const newCard = new Card(item,'#card-template');
    const cardElement = newCard.generateCard();
    cardList.append(cardElement);
  });
}

function addCard(cardName, cardLink) {
  const newCard = new Card({name: cardName, link: cardLink},'#card-template');
  const cardElement = newCard.generateCard();
  cardList.prepend(cardElement);
}

function initialValidator() {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    const newForm = new FormValidator(setting, formElement);
    newForm.enableValidation();
  });
}

/***start***/
renderInitialCards();
initialValidator();
