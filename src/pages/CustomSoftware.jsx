import Footer from "../components/Footer";
import "./CustomSoftware.css";

function CustomSoftware() {
  return (
    <>
      <main className="solution-page">
        <section className="solution-hero software-hero">
          <div className="solution-hero-content">
            <p className="solution-kicker">Solutions / Custom Software</p>

            <h1>Custom software built around the way you work.</h1>

            <p className="solution-lead">
              TDX builds practical web applications, portals, dashboards, and
              internal tools that help businesses operate more efficiently and
              deliver better digital experiences.
            </p>
          </div>
        </section>

        <section className="solution-section">
          <div className="solution-grid">
            <div>
              <p className="section-label">What We Do</p>
              <h2>Software that fits the business.</h2>
            </div>

            <div className="solution-copy">
              <p>
                Off-the-shelf tools are useful, but they often force businesses
                to work around the software. TDX builds custom systems that
                match your process, your users, and your goals.
              </p>

              <p>
                From client portals and admin dashboards to internal tools and
                full web platforms, we focus on clean design, practical
                functionality, and systems that can grow over time.
              </p>
            </div>
          </div>
        </section>

        <section className="solution-card-section">
          <div className="solution-card">
            <h3>Web Applications</h3>
            <p>
              Custom browser-based tools for operations, customers, staff,
              reporting, and business management.
            </p>
          </div>

          <div className="solution-card">
            <h3>Client Portals</h3>
            <p>
              Secure portals for customers, users, vendors, tenants, staff, or
              partners to access information and complete tasks.
            </p>
          </div>

          <div className="solution-card">
            <h3>Internal Tools</h3>
            <p>
              Admin panels, management systems, intake tools, scheduling tools,
              and custom dashboards.
            </p>
          </div>

          <div className="solution-card">
            <h3>System Integrations</h3>
            <p>
              Connect apps, databases, APIs, payment systems, forms, and
              reporting tools into one smoother workflow.
            </p>
          </div>
        </section>

        <section className="solution-final">
          <p className="section-label">Built to Scale</p>
          <h2>Start with what matters. Improve from there.</h2>
          <p>
            TDX focuses on building useful software first — then improving,
            expanding, and refining it as your needs grow.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CustomSoftware;