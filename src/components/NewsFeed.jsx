import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch(console.error);
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
          Stay current with the latest developments in artificial
          intelligence, automation, software, and emerging technology.
        </p>
      </div>

      <div className="newsGrid">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="newsCard"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
              />
            )}

            <div className="newsCardContent">
              <h3>{article.title}</h3>

              <p>{article.description}</p>

              <span>{article.source?.name}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}