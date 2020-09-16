/***popup image***/

export const popupImage = document.querySelector('.popup_type_image');
const popupImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
/**button**/
export const popupCloseImage = popupImage.querySelector('.popup__close');


/***открытие-закрытие модальных окон***/
function openPopup(modal) {
  setListenerPopup(modal);
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  removeListenerPopup(modal);
}

/*удаление обработчиков окна*/
function removeListenerPopup(popupItem){
  popupItem.removeEventListener('mousedown', closeByClickOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

/*закрытие по клику мимо и esc*/
function setListenerPopup(popupItem) {
  popupItem.addEventListener('mousedown', closeByClickOverlay);
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

function openPopupImage(cardName, cardLink) {
  popupImg.src = cardLink;
  popupImg.alt = cardName;

  popupCaption.textContent = cardName;

  openPopup(popupImage);
}

export {openPopup, closePopup, openPopupImage};
