export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка загрузки фотографий: ${res.status} ${res.statusText}`);
      })
      .catch((err) => console.log(err));
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`,{
      method: 'GET',
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка получения данных профиля: ${res.status} ${res.statusText}`);
    })
    .catch((err) => console.log(err));
  }

}
