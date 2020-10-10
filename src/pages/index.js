import './index.css';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  //initialCards,
  cardContainerSelector,
  setting,
  userNameSelector,
  userBioSelector,
  avatarSelector,
  popupImageSelector,
  popupUserInfoSelector,
  popupAddCardSelector,
  popupUserAvatarSelector,
  token
} from '../utils/data.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';

const popupUser = document.querySelector('.popup_type_user');
const popupCard = document.querySelector('.popup_type_card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar');

/*подключение валидации*/
const userFormValidator = new FormValidator(setting, popupUser.querySelector(setting.formSelector));
const cardFormValidador = new FormValidator(setting, popupCard.querySelector(setting.formSelector));
const userAvatarFormValidador = new FormValidator(setting, popupAvatar.querySelector(setting.formSelector));

userFormValidator.enableValidation();
cardFormValidador.enableValidation();
userAvatarFormValidador.enableValidation();

/*api*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

/* профиль */
const userInfo = new UserInfo(userNameSelector, userBioSelector, avatarSelector);
api.getProfile().then((profile) => {
  userInfo.setUserInfo(profile);
});
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
popupUserInfo.setEventListeners();

const popupUserAvatar = new PopupWithForm(
  {
    popupSelector: popupUserAvatarSelector,
    submitForm: (data) => {
      console.log(data);
    }
  }
);
editAvatarButton.addEventListener('click', () => {
  popupUserAvatar.open();
  userAvatarFormValidador.resetForm();
});
popupUserAvatar.setEventListeners();


/* генерация карточек */
function createCard(nameValue, linkValue, likeValue) {
  const item = {name: nameValue, link: linkValue, likes: likeValue};
  const newCard = new Card({
    data: item,
    handleCardClick: (item) => {
      popupImage.open(item);
    }
  },'#card-template');
  const cardElement = newCard.generateCard();
  return cardElement;
}

api.getInitialCards().then((initialCards) => {
  const cardContainer = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link, item.likes);
      cardContainer.addItem(cardElement);
      }
    },
    cardContainerSelector
  );
  cardContainer.renderItems();
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


