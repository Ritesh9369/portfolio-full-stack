import { useEffect, useState } from "react";
import "../styles/NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  /* ACTIVE SECTION HIGHLIGHT */
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".nav-menu a");

    const handleScroll = () => {
      const pos = window.scrollY + 200;

      sections.forEach((sec) => {
        if (pos >= sec.offsetTop && pos <= sec.offsetTop + sec.offsetHeight) {
          links.forEach((a) => a.classList.remove("active"));
          const found = document.querySelector(
            `.nav-menu a[href="#${sec.id}"]`
          );
          if (found) found.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        {/* LOGO */}
        <a href="#home" className="nav-logo" onClick={close}>
          <span className="nav-logo-main">Ritesh</span>
          <span className="nav-logo-sub">Dev</span>
        </a>

        {/* Hamburger */}
        <button
          className={`nav-toggle ${isOpen ? "open" : ""}`}
          onClick={toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* MENU */}
        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          {/* 🔥 Mobile Close Button */}
          {isOpen && (
            <button className="close-menu" onClick={close}>
              ✕
            </button>
          )}

          <a href="#home" onClick={close}>
            Home
          </a>
          <a href="#about" onClick={close}>
            About
          </a>
          <a href="#skills" onClick={close}>
            Skills
          </a>
          <a href="#projects" onClick={close}>
            Projects
          </a>
          <a href="#contact" onClick={close}>
            Contact
          </a>

          <a
            href="/Ritesh_Chauhan.pdf"
            download
            className="resume-btn"
            onClick={close}
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
