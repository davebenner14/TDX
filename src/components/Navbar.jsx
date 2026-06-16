import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="tdx-navbar">
        <div className="tdx-nav-inner">
          <Link className="tdx-logo-wrap" to="/">
            <img
              src="/logos/TDXLogo.png"
              alt="TDX Triangle Dynamics"
              className="tdx-logo"
            />
          </Link>

          <nav className="tdx-nav-links">
            <div className="tdx-dropdown">
              <button className="tdx-dropdown-button">Company</button>

              <div className="tdx-dropdown-menu">
                <Link to="/company/about">About Us</Link>
                <Link to="/company/news">News</Link>
                <Link to="/company/founder">Founder</Link>
                <Link to="/company/approach">Our Approach</Link>
              </div>
            </div>

            <a href="/#technology">Our Technologies</a>
            <a href="/#agents">AI Agents</a>
            <a href="/#resources">Resources</a>
            <a href="/#contact">Contact</a>

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

            <input
              autoFocus
              type="text"
              placeholder="What are you looking for?"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;