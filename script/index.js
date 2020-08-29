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

/***popup cards***/

/*загрузка карточек*/
function renderInitialCards() {
  initialCards.forEach( item => {
    const newCard = createCard(item.name, item.link);
    cardList.append(newCard);
  });
}

/*создание карточки*/
function createCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;

  const newCard = cardTemplate.cloneNode(true);

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = cardName;

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  cardImage.addEventListener('click', openPopupImage);

  const deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('click', likeImage);

  return newCard;
}

function addCard(cardName, cardLink) {
  const newCard = createCard(cardName, cardLink);
  cardList.prepend(newCard);
}

function openPopupAddCard() {
  popupPlace.value = '';
  popupLink.value = '';
  checkPopupValid(popupCard);
  openPopup(popupCard);
}

function deleteCard(evt) {
  evt.target.removeEventListener('click', deleteCard);
  evt.target.closest('.card').remove();
}

function saveNewCard (evt) {
  evt.preventDefault();
  addCard(popupPlace.value,popupLink.value);
  closePopup(popupCard);
};

/***popup image***/
function openPopupImage(evt) {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;

  popupCaption.textContent = evt.target.alt;

  openPopup(popupImage);
}

/***likes***/
function likeImage(evt) {
  const like = evt.target;
  like.classList.toggle('card__like_liked');
}

/***events***/
popupClose.addEventListener('click', () => {closePopup(popupUser);});
editButton.addEventListener('click', openPopupUser);
formElement.addEventListener('submit', saveProfile);
addButton.addEventListener('click', openPopupAddCard);
popupCloseAddCard.addEventListener('click', () => {closePopup(popupCard);});
formAddCard.addEventListener('submit', saveNewCard);
popupCloseImage.addEventListener('click', () => {closePopup(popupImage);});


/***start***/
renderInitialCards();
