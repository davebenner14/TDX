import { useState } from "react";
import "./TechCarousel.css";

const technologies = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "000000" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS", slug: "css", color: "663399" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },

  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "Airtable", slug: "airtable", color: "18BFFF" },

  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
  { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Git", slug: "git", color: "F05032" },

  { name: "Shopify", slug: "shopify", color: "7AB55C" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "PayPal", slug: "paypal", color: "003087" },
  { name: "WooCommerce", slug: "woocommerce", color: "96588A" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },

  { name: "OpenAI", slug: "openai", color: "10A37F" },
  { name: "Claude", slug: "claude", color: "D97757" },
  { name: "Gemini", slug: "googlegemini", color: "8E75B2" },
  { name: "Anthropic", slug: "anthropic", color: "191919" },
  { name: "Perplexity", slug: "perplexity", color: "1FB8CD" },
  { name: "GitHub Copilot", slug: "githubcopilot", color: "000000" },

  { name: "Zapier", slug: "zapier", color: "FF4A00" },
  { name: "Make", slug: "make", color: "6D00CC" },
  { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
  { name: "Google Analytics", slug: "googleanalytics", color: "E37400" },
  { name: "Google Workspace", slug: "google", color: "4285F4" },
  { name: "Microsoft 365", slug: "microsoft", color: "5E5E5E" },
  { name: "Mailchimp", slug: "mailchimp", color: "FFE01B" },
  { name: "Slack", slug: "slack", color: "4A154B" },
  { name: "Notion", slug: "notion", color: "000000" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
];

const logoUrl = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;

export default function TechCarousel() {
  const [showAll, setShowAll] = useState(false);
  const repeatedTech = [...technologies, ...technologies];

  return (
    <section className="techCarouselSection snapSection">
      <div className="techIntro">
        <p className="eyebrow">PLATFORMS & TECHNOLOGIES</p>

        <h2>Built on proven platforms.</h2>

        <p>
          From AI agents and automation to custom software and data systems, we
          build on modern platforms trusted by organizations around the world.
        </p>
      </div>

      {!showAll ? (
        <div className="techCarousel">
          <div className="techTrack">
            {repeatedTech.map((tech, index) => (
              <div
                className="techLogoCard"
                key={`${tech.name}-${index}`}
                style={{ "--brand-color": `#${tech.color}` }}
              >
                <img
                  src={logoUrl(tech.slug, tech.color)}
                  alt={`${tech.name} logo`}
                />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="techGrid">
          {technologies.map((tech) => (
            <div
              className="techLogoCard"
              key={tech.name}
              style={{ "--brand-color": `#${tech.color}` }}
            >
              <img
                src={logoUrl(tech.slug, tech.color)}
                alt={`${tech.name} logo`}
              />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="techButtonWrap">
        <button className="showTechBtn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Carousel" : "Show Full Stack"}
        </button>
      </div>
    </section>
  );
}