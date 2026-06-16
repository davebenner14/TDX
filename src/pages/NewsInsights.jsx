import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./NewsInsights.css";

const topics = [
  { label: "AI", query: "artificial intelligence" },
  { label: "Tech", query: "technology" },
  { label: "Software", query: "software development" },
  { label: "Automation", query: "business automation" },
];

function getText(value, fallback = "") {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function getSourceName(source) {
  if (typeof source === "string") return source;

  if (source && typeof source === "object") {
    return source.name || source.id || "Technology News";
  }

  return "Technology News";
}

function NewsInsights() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `/api/news?topic=${encodeURIComponent(activeTopic.query)}&limit=18`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        return res.json();
      })
      .then((data) => {
        const cleanArticles = Array.isArray(data) ? data : [];
        setArticles(cleanArticles);
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
              {articles.map((article, index) => {
                const title = getText(article.title, "Untitled article");
                const description = getText(
                  article.description,
                  "Read the latest article."
                );
                const sourceName = getSourceName(article.source);
                const image = getText(article.image, "");
                const url = getText(article.url, "#");

                return (
                  <a
                    key={url !== "#" ? url : `${title}-${index}`}
                    className="news-large-card"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {image ? (
                      <img src={image} alt={title} />
                    ) : (
                      <div className="news-card-placeholder" />
                    )}

                    <div className="news-large-card-content">
                      <p className="news-source">{sourceName}</p>

                      <h2>{title}</h2>

                      <p>{description}</p>

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