import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Floating neon orbs */}
      <div className="footer-orb orb-1"></div>
      <div className="footer-orb orb-2"></div>

      <div className="footer__inner">
        <h3 className="footer__title">Ritesh Chauhan</h3>

        <p className="footer__tagline">
          Crafting clean interfaces, smooth experiences & modern web apps.
        </p>

        <div className="footer__socials">
          <a href="https://github.com/Ritesh9369" target="_blank">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ritesh-chauhan-21835b254"
            target="_blank"
          >
            LinkedIn
          </a>
          
        </div>

        <p className="footer__copy">
          © {new Date().getFullYear()} — Built with ❤️ & React ⚛️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
