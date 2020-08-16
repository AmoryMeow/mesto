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

/*popup*/
const popup = document.querySelector('.popup');
const popupName = popup.querySelector('.popup__input_type_name');
const popupBio = popup.querySelector('.popup__input_type_bio');
/*profile*/
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileBio = profile.querySelector('.profile__bio');
/*form*/
const popupClose = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
/*cards*/
const cardList = document.querySelector('.cards');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popupName.value = profileName.textContent;
  popupBio.value = profileBio.textContent;
  popup.classList.add('popup_opened');
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
    addCard(initialCards[i].name, initialCards[i].link);
  }
}

/*добавление карточки*/
function addCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;

  newCard = cardTemplate.cloneNode(true);

  cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = cardName;

  cardImage = newCard.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  cardList.prepend(newCard);
}

updateCards();
