import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";
import TechCarousel from "./components/TechCarousel";
import Footer from "./components/Footer";

import AboutTDX from "./pages/AboutTDX";
import Founder from "./pages/Founder";
import OurApproach from "./pages/OurApproach";
import NewsInsights from "./pages/NewsInsights";
import Contact from "./pages/Contact";

import AIConsulting from "./pages/AIConsulting";
import BusinessAutomation from "./pages/BusinessAutomation";
import CustomSoftware from "./pages/CustomSoftware";
import DataReporting from "./pages/DataReporting";

function Home() {
  return (
    <main className="site">
      <section className="hero snapSection">
        <img
          className="heroImage"
          src="/images/TDXHero.png"
          alt="Futuristic AI infrastructure"
        />

        <div className="heroOverlay" />

        <div className="heroText">
          <h1>FORWARD</h1>
          <h2>Intelligence for Modern Business</h2>
          <h3>Software • Automation • AI</h3>

          <div className="heroActions">
            <Link className="primaryCta" to="/contact">
              Start a project
            </Link>

            <a className="secondaryCta" href="#solutions">
              Explore services
            </a>
          </div>
        </div>
      </section>

      <section className="videoFeature snapSection">
        <div className="videoFeatureText">
          <h2>Intelligent systems for modern business</h2>
          <p>
            Helping organizations leverage artificial intelligence, automation,
            and software to operate more efficiently and scale with confidence.
          </p>

          <div className="sectionActions">
            <a className="watchButton" href="#solutions">
              What we do
            </a>

            <Link className="outlineButton" to="/contact">
              Contact us
            </Link>
          </div>
        </div>

        <video className="featureVideo" autoPlay muted loop playsInline>
          <source src="/videos/TDXVid1.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="flowSection snapSection">
        <video className="flowVideo" autoPlay muted loop playsInline>
          <source src="/videos/TDXMainVid2.mp4" type="video/mp4" />
        </video>

        <div className="flowOverlay" />

        <div className="flowContent">
          <h2>From complexity to clarity.</h2>
          <p>
            We help organizations turn disconnected tools, manual processes, and
            fragmented information into intelligent systems that move work
            forward.
          </p>

          <div className="sectionActions">
            <a className="flowButton" href="#solutions">
              Explore services
            </a>

            <Link className="flowContactButton" to="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section id="solutions" className="servicesSection snapSection">
        <div className="servicesIntro">
          <p className="eyebrow">WHAT WE DO</p>

          <h2>
            Intelligence.
            <br />
            Automation.
            <br />
            Execution.
          </h2>

          <p>
            TDX helps organizations implement practical AI, automate critical
            workflows, build modern web and app experiences, and create data
            systems that support better decisions.
          </p>
        </div>

        <div id="services" className="serviceCards">
          <Link to="/solutions/ai-consulting" className="serviceCard">
            <img
              src="/images/TDXAIMain.png"
              alt="Artificial intelligence implementation"
            />

            <div className="serviceCardOverlay">
              <h3>AI Consulting</h3>
              <p>
                Practical AI guidance, training, and implementation that helps
                organizations identify opportunities and deploy useful tools.
              </p>
            </div>
          </Link>

          <Link to="/solutions/business-automation" className="serviceCard">
            <img
              src="/images/TDXAutoMain.png"
              alt="Business automation systems"
            />

            <div className="serviceCardOverlay">
              <h3>Business Automation</h3>
              <p>
                Connected workflows that reduce manual work, improve efficiency,
                and keep business operations moving.
              </p>
            </div>
          </Link>

          <Link to="/solutions/custom-software" className="serviceCard">
            <img src="/images/TDXWebMain.png" alt="Web and app development" />

            <div className="serviceCardOverlay">
              <h3>Custom Software</h3>
              <p>
                Modern websites, applications, portals, and software platforms
                built for usability, performance, and growth.
              </p>
            </div>
          </Link>

          <Link to="/solutions/data-reporting" className="serviceCard">
            <img
              src="/images/TDXSystemsMain.png"
              alt="Data systems and database solutions"
            />

            <div className="serviceCardOverlay">
              <h3>Data & Reporting</h3>
              <p>
                Databases, dashboards, reporting tools, and information systems
                that turn business data into useful insight.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="homeCtaSection">
        <div className="homeCtaInner">
          <p className="eyebrow">START THE CONVERSATION</p>

          <h2>Have a process, system, or idea that could work better?</h2>

          <p>
            Tell us what you are trying to improve. TDX can help identify the
            right path forward — whether that means AI, automation, software, or
            better reporting.
          </p>

          <Link className="primaryCta" to="/contact">
            Contact us
          </Link>
        </div>
      </section>

      <section id="resources">
        <NewsFeed />
      </section>

      <TechCarousel />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/solutions/ai-consulting" element={<AIConsulting />} />
        <Route
          path="/solutions/business-automation"
          element={<BusinessAutomation />}
        />
        <Route path="/solutions/custom-software" element={<CustomSoftware />} />
        <Route path="/solutions/data-reporting" element={<DataReporting />} />

        <Route path="/company/about" element={<AboutTDX />} />
        <Route path="/company/founder" element={<Founder />} />
        <Route path="/company/approach" element={<OurApproach />} />
        <Route path="/company/news" element={<NewsInsights />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;