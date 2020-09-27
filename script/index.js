import {Section} from './Section.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './data.js';
import {closePopup,openPopup,popupCloseImage,popupImage} from './utils.js';

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

const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/***popup user***/
function openPopupUser() {
  popupName.value = profileName.textContent;
  popupBio.value = profileBio.textContent;
  userFormValidator.resetForm();
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
  cardFormValidador.resetForm();
  openPopup(popupCard);
}

function saveNewCard (evt) {
  evt.preventDefault();
  addCard(popupPlace.value,popupLink.value);
  closePopup(popupCard);
};

/***events***/
popupClose.addEventListener('click', () => {closePopup(popupUser);});
editButton.addEventListener('click', openPopupUser);
formElement.addEventListener('submit', saveProfile);
addButton.addEventListener('click', openPopupAddCard);
popupCloseAddCard.addEventListener('click', () => {closePopup(popupCard);});
formAddCard.addEventListener('submit', saveNewCard);
popupCloseImage.addEventListener('click', () => {closePopup(popupImage);});

function createCard(item) {
  const newCard = new Card(item,'#card-template');
  const cardElement = newCard.generateCard();
  return cardElement;
}

function addCard(cardName, cardLink) {
  const cardElement = createCard({name: cardName, link: cardLink});
  cardList.prepend(cardElement);
}

/***start***/
/*загрузка карточек*/
// initialCards.forEach( item => {
//   const cardElement = createCard(item);
//   cardList.append(cardElement);
//});

/*подключение валидации*/
const userFormValidator = new FormValidator(setting, popupUser.querySelector(setting.formSelector));
const cardFormValidador = new FormValidator(setting, popupCard.querySelector(setting.formSelector));

userFormValidator.enableValidation();
cardFormValidador.enableValidation();

const cardContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item,'#card-template');
    const cardElement = newCard.generateCard();
    cardContainer.addItem(cardElement);
    }
  },
  '.cards'
);

cardContainer.renderItems();
