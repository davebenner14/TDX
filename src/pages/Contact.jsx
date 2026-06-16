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
              <div className="contact-form-header">
                <p>Start the Conversation</p>
                <h2>Tell us what you’re working on.</h2>
              </div>

     <iframe
  className="airtable-embed"
  src="https://airtable.com/embed/appI1e6uTxw7SnDV6/pagTJixP312sKhIFL/form"
  frameBorder="0"
  width="100%"
  title="TDX Contact Form"
></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;