import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Подписка на контекст (App > GET_PROFILE)
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем. Возвращает TRUE, если id лайкнувшего равно id теккущего пользователя
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Отображение корзины
  const cardDeleteButtonClassName = isOwn ? "elements__trash" : "elements__trash_hidden";
  // Отображение стиля лайка
  const cardLikeButtonClassName = `elements__like-icon ${ isLiked ? "elements__like-icon_active" : null }`;

  // Обработчики клика
  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li key={card._id} className="elements__card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
      <div className="elements__picture-container">
        <img
          className="elements__picture"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
      </div>
      <div className="elements__text-container">
        <h3 className="elements__text">{card.name}</h3>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Оценить фото"
          ></button>
          <span className="elements__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
