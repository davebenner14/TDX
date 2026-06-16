import Footer from "../components/Footer";
import "./DataReporting.css";

function DataReporting() {
  return (
    <>
      <main className="solution-page">
        <section className="solution-hero data-hero">
          <div className="solution-hero-content">
            <p className="solution-kicker">Solutions / Data & Reporting</p>

            <h1>Turn scattered information into clear business insight.</h1>

            <p className="solution-lead">
              TDX helps businesses organize data, build reporting systems, and
              create dashboards that make performance, operations, and decisions
              easier to understand.
            </p>
          </div>
        </section>

        <section className="solution-section">
          <div className="solution-grid">
            <div>
              <p className="section-label">What We Do</p>
              <h2>Clear reporting. Better decisions.</h2>
            </div>

            <div className="solution-copy">
              <p>
                Business data often lives across spreadsheets, forms, CRMs,
                payment systems, databases, and disconnected tools. When
                information is scattered, reporting becomes slow and decisions
                become harder.
              </p>

              <p>
                TDX helps bring that information together into structured,
                usable reporting systems that give owners, managers, and teams
                a clearer view of what is happening.
              </p>
            </div>
          </div>
        </section>

        <section className="solution-card-section">
          <div className="solution-card">
            <h3>Dashboards</h3>
            <p>
              Build clean dashboards for operations, sales, finance, customers,
              projects, tasks, or team performance.
            </p>
          </div>

          <div className="solution-card">
            <h3>Data Organization</h3>
            <p>
              Structure messy data from spreadsheets, forms, databases, and
              apps into usable business information.
            </p>
          </div>

          <div className="solution-card">
            <h3>Automated Reports</h3>
            <p>
              Create recurring reports that update automatically and reduce
              manual spreadsheet work.
            </p>
          </div>

          <div className="solution-card">
            <h3>Business Intelligence</h3>
            <p>
              Help teams understand trends, bottlenecks, performance, and
              opportunities through clearer reporting.
            </p>
          </div>
        </section>

        <section className="solution-final">
          <p className="section-label">Visibility</p>
          <h2>You cannot improve what you cannot see.</h2>
          <p>
            TDX helps turn raw information into reporting your business can
            actually use.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default DataReporting;