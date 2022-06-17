import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Card from "./Card.js";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
  // Подписка на контекст (App > GET_PROFILE)
  const currentUser = React.useContext(CurrentUserContext);
  // className="elements__container"
  const cardsElements = cards.map((card) => (
    <Card 
    card={ card } 
    key={ card._id } 
    onCardClick={ onCardClick } 
    onCardDelete={ onCardDelete }
    onCardLike={ onCardLike } />
  ))

  return (
    <main className="content">
      {/*PROFILE*/}
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar-src"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
          <button
            type="button"
            className="profile__avatar-button"
            aria-label="Изменить аватар"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__user-name">{currentUser.name || '...'}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <h2 className="profile__user-about">{currentUser.about || '...'}</h2>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>
      {/*ELEMENTS*/}
      <section className="elements">
        <ul className="elements__container">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
