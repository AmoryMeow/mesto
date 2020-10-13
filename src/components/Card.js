export class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick,
    myID
  }, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._liked = data.likes.some((like) => {
      return like._id === myID;
    })

    this._myCard = data.owner._id === myID;
    this._id = data._id;

    this._selectorTemplate = selectorTemplate;

    this._handleCardClick = handleCardClick.bind(this); //функция должна открывать попап с картинкой при клике на карточку.
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this._handleLikeClick = handleLikeClick;

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
    this._updateDisplayLike();
    return this._element;
  }

  deleteCard() {
    this._removeEventListener();
    this._element.remove();
    this._element = null;
  }

  likeCard(data) {
    this._likes = data.likes.length;
    this._liked = !this._liked;
    this._updateDisplayLike();
  }

  isLiked() {
    return this._liked;
  }
  _updateDisplayLike() {
    this._element.querySelector('.card__like-count').textContent = this._likes;
    if (this._liked) {
      this._element.querySelector('.card__like').classList.add('card__like_liked');
    } else {
      this._element.querySelector('.card__like').classList.remove('card__like_liked');
    }
  }

  _openPopup() {
    openPopupImage(this._name, this._link);
  }

  _setEventListener() {
    this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard(this));
    this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick(this));
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      })
    });
  }

  _removeEventListener() {
    this._element.querySelector('.card__delete').removeEventListener('click', () => this._handleDeleteCard(this));
    this._element.querySelector('.card__like').removeEventListener('click', () => this._handleLikeClick(this));
    this._element.querySelector('.card__image').removeEventListener('click', () => this._handleCardClick());
  }
}
