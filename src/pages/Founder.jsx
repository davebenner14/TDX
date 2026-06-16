import Footer from "../components/Footer";
import "./Founder.css";

function Founder() {
  return (
    <>
      <main className="founder-page">
        <section className="founder-hero-band">
          <div className="founder-hero">
            <div className="founder-hero-copy">
              <p className="founder-kicker">
                <span></span>
                Founder
              </p>

              <h1>Technology starts with understanding the business.</h1>

              <p className="founder-lead">
                Triangle Dynamics was founded by David Benner to help companies
                turn business challenges into practical software, automation,
                and AI solutions.
              </p>

              <p>
                TDX exists for organizations that know technology can create
                value, but need a clear partner to help identify what to build,
                how to build it, and where it can make the biggest impact.
              </p>
            </div>

            <div className="founder-hero-image">
              <img
                src="/images/1766083917833.jpg"
                alt="David Benner, founder of Triangle Dynamics"
                className="founder-image"
              />
            </div>
          </div>
        </section>

        <section className="founder-main-content">
          <div className="founder-text-section">
            <h2>Practical thinking. Modern systems.</h2>

            <div className="founder-text-block">
              <h3>About David</h3>

              <p>
                David works with organizations to understand their processes,
                identify areas of friction, and design technology systems that
                improve how work gets done.
              </p>

              <p>
                His focus includes custom software, automation, reporting
                systems, AI-powered workflows, and digital tools that help teams
                operate with more clarity and confidence.
              </p>
            </div>

            <div className="founder-text-block">
              <h3>Why TDX Exists</h3>

              <p>
                Many businesses are surrounded by manual processes,
                disconnected tools, and information that is difficult to use.
                The opportunity is not just adding more technology. The
                opportunity is building the right systems around the way the
                business actually works.
              </p>

              <p>
                Triangle Dynamics was created to help bridge that gap between
                operational reality and modern technology.
              </p>
            </div>
          </div>

          <div className="founder-focus-section">
            <h2>Areas of focus</h2>

            <div className="founder-focus-grid">
              <div>
                <span>01</span>
                <h3>Artificial Intelligence</h3>
                <p>
                  Practical AI tools and workflows designed around useful
                  business outcomes.
                </p>
              </div>

              <div>
                <span>02</span>
                <h3>Automation</h3>
                <p>
                  Systems that reduce repetitive work and connect business
                  processes.
                </p>
              </div>

              <div>
                <span>03</span>
                <h3>Custom Software</h3>
                <p>
                  Applications, portals, dashboards, and platforms built for the
                  way teams work.
                </p>
              </div>

              <div>
                <span>04</span>
                <h3>Data Systems</h3>
                <p>
                  Reporting, databases, and visibility tools that make
                  information easier to use.
                </p>
              </div>
            </div>
          </div>

          <div className="founder-quote-section">
            <p>
              “Technology should serve the business, not the other way around.”
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Founder;