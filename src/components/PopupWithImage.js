import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._image = this._element.querySelector('.popup__image');
    this._caption = this._element.querySelector('.popup__caption');
  }
  open(data){
    //нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;

    super.open();
  }
}
