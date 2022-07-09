import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import Registration from "./Registration.js";
import Login from "./Login.js";
import InfoToolTip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";

import positiveAuthImg from "../images/positive-auth.svg";
import negativeAuthImg from "../images/negative-auth.svg";

function App() {
  // Переменные состояния
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
  // CARDS
  const [cards, setCards] = useState([]);
  // AUTH => LOGgED-IN
  const [loggedIn, setLoggedIn] = useState(false);
  // AUTH => MESSAGE
  const [message, setMessage] = useState({ imgPath: "", text: "" });
  // AUTH => EMAIL
  const [email, setEmail] = useState("");
  // AUTH => INFOTOOLTIP
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const history = useHistory();

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
    api.editProfile(name, about)
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
    api.addCard(name, link)
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
    api.deleteCard(card._id)
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
    setIsInfoTooltipOpen(false);
  }
  
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  // Попап ФУЛЛСКРИН (клик на карточку)
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обработчик ЛАЙКОВ
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  // Регистраця
  function handleRegister({ password, email }) {
    auth.registration(password, email)
      .then(() => {
        setMessage({
          imgPath: positiveAuthImg,
          text: "Вы успешно зарегистрировались!",
        });
        history.push("/sign-in");
      })
      .catch(() =>
        setMessage({
          imgPath: negativeAuthImg,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      )
      .finally(() => setIsInfoTooltipOpen(true))
  }

  // Авторизация
  function handleAuth({ password, email }) {
    auth.authorization(password, email)
      .then(() => {
        tokenCheck();
      })
      .catch(() =>
      setIsInfoTooltipOpen(true),
      setMessage({
        imgPath: negativeAuthImg,
        text: "Что-то пошло не так! Попробуйте ещё раз.",
      }),
    );
  }

  // Проверка токена
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // ТокенЧек при каждом обновлении
  useEffect(() => {
    tokenCheck();
  }, []);

  // Выход
  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          signOut={signOut}
        />
        <Switch>
          <Route path="/sign-up">
            <Registration
              onRegister={handleRegister}
              isInfoTooltipOpen={isInfoTooltipOpen}
            />
          </Route>
          <Route path="/sign-in">
            <Login 
              isOpen={isEditProfilePopupOpen} 
              onAuth={handleAuth} 
              isInfoTooltipOpen={isInfoTooltipOpen} 
            />
          </Route>
          {/* exact - точный путь */}
          <ProtectedRoute
            exact path='/'
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteCardClick}
            onCardLike={handleCardLike}
          />
          <Route path="*">
            <div style={{ textAlign: "center", margin: "20px" }}>
              Страница не найдена
            </div>
          </Route>
        </Switch>
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
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {/* POPUP ARE_YOU_SURE  */}
        <ConfirmDeletePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={selectCardDelete}
          onCardDelete={handleCardDelete}
        />
        {/* POPUP INFO_TOOL_TIP */}
        <InfoToolTip
          onClose={closeAllPopups}
          name="tooltip"
          isOpen={isInfoTooltipOpen}
          title={message.text}
          imgPath={message.imgPath}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
