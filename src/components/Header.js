import HeaderLogo from "../images/header_logo.svg";
import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Лого" />
      <div className="header__textplace">
        {props.loggedIn ? (
          <p className="header__usermail">{props.email}</p>
        ) : (
          <>
            { 
              location.pathname === "/sign-in" ? (
                <Link className="header__auth" to="/sign-up"> Регистрация </Link>
              ) : (
                <Link className="header__auth" to="/sign-in"> Войти </Link>
              ) 
            }
          </>
        )}
        {props.loggedIn && (
          <p onClick={props.signOut} className="header__auth header__auth_type_signout"> Выйти </p>
        )}
      </div>
    </header>
  );
}

export default withRouter(Header);
