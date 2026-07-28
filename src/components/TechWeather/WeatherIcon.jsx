import MoonPhase from "./MoonPhase";

function SunIcon({ partlyCloudy = false }) {
  return (
    <div className="weatherArt weatherArtSun">
      <div className="sunGlow" />

      <div className="sunRays" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            style={{
              transform: `rotate(${index * 30}deg) translateY(-58px)`,
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

function CloudIcon({ rain = false, snow = false, storm = false }) {
  return (
    <div className="weatherArt weatherArtCloud">
      <div className="weatherCloud weatherCloudLarge">
        <span />
        <span />
        <span />
      </div>

      {rain && (
        <div className="rainDrops" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      {snow && (
        <div className="snowFlakes" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      )}

      {storm && (
        <div className="lightningBolt" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  );
}

function FogIcon() {
  return (
    <div className="weatherArt weatherArtFog">
      <div className="fogCloud weatherCloud weatherCloudLarge">
        <span />
        <span />
        <span />
      </div>

      <div className="fogLines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function WeatherIcon({
  code = 0,
  isDay = true,
  date = new Date(),
  size = "large",
}) {
  const className = `weatherIcon weatherIcon${size}`;

  if (!isDay && code <= 3) {
    return (
      <div className={className}>
        <MoonPhase date={date} compact />

        {code === 2 || code === 3 ? (
          <div className="nightCloud weatherCloud">
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
    );
  }

  if (code === 0 || code === 1) {
    return (
      <div className={className}>
        <SunIcon />
      </div>
    );
  }

  if (code === 2) {
    return (
      <div className={className}>
        <SunIcon partlyCloudy />
      </div>
    );
  }

  if (code === 3) {
    return (
      <div className={className}>
        <CloudIcon />
      </div>
    );
  }

  if (code === 45 || code === 48) {
    return (
      <div className={className}>
        <FogIcon />
      </div>
    );
  }

  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return (
      <div className={className}>
        <CloudIcon rain />
      </div>
    );
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return (
      <div className={className}>
        <CloudIcon snow />
      </div>
    );
  }

  if ([95, 96, 99].includes(code)) {
    return (
      <div className={className}>
        <CloudIcon rain storm />
      </div>
    );
  }

  return (
    <div className={className}>
      {isDay ? <SunIcon partlyCloudy /> : <MoonPhase date={date} compact />}
    </div>
  );
}

export default WeatherIcon;