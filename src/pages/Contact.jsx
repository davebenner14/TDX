import Footer from "../components/Footer";
import "./Contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get("name");
    const email = form.get("email");
    const company = form.get("company") || "Not Provided";
    const service = form.get("service");
    const message = form.get("message");

    const subject = encodeURIComponent(
      `TDX Inquiry - ${service}`
    );

    const body = encodeURIComponent(
`Name: ${name}

Email: ${email}

Company: ${company}

Service Requested: ${service}

Project Details:

${message}`
    );

    window.location.href =
      `mailto:triangledynamicsinfo@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-inner">
            <div className="contact-copy">
              <p className="contact-kicker">
                <span></span>
                Contact
              </p>

              <h1>Let’s talk about what you’re trying to build.</h1>

              <p className="contact-lead">
                Whether you need help with artificial intelligence,
                automation, software, reporting, or a better way to run
                part of your business, we’d be happy to hear from you.
              </p>

              <div className="contact-points">
                <div>
                  <strong>AI & Automation</strong>
                  <p>Practical tools that reduce repetitive work.</p>
                </div>

                <div>
                  <strong>Software & Systems</strong>
                  <p>
                    Custom platforms, workflows, portals, and dashboards.
                  </p>
                </div>

                <div>
                  <strong>Clear Next Steps</strong>
                  <p>
                    No pressure. Just a conversation about the opportunity.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <div className="contact-form-beam"></div>

              <div className="contact-form-header">
                <p>Start the Conversation</p>
                <h2>Tell us what you’re working on.</h2>
              </div>

              <form
                className="tdx-contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <label>
                    <span>Name *</span>
                    <input
                      type="text"
                      name="name"
                      required
                    />
                  </label>

                  <label>
                    <span>Email *</span>
                    <input
                      type="email"
                      name="email"
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>Company</span>
                  <input
                    type="text"
                    name="company"
                  />
                </label>

                <label>
                  <span>What can we help with? *</span>
                  <select
                    name="service"
                    required
                  >
                    <option value="">Select one</option>
                    <option>AI Consulting</option>
                    <option>Business Automation</option>
                    <option>Custom Software</option>
                    <option>Data & Reporting</option>
                    <option>Not sure yet</option>
                  </select>
                </label>

                <label>
                  <span>Project Details *</span>
                  <textarea
                    name="message"
                    rows="6"
                    required
                    placeholder="Tell us about the problem, workflow, idea, or system you're trying to improve."
                  ></textarea>
                </label>

                <button type="submit">
                  Send Message <span>→</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;