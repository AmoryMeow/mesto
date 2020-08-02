/*popup*/
let popup = document.querySelector('.popup');
let popupName = popup.querySelector('.popup__input_type_name');
let popupBio = popup.querySelector('.popup__input_type_bio');
/*profile*/
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileBio = profile.querySelector('.profile__bio');
/*form*/
let popupClose = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__container');

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
let likes = document.querySelectorAll('.card__like');
likes.forEach(like => {
  like.addEventListener('click', function() {
    like.classList.toggle('card__like_liked');
  });
});
