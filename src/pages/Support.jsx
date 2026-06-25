import Footer from "../components/Footer";
import "./Support.css";

function Support() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get("name");
    const email = form.get("email");
    const company = form.get("company") || "Not Provided";
    const project = form.get("project") || "Not Provided";
    const priority = form.get("priority");
    const issueType = form.get("issueType");
    const message = form.get("message");

    const subject = encodeURIComponent(
      `TDX Support Request - ${issueType}`
    );

    const body = encodeURIComponent(
`Name: ${name}

Email: ${email}

Company: ${company}

Project/System: ${project}

Priority: ${priority}

Issue Type: ${issueType}

Support Details:

${message}`
    );

    window.location.href =
      `mailto:triangledynamicsinfo@gmail.com?subject=${subject}&body=${body}`;
  };

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
            <div className="support-form-beam"></div>

            <div className="support-form-header">
              <p>Support Request</p>
              <h2>Tell us what needs attention.</h2>
            </div>

            <form className="tdx-support-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>Name *</span>
                  <input type="text" name="name" required />
                </label>

                <label>
                  <span>Email *</span>
                  <input type="email" name="email" required />
                </label>
              </div>

              <label>
                <span>Company</span>
                <input type="text" name="company" />
              </label>

              <label>
                <span>Project / System</span>
                <input
                  type="text"
                  name="project"
                  placeholder="Example: Client portal, automation workflow, report dashboard"
                />
              </label>

              <div className="form-row">
                <label>
                  <span>Priority *</span>
                  <select name="priority" required>
                    <option value="">Select one</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </label>

                <label>
                  <span>Issue Type *</span>
                  <select name="issueType" required>
                    <option value="">Select one</option>
                    <option>Bug / Error</option>
                    <option>Workflow Issue</option>
                    <option>Reporting Question</option>
                    <option>Access / Login Issue</option>
                    <option>Change Request</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Support Details *</span>
                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder="Describe what happened, what you expected, and any steps needed to recreate the issue."
                ></textarea>
              </label>

              <button type="submit">
                Send Support Request <span>→</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Support;