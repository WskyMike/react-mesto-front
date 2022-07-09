import React from "react";
import AuthPage from "./AuthPage.js";

export default function Login(props) {

  const [formValue, setFormValue] = React.useState({
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    if (!formValue.password || !formValue.email ) {
      return;
    }
    props.onAuth({ password, email })
  }

  return (
    <AuthPage 
    formName="login" 
    title="Вход" 
    btnText="Войти"
    onSubmit={handleSubmit}
    >
      <input
        name="email"
        type="email"
        className="popup__input popup__input_type_auth"
        id="email"
        placeholder="E-mail"
        minLength="6"
        maxLength="40"
        required
        autoComplete="on"
        value={formValue.email || ''}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        className="popup__input popup__input_type_auth"
        id="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="40"
        required
        autoComplete="on"
        value={formValue.password || ''}
        onChange={handleChange}
      />
    </AuthPage>
  );
}

