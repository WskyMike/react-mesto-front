function Footer() {

  const currentYear = (new Date).getFullYear();

  return (
    <footer className="footer">
      <p className="footer__author">© {currentYear} Михаил Соснин</p>
    </footer>
  );
}

export default Footer;
