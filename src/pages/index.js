import './index.css';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  initialCards,
  cardContainerSelector,
  setting,
  userNameSelector,
  userBioSelector,
  popupImageSelector,
  popupUserInfoSelector,
  popupAddCardSelector
} from '../utils/data.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

const popupUser = document.querySelector('.popup_type_user');
const popupCard = document.querySelector('.popup_type_card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

/*подключение валидации*/
const userFormValidator = new FormValidator(setting, popupUser.querySelector(setting.formSelector));
const cardFormValidador = new FormValidator(setting, popupCard.querySelector(setting.formSelector));

userFormValidator.enableValidation();
cardFormValidador.enableValidation();

/* генерация карточек */
function createCard(nameValue, linkValue) {
  const item = {name: nameValue, link: linkValue};
  const newCard = new Card({
    data: item,
    handleCardClick: (item) => {
      popupImage.open(item);
    }
  },'#card-template');
  const cardElement = newCard.generateCard();
  return cardElement;
}

const cardContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardContainer.addItem(cardElement);
    }
  },
  cardContainerSelector
);

cardContainer.renderItems();

/* профиль */
const userInfo = new UserInfo(userNameSelector, userBioSelector);
const popupUserInfo = new PopupWithForm(
  {
    popupSelector: popupUserInfoSelector,
    submitForm: (data) => {
      userInfo.setUserInfo(data);
      popupUserInfo.close();
    }
  }
);
popupUserInfo.setEventListeners();
editButton.addEventListener('click', () => {
  popupUserInfo.open(userInfo.getUserInfo());
  userFormValidator.resetForm();
});

/* добавление карточки */
const popupAddCard = new PopupWithForm(
  {
    popupSelector: popupAddCardSelector,
    submitForm: (item) => {
      const cardElement = createCard(item.place,item.link);
      cardContainer.addItem(cardElement,false);
      popupAddCard.close();
    }
  }
);
popupAddCard.setEventListeners();
addButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidador.resetForm();
});

/* картинка */
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


