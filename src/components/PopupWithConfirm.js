import {
  Popup
} from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor({popupSelector,submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitForm(this._item);
      });
  }

  open(item) {
    super.open();
    this._item = item;
  }

  close() {
    super.close();
  }

  waitServer(isWait) {
    if (isWait) {
      this._element.querySelector('.popup__button').textContent = 'Удаление...';
    } else {
      this._element.querySelector('.popup__button').textContent = 'Да';
    }
  }
}
