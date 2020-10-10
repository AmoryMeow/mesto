export class UserInfo {
  //отвечает за управление отображением информации о пользователе на странице
  constructor(nameSelector,bioSelector,avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._avatar = document.querySelector(avatarSelector);

  }
  getUserInfo(){
    //возвращает объект с данными пользователя.
    const userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent,
      avatar: this._avatar.src
    };
    return userInfo;
  }
  setUserInfo(data) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._bio.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
