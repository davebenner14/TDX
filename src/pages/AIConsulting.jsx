import Footer from "../components/Footer";
import "./AIConsulting.css";

function AIConsulting() {
  return (
    <>
      <main className="solution-page">
        <section className="solution-hero ai-consulting-hero">
          <div className="solution-hero-content">
            <p className="solution-kicker">Solutions / AI Consulting</p>

            <h1>Practical AI strategy for real business problems.</h1>

            <p className="solution-lead">
              TDX helps businesses understand where AI can create real value,
              what is worth building, and how to move from ideas to practical
              implementation.
            </p>
          </div>
        </section>

        <section className="solution-section">
          <div className="solution-grid">
            <div>
              <p className="section-label">What We Do</p>
              <h2>AI without the noise.</h2>
            </div>

            <div className="solution-copy">
              <p>
                AI can be powerful, but only when it is connected to a clear
                business need. TDX works with companies to identify workflows,
                decisions, customer interactions, and internal processes where
                AI can actually improve speed, clarity, or output quality.
              </p>

              <p>
                The goal is not to chase trends. The goal is to understand your
                operations, find the highest-value opportunities, and create a
                practical roadmap for using AI in a way that fits your business.
              </p>
            </div>
          </div>
        </section>

        <section className="solution-card-section">
          <div className="solution-card">
            <h3>AI Opportunity Review</h3>
            <p>
              We review your current workflows and identify where AI could
              reduce manual work, improve decisions, or support your team.
            </p>
          </div>

          <div className="solution-card">
            <h3>AI Roadmapping</h3>
            <p>
              We help prioritize AI projects based on value, complexity, risk,
              and realistic implementation timelines.
            </p>
          </div>

          <div className="solution-card">
            <h3>AI Tool Selection</h3>
            <p>
              We help evaluate which AI tools, platforms, or custom solutions
              make sense for your business.
            </p>
          </div>

          <div className="solution-card">
            <h3>Implementation Support</h3>
            <p>
              We help turn AI strategy into actual systems, automations,
              dashboards, agents, or software workflows.
            </p>
          </div>
        </section>

        <section className="solution-final">
          <p className="section-label">Built for Business</p>
          <h2>Clear direction before you spend money building.</h2>
          <p>
            TDX helps you avoid wasted time, vague AI experiments, and tools
            that do not fit your operation.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AIConsulting;