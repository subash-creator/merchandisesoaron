import { useState } from "react";
import "./Header.css";


import logo from "../assets/soaron-logo.webp";
import logob from "../assets/soaron-logob.webp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <img src={logob} alt="" style={{ display: "none" }} />
      <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        {!menuOpen && (
          <>
            <a href="/">
              <img src={logo} alt="Soaron Logo" className="logo-img" />
            </a>
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              Menu <span className="menu-icon">☰</span>
            </button>
          </>
        )}
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="menu-logo">
            <a href="/">
              <img src={logob} alt="Soaron Logo" />
            </a>
          </div>

          <nav className="menu-links">
            <a href="/Colorsownspray">ColorownSpray</a>
            <a href="/roller">Roller</a>
            <a href="/cleanhigh">CleanHigh</a>
            <a href="/story">Story</a>
            <a href="/partner">Partner with Us</a>
          </nav>

          <button
            className="menu-close-btn"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>


        </div>
      )}
    </>
  );
}
