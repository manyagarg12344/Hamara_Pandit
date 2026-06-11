import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, switchLang, t } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span><i className="ti ti-star-filled"></i></span> Gemstone Vault
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/recommend" className={`nav-link ${isActive("/recommend") ? "active" : ""}`}>
              {t("getRecommendation")}
            </Link>
          </li>
          <li>
            <Link to="/history" className={`nav-link ${isActive("/history") ? "active" : ""}`}>
              {t("history")}
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => switchLang("en")}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === "hi" ? "active" : ""}`}
              onClick={() => switchLang("hi")}
              aria-label="हिन्दी में बदलें"
            >
              हि
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <i className="ti ti-moon"></i> : <i className="ti ti-sun"></i>}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="theme-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ display: "none" }}
            id="hamburger"
          >
            {menuOpen ? <i className="ti ti-x"></i> : <i className="ti ti-menu-2"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          {[
            { to: "/", label: t("home") },
            { to: "/recommend", label: t("getRecommendation") },
            { to: "/history", label: t("history") },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${isActive(to) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile hamburger visibility via inline media query override */}
      <style>{`
        @media (max-width: 900px) {
          #hamburger { display: flex !important; }
          .navbar-links { display: none; }
          .mobile-menu-overlay {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            animation: fadeInDown 0.3s ease;
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
