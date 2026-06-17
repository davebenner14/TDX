import Footer from "../components/Footer";
import "./Resources.css";

const faqs = [
  {
    question: "What does Triangle Dynamics build?",
    answer:
      "TDX helps businesses plan and build practical AI, automation, software, and reporting systems.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. TDX is built for companies that need practical technology help without unnecessary complexity.",
  },
  {
    question: "Can you help if we do not know exactly what we need?",
    answer:
      "Yes. Many projects begin with identifying the problem, mapping the workflow, and deciding what should be automated or built first.",
  },
  {
    question: "Do you only provide advice, or do you build the solution too?",
    answer:
      "TDX can help with both strategy and implementation, depending on the project.",
  },
  {
    question: "What kinds of systems can you work with?",
    answer:
      "Common areas include Airtable, forms, dashboards, internal tools, client portals, automations, reporting systems, and AI-assisted workflows.",
  },
];

function FAQ() {
  return (
    <>
      <main className="resources-page">
        <section className="resources-hero">
          <div className="resources-inner">
            <p className="resources-kicker">
              <span></span>
              FAQ
            </p>

            <h1>Common questions about working with TDX.</h1>

            <p className="resources-lead">
              Straightforward answers about projects, process, automation, AI,
              and custom business systems.
            </p>
          </div>
        </section>

        <section className="resources-grid-section">
          <div className="faq-list">
            {faqs.map((item) => (
              <article className="faq-item" key={item.question}>
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default FAQ;