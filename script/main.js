/*form*/
let popupClose = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.popup__save');
let formElement = document.querySelector('.popup__container');
/*popup*/
let popup = document.querySelector('.popup');
let popupName = popup.querySelector('.popup__name');
let popupBio = popup.querySelector('.popup__bio');
/*profile*/
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileBio = profile.querySelector('.profile__bio');

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupBio.value = profileBio.textContent;
});

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupName.value;
  profileBio.textContent = popupBio.value;
};

formElement.addEventListener('submit', formSubmitHandler);
