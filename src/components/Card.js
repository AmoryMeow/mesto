export class Card {
  constructor({data,handleCardClick, handleDeleteCard, myID}, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._myCard = data.owner._id === myID;
    this._id = data._id;

    this._selectorTemplate = selectorTemplate;

    this._handleCardClick = handleCardClick;//функция должна открывать попап с картинкой при клике на карточку.
    this._handleDeleteCard = handleDeleteCard;
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
      this._element.querySelector('.card__like-count').textContent = this._likes;

      if (!this._myCard) {
        this._element.querySelector('.card__delete').classList.add('card__delete_disable');
      }
      this._setEventListener();
      return this._element;
   }

  _deleteCard() {
    // this._removeEventListener();
    // this._element.remove();
    // this._element = null;
    this._handleDeleteCard(this);
   }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_liked');
   }

  _openPopup() {
    openPopupImage(this._name,this._link);
   }

  _setEventListener() {
      this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteCard());
      this._element.querySelector('.card__like').addEventListener('click', () => this._likeCard());
      this._element.querySelector('.card__image').addEventListener('click', () =>{
        this._handleCardClick({name: this._name, link: this._link})
      });
   }

   _removeEventListener() {
    this._element.querySelector('.card__delete').removeEventListener('click', () => this._deleteCard());
    this._element.querySelector('.card__like').removeEventListener('click', () => this._likeCard());
    this._element.querySelector('.card__image').removeEventListener('click', () => this._handleCardClick());
   }
}
