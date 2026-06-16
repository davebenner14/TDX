import Footer from "../components/Footer";
import "./AboutTDX.css";

function AboutTDX() {
  return (
    <>
      <main className="about-tdx-page">
        <section className="about-hero-band">
          <div className="about-hero">
            <div className="about-hero-copy">
              <p className="about-kicker">
                <span></span>
                About Us
              </p>

              <h1>Practical technology for modern business.</h1>

              <p className="about-lead">
                Triangle Dynamics helps organizations identify, design, and
                build software, automation, and artificial intelligence
                solutions that improve how work gets done.
              </p>

              <p>
                We work with companies that know technology can create value,
                but need a clear partner to help uncover the right
                opportunities, shape the right solution, and turn ideas into
                working systems.
              </p>
            </div>

            <div className="about-hero-image">
              <img
                src="/images/TDXSystemsMain.png"
                alt="Modern business technology systems"
              />
            </div>
          </div>
        </section>

        <section className="about-main-content">
          <div className="about-text-section">
            <h2>Moving business forward</h2>

            <div className="about-text-block">
              <h3>Our Vision</h3>

              <p>
                We see a future where organizations of every size can use
                intelligent systems, automation, and custom software to operate
                with greater clarity, speed, and confidence.
              </p>

              <p>
                Businesses are surrounded by disconnected tools, manual
                processes, and fragmented information. TDX exists to help
                simplify that complexity and turn it into practical systems that
                support better decisions and stronger execution.
              </p>
            </div>

            <div className="about-text-block">
              <h3>Our Mission</h3>

              <p>
                To help organizations move forward by transforming business
                challenges into practical technology solutions.
              </p>

              <p>
                We focus on useful outcomes: reducing repetitive work, improving
                visibility, connecting systems, and building software that
                supports the way a business actually operates.
              </p>
            </div>
          </div>

          <div className="about-values-section">
            <h2>What we value</h2>

            <ul>
              <li>
                <strong>Practicality:</strong> Technology should solve real
                problems, not just sound impressive.
              </li>

              <li>
                <strong>Clarity:</strong> Every solution should make the
                business easier to understand, manage, and improve.
              </li>

              <li>
                <strong>Execution:</strong> Strategy matters, but working
                systems create the value.
              </li>

              <li>
                <strong>Partnership:</strong> The best results come from deeply
                understanding the people, workflows, and goals behind the
                business.
              </li>
            </ul>
          </div>

          <div className="about-text-section about-final-section">
            <h2>How we help</h2>

            <div className="about-text-block">
              <h3>What We Do</h3>

              <p>
                Triangle Dynamics helps companies develop custom software,
                automation systems, AI-powered workflows, reporting tools, data
                systems, and modern web applications.
              </p>

              <p>
                The goal is simple: create technology that improves operations,
                supports growth, and gives teams better tools to do their work.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutTDX;