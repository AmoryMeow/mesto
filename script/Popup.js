//import { popupImage } from "./utils";

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
  setEventListeners(){
    //добавляет слушатель клика иконке закрытия попапа
    this._element.querySelector('.popup__close').addEventListener('click', () => {this.close()});
    document.addEventListener('keydown', (event) => {this._handleEscClose(event)});
  }
  open() {
    this._element.classList.add('popup_opened');
  }
  close() {
    this._element.classList.remove('popup_opened');
  }
}
