import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = ''
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить aватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          id="avatar-input"
          className="popup__input_data_avatar popup__input"
          name="userAvatar"
          type="url"
          required
          placeholder="Ссылка на картинку"
          ref={avatarRef}
        />
        <span className="avatar-input-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
