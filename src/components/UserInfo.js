export class UserInfo {
  //отвечает за управление отображением информации о пользователе на странице
  constructor(nameSelector,bioSelector) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
  }
  getUserInfo(){
    //возвращает объект с данными пользователя.
    const userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent
    };
    return userInfo;
  }
  setUserInfo(data) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._bio.textContent = data.bio;
  }
}
