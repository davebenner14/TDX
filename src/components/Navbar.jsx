import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="tdx-navbar">
        <div className="tdx-nav-inner">
          <a className="tdx-logo-wrap" href="/">
            <img
              src="/logos/TDXLogo.png"
              alt="TDX Triangle Dynamics"
              className="tdx-logo"
            />
          </a>

          <nav className="tdx-nav-links">
            <a href="#company">Company</a>
            <a href="#technology">Our Technologies</a>
            <a href="#agents">AI Agents</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>

            <button
              className="tdx-search-button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              ⌕
            </button>
          </nav>
        </div>
      </header>

      {searchOpen && (
        <div className="tdx-search-overlay">
          <button
            className="tdx-search-close"
            onClick={() => setSearchOpen(false)}
          >
            ×
          </button>

          <div className="tdx-search-box">
            <p>Search TDX</p>
            <input autoFocus type="text" placeholder="What are you looking for?" />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;