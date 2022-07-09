class Auth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  registration(password, email) {
    return fetch(this._baseUrl + `/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
    .then(this._checkResponse);
  }

  authorization(password, email) {
    return fetch(this._baseUrl + `/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          return data.token
        }
      })
  }

  getContent(token) {
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});

export default auth;
