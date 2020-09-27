import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    //собирает данные всех полей формы.
  }

  setEventListeners(){
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  }

  close() {
    //при закрытии попапа форма должна ещё и сбрасываться
  }
}
