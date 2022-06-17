import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";

function App() {
  // Переменные состояния (useState)
  // PROFILE
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // ADD_PHOTO
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // AVATAR
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // FULLSCREEN
  const [selectedCard, setSelectedCard] = useState(null);
  // CARD_DELETE_POPUP
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  // CARD_DELETE
  const [selectCardDelete, setSelectCardDelete] = useState({});
  // GET_PROFILE
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  // Обновление после каждого получения массива с данными
  useEffect(() => {
    // Получим данные с сервера
    api.getProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.error(err));

    api.getInitialCards()
      .then((res) => {
        setCards(res.map((card) => card));
      })
      .catch((err) => console.error(err));
  }, []);

  // Попап АВАТАР
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Обработчик АВАТАР
  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }
  
  // Попап ПРОФИЛЬ
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Обработчик ПРОФИЛЬ
  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  // Попап ФОТО
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Обработчик ФОТО
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Попап УДАЛЕНИЕ
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectCardDelete(card);
  }
  // Обработсик УДАЛЕНИЕ
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        // setCards(cards.filter((item) => item !== card))
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
  }

  // Попап ФУЛЛСКРИН (клик на карточку)
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обработчик ЛАЙКОВ
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteCardClick}
          onCardLike={handleCardLike}
        />
        <Footer />
        {/* POPUP PROFILE */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* POPUP ADD_CARD  */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* POPUP AVATAR  */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* POPUP FULSCREEN  */}
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
        {/* POPUP ARE_YOU_SURE  */}
        <ConfirmDeletePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={selectCardDelete}
          onCardDelete={ handleCardDelete }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
