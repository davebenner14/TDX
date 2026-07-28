import MoonPhase from "./MoonPhase";
import { getWeatherType } from "./weatherCodes";

function SunIcon() {
  return (
    <div className="simpleSun" aria-label="Sunny">
      <div className="simpleSunGlow" />

      <div className="simpleSunRays">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            style={{
              transform: `rotate(${index * 45}deg) translateY(-56px)`,
            }}
          />
        ))}
      </div>

      <div className="simpleSunBody">
        <span className="simpleSunHighlight" />
      </div>
    </div>
  );
}

function CloudIcon({ dark = false }) {
  return (
    <div
      className={`simpleCloud ${dark ? "simpleCloudDark" : ""}`}
      aria-label="Cloudy"
    >
      <span className="simpleCloudPart simpleCloudPartOne" />
      <span className="simpleCloudPart simpleCloudPartTwo" />
      <span className="simpleCloudPart simpleCloudPartThree" />
      <span className="simpleCloudBase" />
    </div>
  );
}

function RainIcon() {
  return (
    <div className="simpleWeatherArtwork" aria-label="Rain">
      <CloudIcon dark />

      <div className="simpleRain">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function SnowIcon() {
  return (
    <div className="simpleWeatherArtwork" aria-label="Snow">
      <CloudIcon />

      <div className="simpleSnow">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>
    </div>
  );
}

function PartlyCloudyIcon() {
  return (
    <div className="simpleWeatherArtwork" aria-label="Partly cloudy">
      <div className="simpleSun simpleSunBehindCloud">
        <div className="simpleSunGlow" />

        <div className="simpleSunBody">
          <span className="simpleSunHighlight" />
        </div>
      </div>

      <CloudIcon />
    </div>
  );
}

function WeatherIcon({ code = 0, isDay = true }) {
  const weatherType = getWeatherType(code);

  if (!isDay) {
    if (weatherType === "rain") {
      return <RainIcon />;
    }

    if (weatherType === "snow") {
      return <SnowIcon />;
    }

    if (weatherType === "cloudy") {
      return (
        <div className="simpleWeatherArtwork">
          <MoonPhase />
          <div className="simpleNightCloud">
            <CloudIcon dark />
          </div>
        </div>
      );
    }

    return <MoonPhase />;
  }

  if (weatherType === "rain") {
    return <RainIcon />;
  }

  if (weatherType === "snow") {
    return <SnowIcon />;
  }

  if (weatherType === "cloudy") {
    if (Number(code) === 2) {
      return <PartlyCloudyIcon />;
    }

    return <CloudIcon />;
  }

  return <SunIcon />;
}

export default WeatherIcon;