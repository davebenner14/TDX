import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const searchItems = [
  {
    title: "Home",
    description: "Artificial intelligence, automation, software, and systems.",
    url: "/",
    keywords: "home tdx triangle dynamics ai automation software systems",
  },
  {
    title: "About Us",
    description: "Learn more about Triangle Dynamics.",
    url: "/company/about",
    keywords: "about company triangle dynamics tdx",
  },
  {
    title: "Founder",
    description: "Built by someone who understands the gap.",
    url: "/company/founder",
    keywords: "founder david benner triangle dynamics",
  },
  {
    title: "Our Approach",
    description: "How TDX works with businesses to identify and build practical solutions.",
    url: "/company/approach",
    keywords: "approach process strategy planning execution",
  },
  {
    title: "News",
    description: "Company news and updates.",
    url: "/company/news",
    keywords: "news updates insights articles",
  },
  {
    title: "AI Consulting",
    description: "Practical AI guidance, training, and implementation for businesses.",
    url: "/#solutions",
    keywords: "ai artificial intelligence consulting training implementation agents",
  },
  {
    title: "Business Automation",
    description: "Reduce repetitive work and improve operations.",
    url: "/#solutions",
    keywords: "automation workflow business process operations efficiency",
  },
  {
    title: "Custom Software",
    description: "Web apps, internal tools, customer portals, and business systems.",
    url: "/#solutions",
    keywords: "custom software web app application portal dashboard internal tools",
  },
  {
    title: "Data & Reporting",
    description: "Dashboards, reporting systems, and operational visibility.",
    url: "/#solutions",
    keywords: "data reporting dashboards analytics business intelligence",
  },
  {
    title: "Contact",
    description: "Start a conversation with TDX.",
    url: "/contact",
    keywords: "contact inquiry start conversation project help",
  },
];

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return searchItems.filter((item) => {
      const searchableText = `
        ${item.title}
        ${item.description}
        ${item.keywords}
      `.toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchTerm]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
  };

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
                <Link to="/company/founder">Founder</Link>
                <Link to="/company/approach">Our Approach</Link>
                <Link to="/company/news">News</Link>
              </div>
            </div>

            <div className="tdx-dropdown">
              <button className="tdx-dropdown-button">Solutions</button>

              <div className="tdx-dropdown-menu">
                <a href="/#solutions">AI Consulting</a>
                <a href="/#solutions">Business Automation</a>
                <a href="/#solutions">Custom Software</a>
                <a href="/#solutions">Data & Reporting</a>
                <a href="/#solutions">Websites & Portals</a>
              </div>
            </div>

            <a href="/#resources">Resources</a>

            <Link to="/contact">Contact</Link>

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
            onClick={closeSearch}
            aria-label="Close search"
          >
            ×
          </button>

          <div className="tdx-search-box">
            <p>Search TDX</p>

            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search AI, automation, software, contact..."
            />

            <div className="tdx-search-results">
              {searchTerm.trim() && filteredResults.length === 0 && (
                <p className="tdx-search-empty">No results found.</p>
              )}

              {filteredResults.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className="tdx-search-result"
                  onClick={closeSearch}
                >
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;