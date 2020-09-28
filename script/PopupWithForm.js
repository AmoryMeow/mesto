import {Popup} from './Popup.js';
import {setting} from './data.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    //колбэк сабмита формы
    this._submitForm = submitForm;
  }

  _getInputValues() {
    //собирает данные всех полей формы.
    const inputList =  Array.from(this._element.querySelectorAll(setting.inputSelector));
    let data = {};
    inputList.forEach( input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners(){
    super.setEventListeners();
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._element.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
  }

  open(data = null) {
    if (data != null) {
      const inputList =  Array.from(this._element.querySelectorAll(setting.inputSelector));
      inputList.forEach( input => {
        input.value = data[input.name];
      })
    }
    super.open();
  }
  close() {
    super.close();
    //при закрытии попапа форма должна ещё и сбрасываться
  }
}
