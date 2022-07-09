import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {location.pathname === "/sign-up" ? (
        <></>
      ) : location.pathname === "/sign-in" ? (
        <></>
      ) : (
        <footer className="footer">
          <p className="footer__author">© {currentYear} Михаил Соснин</p>
        </footer>
      )}
    </>
  );
}

export default Footer;
