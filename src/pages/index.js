import './index.css';
import {
  Section
} from '../components/Section.js';
import {
  Card
} from '../components/Card.js';
import {
  UserInfo
} from '../components/UserInfo.js';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  //initialCards,
  cardContainerSelector,
  setting,
  userNameSelector,
  userAboutSelector,
  avatarSelector,
  popupImageSelector,
  popupUserInfoSelector,
  popupAddCardSelector,
  popupUserAvatarSelector,
  popupConfirmSelector,
  token
} from '../utils/data.js';
import {
  PopupWithImage
} from '../components/PopupWithImage.js';
import {
  PopupWithForm
} from '../components/PopupWithForm.js';
import {
  Api
} from '../components/Api.js';
import {
  PopupWithConfirm
} from '../components/PopupWithConfirm';

const popupUser = document.querySelector('.popup_type_user');
const popupCard = document.querySelector('.popup_type_card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar');

/*api*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

const popupConfirm = new PopupWithConfirm({
  popupSelector: popupConfirmSelector,
  submitForm: (item) => {

    popupConfirm.waitServer(true);

    api.deleteCard(item)
      .then(() => {
        item.deleteCard();
      })
      .finally(() => {
        popupConfirm.waitServer(false);
        popupConfirm.close();
      });

  }
});
popupConfirm.setEventListeners();

/* генерация карточек */
function createCard(item, myID) {
  const newCard = new Card({
    data: item,
    handleCardClick: (item) => {
      popupImage.open(item);
    },
    handleDeleteCard: (item) => {
      popupConfirm.open(item);
    },
    handleLikeClick: (item) => {
      if (item.isLiked()) {
        api.deleteLikeCard(item)
          .then((data) => {
            item.likeCard(data);
          })
      } else {
        api.likeCard(item)
          .then((data) => {
            item.likeCard(data);
          })
      }
    },
    myID
  }, '#card-template');
  const cardElement = newCard.generateCard();
  return cardElement;
}

api.getAllData().then(
  (allData) => {
    const [profile, initialCards] = allData;

    /* профиль */
    const myID = profile._id;
    const userInfo = new UserInfo(userNameSelector, userAboutSelector, avatarSelector);

    userInfo.setUserInfo(profile);
    const popupUserInfo = new PopupWithForm({
      popupSelector: popupUserInfoSelector,
      submitForm: (data) => {

        popupUserInfo.waitServer(true);

        api.saveProfile(data)
          .then((profile) => {
            userInfo.setUserInfo(profile);
          })
          .finally(() => {
            popupUserInfo.waitServer(false);
            popupUserInfo.close();
          });

      }
    });

    editButton.addEventListener('click', () => {
      popupUserInfo.open(userInfo.getUserInfo());
      userFormValidator.resetForm();
    });
    popupUserInfo.setEventListeners();

    const popupUserAvatar = new PopupWithForm({
      popupSelector: popupUserAvatarSelector,
      submitForm: (data) => {

        popupUserAvatar.waitServer(true);

        api.changePhoto(data)
          .then((profile) => {
            userInfo.setUserInfo(profile);
          })
          .finally(() => {
            popupUserAvatar.waitServer(false);
            popupUserAvatar.close();
          });
      }
    });
    editAvatarButton.addEventListener('click', () => {
      popupUserAvatar.open();
      userAvatarFormValidador.resetForm();
    });
    popupUserAvatar.setEventListeners();

    /*карточки */
    const cardContainer = new Section({
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item, myID);
          cardContainer.addItem(cardElement);
        }
      },
      cardContainerSelector
    );
    cardContainer.renderItems();

    /* добавление карточки */
    const popupAddCard = new PopupWithForm({
      popupSelector: popupAddCardSelector,
      submitForm: (item) => {

        popupAddCard.waitServer(true);

        api.addCard({
            name: item.place,
            link: item.link
          })
          .then((item) => {
            const cardElement = createCard(item, myID);
            cardContainer.addItem(cardElement, false);
          })
          .finally(() => {
            popupAddCard.waitServer(false);
            popupAddCard.close();
          });
      }
    });

    popupAddCard.setEventListeners();
    addButton.addEventListener('click', () => {
      popupAddCard.open();
      cardFormValidador.resetForm();
    });

  }
)

/* картинка */
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

/*подключение валидации*/
const userFormValidator = new FormValidator(setting, popupUser.querySelector(setting.formSelector));
const cardFormValidador = new FormValidator(setting, popupCard.querySelector(setting.formSelector));
const userAvatarFormValidador = new FormValidator(setting, popupAvatar.querySelector(setting.formSelector));

userFormValidator.enableValidation();
cardFormValidador.enableValidation();
userAvatarFormValidador.enableValidation();
