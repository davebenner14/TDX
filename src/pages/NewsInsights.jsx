import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./NewsInsights.css";

const topics = [
  { label: "AI", query: "artificial intelligence" },
  { label: "Tech", query: "technology" },
  { label: "Software", query: "software development" },
  { label: "Automation", query: "business automation" },
];

function NewsInsights() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/news?topic=${encodeURIComponent(activeTopic.query)}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [activeTopic]);

  return (
    <>
      <main className="news-insights-page">
        <section className="news-hero-band">
          <div className="news-hero">
            <div>
              <p className="news-kicker">
                <span></span>
                News
              </p>

              <h1>Ideas shaping AI, software, and modern business.</h1>
            </div>

            <div className="news-hero-image">
              <img
                src="/images/TDXAIMain.png"
                alt="Artificial intelligence and business technology"
              />
            </div>
          </div>
        </section>

        <section className="news-main">
          <div className="news-tabs">
            {topics.map((topic) => (
              <button
                key={topic.label}
                className={activeTopic.label === topic.label ? "active" : ""}
                onClick={() => setActiveTopic(topic)}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {loading && <p className="news-status">Loading latest articles...</p>}

          {!loading && articles.length === 0 && (
            <p className="news-status">
              No articles found right now. Check back soon.
            </p>
          )}

          {!loading && articles.length > 0 && (
            <div className="news-grid-large">
              {articles.map((article) => {
                const sourceName =
                  typeof article.source === "string"
                    ? article.source
                    : article.source?.name || "Technology News";

                return (
                  <a
                    key={article.url || article.title}
                    className="news-large-card"
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title || "News article"}
                      />
                    )}

                    <div className="news-large-card-content">
                      <p className="news-source">{sourceName}</p>

                      <h2>{article.title || "Untitled article"}</h2>

                      {article.description && <p>{article.description}</p>}

                      <span>Read article</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default NewsInsights;