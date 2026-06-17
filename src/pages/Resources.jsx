import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Resources.css";

function Resources() {
  return (
    <>
      <main className="resources-page">
        <section className="resources-hero">
          <div className="resources-inner">
            <p className="resources-kicker">
              <span></span>
              Resources
            </p>

            <h1>Practical guidance for AI, automation, and business systems.</h1>

            <p className="resources-lead">
              Explore ideas, answers, and practical resources to help understand
              where technology can create value inside your business.
            </p>
          </div>
        </section>

        <section className="resources-grid-section">
          <div className="resources-grid">
            <Link to="/resources/insights" className="resource-card">
              <p>01</p>
              <h2>Insights</h2>
              <span>
                Practical thoughts on AI, automation, software, and operational
                systems.
              </span>
            </Link>

            <Link to="/resources/faq" className="resource-card">
              <p>02</p>
              <h2>FAQ</h2>
              <span>
                Common questions about working with TDX, project scope, and
                implementation.
              </span>
            </Link>

            <Link to="/support" className="resource-card">
              <p>03</p>
              <h2>Client Support</h2>
              <span>
                Existing clients can submit issues, bugs, or support requests
                for active projects.
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Resources;