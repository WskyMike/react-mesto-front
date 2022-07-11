import React from "react";
import { Link } from "react-router-dom";

export default function AuthPage(props) {
  return (
    <div className="auth">
      <form
        className="auth__form"
        name={props.formName}
        onSubmit={props.onSubmit}
      >
        <h1 className="auth__title">{props.title}</h1>
        {props.children}
        <button className="auth__submit-button" type="submit">
          {props.btnText}
        </button>
      </form>
      {
        props.formName === "registration" && (
        <Link className="auth__link" to="/sign-in"> Уже зарегистрированы? Войти </Link>
      )}
    </div>
  );
}
