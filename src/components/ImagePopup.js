function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_style_fullscreen-img ${card ? "popup_opened" : ""}`}>
      <div className="popup__fullscreen-container">
        <button
          className="popup__close popup__close_type_fullscreen"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img className="popup__fullscreen-img" src={card?.link} alt={card?.name} />
        <h2 className="popup__fullscreen-title">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
