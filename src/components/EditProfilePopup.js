import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    // Стейты значаний инпутов
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
    // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

    // Обработчики изменения инпутов
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
    // Обработчик SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          id="username-input"
          name="userName"
          className="popup__input popup__input_data_user-name"
          type="text"
          required
          autoFocus
          minLength="2"
          maxLength="40"
          pattern="^[a-zA-Zа-яА-я-\s]+$"
          placeholder="Имя"
          value={name ?? ""}
          onChange={handleNameChange}
        />
        <span className="username-input-error popup__input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          id="userabout-input"
          name="userAbout"
          className=" popup__input popup__input_data_user-about"
          type="text"
          required
          minLength="2"
          maxLength="200"
          pattern="^[a-zA-Zа-яА-я-\s]+$"
          placeholder="О себе"
          value={description ?? ""}
          onChange={handleDescriptionChange}
        />
        <span className="userabout-input-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
