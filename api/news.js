export default async function handler(req, res) {
  try {
    const topic = req.query.topic || "artificial intelligence";
    const limit = Number(req.query.limit) || 18;

    const safeLimit = Math.min(Math.max(limit, 1), 30);

    const topicQueries = {
      "artificial intelligence":
        '"artificial intelligence" OR "machine learning" OR "OpenAI" OR "Anthropic" OR "Google DeepMind"',
      technology:
        '"technology" OR "big tech" OR "startups" OR "innovation" OR "semiconductors"',
      "software development":
        '"software development" OR "developer tools" OR "SaaS" OR "cloud computing" OR "programming"',
      "business automation":
        '"automation" OR "workflow automation" OR "business process automation" OR "AI agents" OR "enterprise software"',
    };

    const selectedQuery = topicQueries[topic] || topic;

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        selectedQuery
      )}&lang=en&max=${safeLimit}&apikey=${process.env.GNEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("GNews request failed");
    }

    const data = await response.json();

    const articles = data.articles || [];

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}