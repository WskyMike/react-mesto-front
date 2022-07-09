import React from "react";
import AuthPage from "./AuthPage.js";

export default function Registration(props) {

  const [formValue, setFormValue] = React.useState({
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = formValue;
    props.onRegister({ password, email })
  }

  return (
    <AuthPage
      formName="registration"
      title="Регистрация"
      btnText="Зарегистрироваться"
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
        value={formValue.email || ""}
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
        value={formValue.password || ""}
        onChange={handleChange}
      />
    </AuthPage>
  );
}
