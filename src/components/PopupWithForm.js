function PopupWithForm(props) {
  return (
    <div className={`popup popup_style_${props.name} ${props.isOpen ? "popup_opened" : ""}`} >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form"
          id={props.name}
          name={props.name}
          autoComplete="off"
          method="get"
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className="popup__submit"
            type="submit"
            aria-label="Сохранить"
          >
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
