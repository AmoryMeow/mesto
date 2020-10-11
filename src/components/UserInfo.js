export class UserInfo {
  //отвечает за управление отображением информации о пользователе на странице
  constructor(nameSelector,aboutSelector,avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = '';
  }
  getUserInfo(){
    //возвращает объект с данными пользователя.
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id: this._id
    };
    return userInfo;
  }
  setUserInfo(data) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  }
}
