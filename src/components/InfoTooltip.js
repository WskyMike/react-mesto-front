import React from "react";

export default function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} >
      <div className="popup__container">
        <img src={props.imgPath} alt={props.imgPath} className="popup_style_tooltip" />
        <h2 className="popup__title popup__title_style_tooltip">{props.title}</h2>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
