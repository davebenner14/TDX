import Footer from "../components/Footer";
import "./BusinessAutomation.css";

function BusinessAutomation() {
  return (
    <>
      <main className="solution-page">
        <section className="solution-hero automation-hero">
          <div className="solution-hero-content">
            <p className="solution-kicker">Solutions / Business Automation</p>

            <h1>Automate the work that slows your business down.</h1>

            <p className="solution-lead">
              TDX designs and builds automations that connect tools, reduce
              manual admin, improve accuracy, and give teams more time to focus
              on higher-value work.
            </p>
          </div>
        </section>

        <section className="solution-section">
          <div className="solution-grid">
            <div>
              <p className="section-label">What We Do</p>
              <h2>Better systems. Less busywork.</h2>
            </div>

            <div className="solution-copy">
              <p>
                Many businesses rely on repetitive manual processes across
                email, spreadsheets, CRMs, forms, invoices, calendars, reports,
                and internal tools. These tasks may seem small, but they create
                friction, errors, and wasted time.
              </p>

              <p>
                TDX helps replace those manual steps with clean, reliable
                automated workflows built around how your business actually
                operates.
              </p>
            </div>
          </div>
        </section>

        <section className="solution-card-section">
          <div className="solution-card">
            <h3>Workflow Automation</h3>
            <p>
              Automate repetitive tasks between apps, databases, forms,
              spreadsheets, and internal systems.
            </p>
          </div>

          <div className="solution-card">
            <h3>Operations Systems</h3>
            <p>
              Build structured systems for intake, approvals, task tracking,
              client updates, and internal coordination.
            </p>
          </div>

          <div className="solution-card">
            <h3>Document Automation</h3>
            <p>
              Generate invoices, reports, summaries, contracts, or operational
              documents from structured data.
            </p>
          </div>

          <div className="solution-card">
            <h3>AI-Assisted Workflows</h3>
            <p>
              Add AI into workflows for summaries, routing, classification,
              drafting, decision support, and research.
            </p>
          </div>
        </section>

        <section className="solution-final">
          <p className="section-label">Operational Impact</p>
          <h2>Small process improvements can create massive leverage.</h2>
          <p>
            The right automation does not just save time. It makes the business
            easier to run.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default BusinessAutomation;