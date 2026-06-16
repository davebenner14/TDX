import "../App.css";

function Founder() {
  return (
    <main className="tdx-page">
      <section className="tdx-page-hero">
        <p className="eyebrow">FOUNDER</p>
        <h1>Founded to bridge business problems and modern technology.</h1>
        <p>
          Triangle Dynamics was founded by David Benner to help organizations
          turn operational challenges into software, automation, and AI-powered
          solutions.
        </p>
      </section>

      <section className="tdx-founder-layout">
        <div className="tdx-founder-image">
          <span>Founder Image</span>
        </div>

        <div className="tdx-founder-copy">
          <h2>David Benner</h2>
          <p>
            David works with companies to understand their processes, identify
            areas of friction, and design practical technology systems that
            improve operations.
          </p>

          <p>
            His focus includes custom software, automation, reporting systems,
            AI tools, and digital workflows that help organizations work more
            efficiently.
          </p>

          <p>
            Triangle Dynamics was created for businesses that know technology
            can help, but need a clear partner to figure out what to build, how
            to build it, and where it can create the most value.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Founder;