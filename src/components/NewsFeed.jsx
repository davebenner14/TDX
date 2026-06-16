import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        return res.json();
      })
      .then((data) => {
        console.log("NewsFeed API Response:", data);

        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="newsSection snapSection">
      <div className="newsIntro">
        <p className="eyebrow">LATEST INSIGHTS</p>

        <h2>
          AI.
          <br />
          Technology.
          <br />
          Innovation.
        </h2>

        <p>
          Stay current with the latest developments in artificial intelligence,
          automation, software, and emerging technology.
        </p>
      </div>

      {loading && (
        <p className="newsStatus">
          Loading latest technology news...
        </p>
      )}

      {!loading && articles.length === 0 && (
        <p className="newsStatus">
          No articles available right now.
        </p>
      )}

      <div className="newsGrid">
        {articles.map((article, index) => {
          const sourceName =
            typeof article.source === "string"
              ? article.source
              : article.source?.name || "Technology News";

          return (
            <a
              key={article.url || index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsCard"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title || "News article"}
                />
              ) : (
                <div className="newsPlaceholder" />
              )}

              <div className="newsCardContent">
                <h3>{article.title || "Untitled Article"}</h3>

                <p>
                  {article.description ||
                    "Read the latest article."}
                </p>

                <span>{sourceName}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}