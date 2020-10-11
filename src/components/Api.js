export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка получения данных профиля: ${res.status} ${res.statusText}`);
      })
      .catch((err) => console.log(err));
  }

  saveProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then((res) => {
        console.log("res", res)
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка сохранения данных профиля: ${res.status} ${res.statusText}`);
      })
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка загрузки фотографий: ${res.status} ${res.statusText}`);
      })
      .catch((err) => console.log(err));
  }

  addCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
      .then((res) => {
        console.log("res", res)
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка добавления карточки: ${res.status} ${res.statusText}`);
      })
      .catch((err) => console.log(err));
  }

  deleteCard(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      console.log("res", res)
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка удаления карточки: ${res.status} ${res.statusText}`);
    })
    .catch((err) => console.log(err));
  }

  getAllData() {
    return Promise.all([this.getProfile(), this.getInitialCards()]);
  }
}
