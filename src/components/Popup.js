export class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
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
    this._element.addEventListener('mousedown', (event) => {this._handleOverlayClick(event)});
    document.addEventListener('keydown', (event) => {this._handleEscClose(event)});
  }
  close() {
    this._element.classList.remove('popup_opened');
    this._element.removeEventListener('mousedown', (event) => {this._handleOverlayClick(event)});
    document.removeEventListener('keydown', (event) => {this._handleEscClose(event)});
  }
}
