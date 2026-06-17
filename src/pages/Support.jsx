import Footer from "../components/Footer";
import "./Support.css";

function Support() {
  return (
    <>
      <main className="support-page">
        <section className="support-hero">
          <div className="support-hero-inner">
            <p className="support-kicker">
              <span></span>
              Existing Client Support
            </p>

            <h1>Need help with something TDX built?</h1>

            <p className="support-lead">
              Submit issues, bugs, workflow problems, reporting questions, or
              support requests related to an active Triangle Dynamics project.
            </p>
          </div>
        </section>

        <section className="support-content">
          <div className="support-info">
            <h2>Submit a Support Request</h2>

            <p>
              Please include as much detail as possible so the issue can be
              reviewed properly.
            </p>

            <ul>
              <li>What system or workflow is affected</li>
              <li>What happened</li>
              <li>What you expected to happen</li>
              <li>Any screenshots or examples, if available</li>
            </ul>
          </div>

          <div className="support-form-card">
            <iframe
              className="support-airtable-embed"
              src="https://airtable.com/embed/appI1e6uTxw7SnDV6/pagxaHYz1cJDQq4N7/form"
              frameBorder="0"
              width="100%"
              height="1500"
              title="Triangle Dynamics Support Form"
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Support;