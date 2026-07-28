import MoonPhase from "./MoonPhase";

function DetailedSun({ partlyCloudy = false }) {
  return (
    <div className="weatherArt weatherArtSun">
      <div className="sunGlow" />

      <div className="sunRays" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            style={{
              transform: `rotate(${index * 45}deg) translateY(-55px)`,
            }}
          />
        ))}
      </div>

      <div className="sunBody">
        <div className="sunHighlight" />
        <div className="sunShade" />
      </div>

      {partlyCloudy && (
        <div className="weatherCloud weatherCloudFront">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}

function DetailedCloud({
  rain = false,
  snow = false,
  storm = false,
}) {
  return (
    <div className="weatherArt weatherArtCloud">
      <div className="weatherCloud weatherCloudLarge">
        <span />
        <span />
        <span />
      </div>

      {rain && (
        <div className="rainDrops">
          <span />
          <span />
          <span />
        </div>
      )}

      {snow && (
        <div className="snowFlakes">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      )}

      {storm && (
        <div className="lightningBolt">
          <span />
        </div>
      )}
    </div>
  );
}

function getSimpleWeatherSymbol(code, isDay, date) {
  const numericCode = Number(code);

  if (!isDay && numericCode <= 3) {
    return <MoonPhase date={date} compact />;
  }

  if (numericCode === 0 || numericCode === 1) {
    return <span className="simpleWeatherSymbol simpleSun">☀</span>;
  }

  if (numericCode === 2) {
    return <span className="simpleWeatherSymbol">🌤️</span>;
  }

  if (numericCode === 3) {
    return <span className="simpleWeatherSymbol">☁️</span>;
  }

  if ([45, 48].includes(numericCode)) {
    return <span className="simpleWeatherSymbol">🌫️</span>;
  }

  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(
      numericCode
    )
  ) {
    return <span className="simpleWeatherSymbol">🌧️</span>;
  }

  if ([71, 73, 75, 77, 85, 86].includes(numericCode)) {
    return <span className="simpleWeatherSymbol">🌨️</span>;
  }

  if ([95, 96, 99].includes(numericCode)) {
    return <span className="simpleWeatherSymbol">⛈️</span>;
  }

  return isDay ? (
    <span className="simpleWeatherSymbol">🌤️</span>
  ) : (
    <MoonPhase date={date} compact />
  );
}

function WeatherIcon({
  code = 0,
  isDay = true,
  date = new Date(),
  size = "large",
}) {
  const numericCode = Number(code);
  const isCompact = size === "small" || size === "medium";

  if (isCompact) {
    return (
      <div className={`weatherIcon weatherIcon-${size} weatherIconCompact`}>
        {getSimpleWeatherSymbol(numericCode, isDay, date)}
      </div>
    );
  }

  if (!isDay && numericCode <= 3) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <MoonPhase date={date} compact />

        {numericCode >= 2 && (
          <div className="nightCloud weatherCloud">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    );
  }

  if (numericCode === 0 || numericCode === 1) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <DetailedSun />
      </div>
    );
  }

  if (numericCode === 2) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <DetailedSun partlyCloudy />
      </div>
    );
  }

  if (numericCode === 3) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <DetailedCloud />
      </div>
    );
  }

  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(
      numericCode
    )
  ) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <DetailedCloud rain />
      </div>
    );
  }

  if ([71, 73, 75, 77, 85, 86].includes(numericCode)) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <DetailedCloud snow />
      </div>
    );
  }

  if ([95, 96, 99].includes(numericCode)) {
    return (
      <div className="weatherIcon weatherIcon-large">
        <DetailedCloud rain storm />
      </div>
    );
  }

  return (
    <div className="weatherIcon weatherIcon-large">
      <DetailedSun partlyCloudy />
    </div>
  );
}

export default WeatherIcon;