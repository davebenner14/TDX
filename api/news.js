export default async function handler(req, res) {
  try {
    const query = encodeURIComponent(
      '"artificial intelligence" OR "machine learning" OR "OpenAI" OR "Anthropic" OR "Google DeepMind" OR "automation"'
    );

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${query}&lang=en&max=6&apikey=${process.env.GNEWS_API_KEY}`
    );

    const data = await response.json();

    const articles = data.articles || [];

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}