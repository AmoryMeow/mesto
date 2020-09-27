export class Card {
  constructor({data,handleCardClick}, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;//функция должна открывать попап с картинкой при клике на карточку.
  }

  _getTemplate() {
      return document.querySelector(this._selectorTemplate)
        .content
        .querySelector('.card')
        .cloneNode(true);
   }

  generateCard() {
      this._element = this._getTemplate();
      const cardImage = this._element.querySelector('.card__image');
      cardImage.src = this._link;
      cardImage.alt = this._name;
      this._element.querySelector('.card__title').textContent = this._name;
      this._setEventListener();
      return this._element;
   }

   _deleteCard = () => {
    this._removeEventListener();
    this._element.remove();
    this._element = null;
   }

   _likeCard = () => {
    this._element.querySelector('.card__like').classList.toggle('card__like_liked');
   }

   _openPopup = () => {
    openPopupImage(this._name,this._link);
   }

   _setEventListener = () => {
      this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
      this._element.querySelector('.card__like').addEventListener('click', this._likeCard);
      this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick());
   }

   _removeEventListener = () => {
    this._element.querySelector('.card__delete').removeEventListener('click', this._deleteCard);
    this._element.querySelector('.card__like').removeEventListener('click', this._likeCard);
    this._element.querySelector('.card__image').removeEventListener('click', () => this._handleCardClick());
   }
}
