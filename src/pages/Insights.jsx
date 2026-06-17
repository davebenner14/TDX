import Footer from "../components/Footer";
import "./Resources.css";

const insights = [
  {
    title: "What should your business automate first?",
    description:
      "Start with repetitive work that is high-volume, rule-based, and slowing down your team.",
  },
  {
    title: "AI agents are not magic. They need structure.",
    description:
      "The best AI systems are built around clear workflows, clean data, and specific business outcomes.",
  },
  {
    title: "Custom software works best when it solves a painful problem.",
    description:
      "The goal is not to build more tools. The goal is to remove friction from daily operations.",
  },
];

function Insights() {
  return (
    <>
      <main className="resources-page">
        <section className="resources-hero">
          <div className="resources-inner">
            <p className="resources-kicker">
              <span></span>
              Insights
            </p>

            <h1>Clear thinking on AI, automation, and software.</h1>

            <p className="resources-lead">
              Short, practical perspectives on how companies can use technology
              to improve work, reduce manual effort, and build better systems.
            </p>
          </div>
        </section>

        <section className="resources-grid-section">
          <div className="insights-list">
            {insights.map((item) => (
              <article className="insight-card" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Insights;