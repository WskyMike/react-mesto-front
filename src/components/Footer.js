import { Route } from "react-router-dom";

export default function Footer() {
  
  const currentYear = new Date().getFullYear();

  return (
    <Route exact path="/">
      <footer className="footer">
        <p className="footer__author">© {currentYear} Михаил Соснин</p>
      </footer>
    </Route>
  );
}
