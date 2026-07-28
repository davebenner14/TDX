import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import NewsFeed from "./components/NewsFeed";
import TechCarousel from "./components/TechCarousel";
import TechWeather from "./components/TechWeather/TechWeather";
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

import Resources from "./pages/Resources";
import Insights from "./pages/Insights";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";

function CanadianTechnologySection() {
  return (
    <section className="canadianTechSection">
      <div className="canadianTechGrid" aria-hidden="true" />
      <div className="canadianTechGlow canadianTechGlowOne" aria-hidden="true" />
      <div className="canadianTechGlow canadianTechGlowTwo" aria-hidden="true" />

      <div className="canadianTechInner">
        <div className="canadianTechContent">
          <div className="canadianTechStatus">
            <span className="canadianTechStatusDot" />
            <span>Canadian technology company</span>
          </div>

          <p className="canadianTechEyebrow">
            ORIGIN // CANADA
          </p>

          <h2>
            Canadian built.
            <br />
            <span>Future focused.</span>
          </h2>

          <p className="canadianTechDescription">
            TDX proudly builds intelligent software, automation, and AI systems
            in Canada — helping organizations move forward with practical,
            modern technology.
          </p>

          <div className="canadianTechDetails">
            <div className="canadianTechDetail">
              <span>REGION</span>
              <strong>CA-NORTH</strong>
            </div>

            <div className="canadianTechDetail">
              <span>SYSTEM</span>
              <strong>TDX</strong>
            </div>

            <div className="canadianTechDetail">
              <span>STATUS</span>
              <strong>ONLINE</strong>
            </div>
          </div>
        </div>

        <div className="canadianTechVisual">
          <div className="canadianTerminal">
            <div className="canadianTerminalHeader">
              <div className="canadianTerminalDots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span>TDX_ORIGIN_SYSTEM</span>

              <span className="canadianTerminalConnection">
                SECURE
              </span>
            </div>

            <div className="canadianTerminalBody">
              <div className="canadianScanLine" aria-hidden="true" />

              <div className="canadianTerminalOutput">
                <p className="terminalLine terminalLineOne">
                  &gt; INITIALIZING ORIGIN CHECK...
                </p>

                <p className="terminalLine terminalLineTwo">
                  &gt; LOCATION: CANADA
                </p>

                <p className="terminalLine terminalLineThree">
                  &gt; VERIFICATION: COMPLETE
                </p>
              </div>

              <div className="mapleCircuitWrapper">
                <div className="mapleCircuitPulse" aria-hidden="true" />

                <svg
                  className="mapleCircuit"
                  viewBox="0 0 260 300"
                  role="img"
                  aria-label="Animated digital Canadian maple leaf"
                >
                  <defs>
                    <linearGradient
                      id="mapleCircuitGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#00d9ff" />
                      <stop offset="100%" stopColor="#00e5a8" />
                    </linearGradient>

                    <filter id="mapleCircuitGlow">
                      <feGaussianBlur
                        stdDeviation="4"
                        result="coloredBlur"
                      />

                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    className="mapleCircuitLeaf"
                    d="
                      M130 12
                      L151 61
                      L184 44
                      L175 87
                      L222 75
                      L197 118
                      L235 135
                      L190 167
                      L202 194
                      L149 185
                      L154 239
                      L130 226
                      L106 239
                      L111 185
                      L58 194
                      L70 167
                      L25 135
                      L63 118
                      L38 75
                      L85 87
                      L76 44
                      L109 61
                      Z
                    "
                  />

                  <path
                    className="mapleCircuitStem"
                    d="M130 226 L130 286"
                  />

                  <path
                    className="mapleCircuitBranch mapleBranchOne"
                    d="M130 93 L95 125 L68 125"
                  />

                  <path
                    className="mapleCircuitBranch mapleBranchTwo"
                    d="M130 93 L165 125 L192 125"
                  />

                  <path
                    className="mapleCircuitBranch mapleBranchThree"
                    d="M130 132 L95 165 L76 165"
                  />

                  <path
                    className="mapleCircuitBranch mapleBranchFour"
                    d="M130 132 L165 165 L184 165"
                  />

                  <path
                    className="mapleCircuitBranch mapleBranchFive"
                    d="M130 172 L130 213"
                  />

                  <circle className="mapleNode nodeOne" cx="130" cy="93" r="5" />
                  <circle className="mapleNode nodeTwo" cx="68" cy="125" r="5" />
                  <circle
                    className="mapleNode nodeThree"
                    cx="192"
                    cy="125"
                    r="5"
                  />
                  <circle
                    className="mapleNode nodeFour"
                    cx="76"
                    cy="165"
                    r="5"
                  />
                  <circle
                    className="mapleNode nodeFive"
                    cx="184"
                    cy="165"
                    r="5"
                  />
                  <circle
                    className="mapleNode nodeSix"
                    cx="130"
                    cy="213"
                    r="5"
                  />
                </svg>
              </div>

              <div className="canadianVerification">
                <div>
                  <span className="canadianVerificationLabel">
                    ORIGIN VERIFIED
                  </span>

                  <strong>PROUDLY CANADIAN</strong>
                </div>

                <span className="canadianVerificationIcon">✓</span>
              </div>
            </div>

            <div className="canadianTerminalFooter">
              <span>43.6532° N</span>
              <span>79.3832° W</span>
              <span className="terminalFooterOnline">
                <i />
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="site">
      <section className="hero snapSection">
        <video className="heroImage" autoPlay muted loop playsInline>
          <source src="/videos/TDXHeroVid.mp4" type="video/mp4" />
        </video>

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
            <img
              src="/images/TDXWebMain.png"
              alt="Web and app development"
            />

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

      <CanadianTechnologySection />

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

      {/* Live location-aware weather demonstration */}
      {/* <TechWeather /> */}

      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/solutions/ai-consulting" element={<AIConsulting />} />

        <Route
          path="/solutions/business-automation"
          element={<BusinessAutomation />}
        />

        <Route
          path="/solutions/custom-software"
          element={<CustomSoftware />}
        />

        <Route
          path="/solutions/data-reporting"
          element={<DataReporting />}
        />

        <Route path="/company/about" element={<AboutTDX />} />
        <Route path="/company/founder" element={<Founder />} />
        <Route path="/company/approach" element={<OurApproach />} />
        <Route path="/company/news" element={<NewsInsights />} />

        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/insights" element={<Insights />} />
        <Route path="/resources/faq" element={<FAQ />} />

        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;