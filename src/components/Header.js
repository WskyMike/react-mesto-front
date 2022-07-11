import HeaderLogo from "../images/header_logo.svg";
import React from "react";
import { Link, withRouter, Route, Switch } from "react-router-dom";

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Лого" />
      <div className="header__textplace">
        {props.loggedIn ? (
          <p className="header__usermail">{props.email}</p>
        ) : (
          <>
            <Switch>
              <Route path='/sign-up'>
                <Link className="header__auth" to="/sign-in"> Войти </Link> 
              </Route>
            </Switch>
            <Switch>
              <Route path='/sign-in'>
                <Link className="header__auth" to="/sign-up"> Регистраця </Link> 
              </Route>
            </Switch>
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

<Switch>
   <Route path='/sign-up'>
       <Link className="header__auth" to="/sign-in"> Войти </Link> 
   </Route>
</Switch>