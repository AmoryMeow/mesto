const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*popup user*/
const popupUser = document.querySelector('.popup_type_user');
const popupName = popupUser.querySelector('.popup__input_type_name');
const popupBio = popupUser.querySelector('.popup__input_type_bio');
/**button**/
const popupClose = popupUser.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const formElement = popupUser.querySelector('.popup__container');
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
const formAddCard = popupCard.querySelector('.popup__container');

function closePopup() {
  popupUser.classList.remove('popup_opened');
}

function openPopup() {
  popupName.value = profileName.textContent;
  popupBio.value = profileBio.textContent;
  popupUser.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupName.value;
  profileBio.textContent = popupBio.value;
  closePopup();
};

popupClose.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);

/*сердечки*/
const likes = document.querySelectorAll('.card__like');
likes.forEach(like => {
  like.addEventListener('click', function() {
    like.classList.toggle('card__like_liked');
  });
});

/*загрузка карточек*/
function updateCards() {
  for (i=0; i<initialCards.length; i++){
    createCard(initialCards[i].name, initialCards[i].link);
    cardList.append(newCard);
  }
}

/*создание карточки*/
function createCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;

  newCard = cardTemplate.cloneNode(true);

  cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = cardName;

  cardImage = newCard.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', deleteCard);

  return(newCard);
}

function addCard(cardName, cardLink) {
  const newCard = createCard(cardName, cardLink);
  cardList.prepend(newCard);
}

function openPopupAddCard() {
  popupPlace.value = '';
  popupLink.value = '';
  popupCard.classList.add('popup_opened');
}

function closePopupAddCard() {
  popupCard.classList.remove('popup_opened');
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function formSubmitAddCard (evt) {
  evt.preventDefault();
  addCard(popupPlace.value,popupLink.value);
  closePopupAddCard();
};

addButton.addEventListener('click', openPopupAddCard);
popupCloseAddCard.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', formSubmitAddCard);

updateCards();
