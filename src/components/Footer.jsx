import "./Footer.css";

function Footer() {
  return (
    <footer className="tdx-footer">
      <div className="tdx-footer-inner">
        <a className="tdx-footer-logo-wrap" href="/">
          <img
            src="/logos/TDXLogo.png"
            alt="TDX Triangle Dynamics"
            className="tdx-footer-logo"
          />
        </a>

        <nav className="tdx-footer-links">
          <a href="#company">Company</a>
          <a href="#technology">Our Technologies</a>
          <a href="#agents">AI Agents</a>
          <a href="#resources">Resources</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      <div className="tdx-footer-bottom">
        <p>© {new Date().getFullYear()} Triangle Dynamics. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;