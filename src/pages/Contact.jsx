import Footer from "../components/Footer";
import "./Contact.css";

function Contact() {
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
                Whether you need help with artificial intelligence, automation,
                software, reporting, or a better way to run part of your
                business, we’d be happy to hear from you.
              </p>

              <div className="contact-points">
                <div>
                  <strong>AI & Automation</strong>
                  <p>Practical tools that reduce repetitive work.</p>
                </div>

                <div>
                  <strong>Software & Systems</strong>
                  <p>Custom platforms, workflows, portals, and dashboards.</p>
                </div>

                <div>
                  <strong>Clear Next Steps</strong>
                  <p>No pressure. Just a conversation about the opportunity.</p>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <div className="form-beam"></div>

              <div className="contact-form-header">
                <p>Start the Conversation</p>
                <h2>Tell us what you’re working on.</h2>
              </div>

              <form className="tdx-contact-form">
                <div className="form-row">
                  <label>
                    Name *
                    <input type="text" name="name" required />
                  </label>

                  <label>
                    Email *
                    <input type="email" name="email" required />
                  </label>
                </div>

                <label>
                  Company
                  <input type="text" name="company" />
                </label>

                <label>
                  What can we help with? *
                  <select name="service" required>
                    <option value="">Select one</option>
                    <option>AI Consulting</option>
                    <option>Business Automation</option>
                    <option>Custom Software</option>
                    <option>Data & Reporting</option>
                    <option>Not sure yet</option>
                  </select>
                </label>

                <label>
                  Project Details *
                  <textarea
                    name="message"
                    required
                    rows="6"
                    placeholder="Tell us about the problem, workflow, idea, or system you're trying to improve."
                  ></textarea>
                </label>

                <button type="submit">
                  Send Message
                  <span>→</span>
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