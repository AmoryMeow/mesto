export class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }
  _handleEscClose(event) {
    //содержит логику закрытия попапа клавишей Esc
    if (event.key === "Escape") {
      this.close();
    }
  }
  _handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners(){
    //добавляет слушатель клика иконке закрытия попапа
    this._element.querySelector('.popup__close').addEventListener('click', () => {this.close()});
  }
  open() {
    this._element.classList.add('popup_opened');
    this._element.addEventListener('mousedown', this._handleOverlayClick);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._element.classList.remove('popup_opened');
    this._element.removeEventListener('mousedown', this._handleOverlayClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
