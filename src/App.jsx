import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        </div>
      </section>

      <section className="videoFeature snapSection">
        <div className="videoFeatureText">
          <h2>Intelligent systems for modern business</h2>
          <p>
            Helping organizations leverage artificial intelligence, automation,
            and software to operate more efficiently and scale with confidence.
          </p>

          <a className="watchButton" href="#solutions">
            What we do
          </a>
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

          <a className="flowButton" href="#solutions">
            Explore services
          </a>
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
          <article className="serviceCard">
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
          </article>

          <article className="serviceCard">
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
          </article>

          <article className="serviceCard">
            <img src="/images/TDXWebMain.png" alt="Web and app development" />

            <div className="serviceCardOverlay">
              <h3>Custom Software</h3>
              <p>
                Modern websites, applications, portals, and software platforms
                built for usability, performance, and growth.
              </p>
            </div>
          </article>

          <article className="serviceCard">
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
          </article>
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