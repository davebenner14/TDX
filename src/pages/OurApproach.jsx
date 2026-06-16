import Footer from "../components/Footer";
import "./OurApproach.css";

function OurApproach() {
  return (
    <>
      <main className="approach-page">
        <section className="approach-hero-band">
          <div className="approach-hero">
            <div className="approach-hero-copy">
              <p className="approach-kicker">
                <span></span>
                Our Approach
              </p>

              <h1>Business first. Technology second. Results always.</h1>

              <p className="approach-lead">
                Triangle Dynamics starts by understanding how your organization
                actually works before recommending software, automation, or AI.
              </p>

              <p>
                The goal is not to add technology for the sake of it. The goal
                is to identify where better systems can create measurable
                progress.
              </p>
            </div>

            <div className="approach-hero-image">
              <img
                src="/images/TDXAutoMain.png"
                alt="Connected business automation systems"
              />
            </div>
          </div>
        </section>

        <section className="approach-main-content">
          <div className="approach-text-section">
            <h2>From complexity to clarity.</h2>

            <div className="approach-text-block">
              <h3>How we work</h3>

              <p>
                Every project begins with the business problem. We look at the
                people, workflows, tools, data, and decisions involved before
                shaping the technical solution.
              </p>

              <p>
                This helps ensure that the final system is practical, useful,
                and aligned with the way the organization needs to operate.
              </p>
            </div>
          </div>

          <div className="approach-process-section">
            <h2>The process</h2>

            <div className="approach-process-grid">
              <article>
                <span>01</span>
                <h3>Discover</h3>
                <p>
                  Understand the business, existing workflows, pain points,
                  goals, and current systems.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Identify</h3>
                <p>
                  Find the highest-value opportunities for software,
                  automation, AI, reporting, or system improvement.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Design</h3>
                <p>
                  Shape a practical solution roadmap that connects business
                  needs with the right technical approach.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>Build</h3>
                <p>
                  Develop custom tools, workflows, dashboards, integrations, and
                  software systems.
                </p>
              </article>

              <article>
                <span>05</span>
                <h3>Improve</h3>
                <p>
                  Measure what works, refine the system, and continue improving
                  over time.
                </p>
              </article>
            </div>
          </div>

          <div className="approach-principles-section">
            <h2>Guiding principles</h2>

            <div className="approach-principles-list">
              <div>
                <h3>Start with the workflow</h3>
                <p>
                  Good technology should fit the reality of how teams actually
                  work.
                </p>
              </div>

              <div>
                <h3>Build what creates value</h3>
                <p>
                  The best solution is not always the biggest one. It is the one
                  that solves the right problem clearly.
                </p>
              </div>

              <div>
                <h3>Keep systems understandable</h3>
                <p>
                  Tools should reduce confusion, not create another layer of
                  complexity.
                </p>
              </div>

              <div>
                <h3>Design for growth</h3>
                <p>
                  Systems should support where the business is now and where it
                  needs to go next.
                </p>
              </div>
            </div>
          </div>

          <div className="approach-quote-section">
            <p>
              “The right technology does not just modernize a business. It helps
              the business move better.”
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default OurApproach;