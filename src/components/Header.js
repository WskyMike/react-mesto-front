import HeaderLogo from "../images/header_logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Лого" />
    </header>
  );
}

export default Header;
