import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }
  open(data){
    //нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
    const popupImg = this._element.querySelector('.popup__image');
    popupImg.src = data.link;
    popupImg.alt = data.name;

    const popupCaption = this._element.querySelector('.popup__caption');
    popupCaption.textContent = data.name;

    super.open();
  }
}
