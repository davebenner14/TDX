import { getWeatherDetails } from "./weatherCodes";

function SunIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle
        cx="60"
        cy="60"
        r="22"
        fill="currentColor"
        className="techWeatherIconSunCore"
      />

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M60 10v14" />
        <path d="M60 96v14" />
        <path d="M10 60h14" />
        <path d="M96 60h14" />
        <path d="M24.6 24.6l9.9 9.9" />
        <path d="M85.5 85.5l9.9 9.9" />
        <path d="M95.4 24.6l-9.9 9.9" />
        <path d="M34.5 85.5l-9.9 9.9" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path
        d="M83 88c-26 0-47-21-47-47 0-10 3-19 8-27-20 7-34 26-34 48 0 28 23 51 51 51 22 0 41-14 48-34-8 6-17 9-26 9Z"
        fill="currentColor"
      />
      <circle cx="88" cy="28" r="4" fill="currentColor" opacity="0.8" />
      <circle cx="101" cy="45" r="2.5" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

function CloudIcon({ night = false }) {
  return (
    <svg viewBox="0 0 140 120" aria-hidden="true">
      {night ? (
        <path
          d="M98 12c-14 4-23 17-23 31 0 11 5 20 13 26-18-2-32-17-32-36 0-7 2-14 6-20-15 5-25 19-25 35 0 21 17 38 38 38 17 0 31-11 36-26-4 2-9 3-14 3-17 0-31-14-31-31 0-8 3-15 8-20 7-3 15-3 24 0Z"
          fill="currentColor"
          opacity="0.55"
        />
      ) : (
        <circle
          cx="96"
          cy="34"
          r="21"
          fill="currentColor"
          opacity="0.65"
        />
      )}

      <path
        d="M42 94h66c14 0 25-11 25-25s-11-25-25-25c-3 0-6 .5-9 1.6C94 31 81 21 65 21 45 21 29 36 27 56h-1C12 56 2 66 2 79s10 23 23 23h17Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RainIcon({ storm = false }) {
  return (
    <svg viewBox="0 0 140 140" aria-hidden="true">
      <path
        d="M39 80h70c14 0 25-11 25-25s-11-25-25-25c-3 0-7 .7-10 2C92 19 79 11 64 11 44 11 28 26 26 46h-1C12 46 2 56 2 69s10 23 23 23h14Z"
        fill="currentColor"
      />

      {storm ? (
        <>
          <path
            d="M67 79 50 108h17l-6 25 29-37H73l8-17Z"
            fill="currentColor"
            className="techWeatherIconLightning"
          />
          <path
            d="M35 103 28 118"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M108 103 101 118"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M35 101 27 119"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M67 101 59 119"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M99 101 91 119"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function SnowIcon() {
  return (
    <svg viewBox="0 0 140 140" aria-hidden="true">
      <path
        d="M39 75h70c14 0 25-11 25-25s-11-25-25-25c-3 0-7 .7-10 2C92 14 79 6 64 6 44 6 28 21 26 41h-1C12 41 2 51 2 64s10 23 23 23h14Z"
        fill="currentColor"
      />

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M38 99v28" />
        <path d="M26 106l24 14" />
        <path d="M50 106l-24 14" />

        <path d="M72 99v28" />
        <path d="M60 106l24 14" />
        <path d="M84 106l-24 14" />

        <path d="M106 99v28" />
        <path d="M94 106l24 14" />
        <path d="M118 106l-24 14" />
      </g>
    </svg>
  );
}

function FogIcon() {
  return (
    <svg viewBox="0 0 140 130" aria-hidden="true">
      <path
        d="M39 67h70c14 0 25-11 25-25s-11-25-25-25c-3 0-7 .7-10 2C92 7 79 0 64 0 44 0 28 15 26 35h-1C12 35 2 45 2 58s10 23 23 23h14Z"
        fill="currentColor"
      />

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.75"
      >
        <path d="M19 94h102" />
        <path d="M31 110h78" />
        <path d="M45 126h50" />
      </g>
    </svg>
  );
}

function WeatherIcon({ code, isDay = true, className = "" }) {
  const weather = getWeatherDetails(code);

  let icon = null;

  switch (weather.type) {
    case "clear":
      icon = isDay ? <SunIcon /> : <MoonIcon />;
      break;

    case "cloudy":
      icon = <CloudIcon night={!isDay} />;
      break;

    case "rain":
    case "freezing":
      icon = <RainIcon />;
      break;

    case "snow":
      icon = <SnowIcon />;
      break;

    case "fog":
      icon = <FogIcon />;
      break;

    case "storm":
      icon = <RainIcon storm />;
      break;

    default:
      icon = <CloudIcon night={!isDay} />;
  }

  return (
    <div
      className={`techWeatherIcon techWeatherIcon--${weather.type} ${className}`}
      role="img"
      aria-label={weather.label}
    >
      {icon}
    </div>
  );
}

export default WeatherIcon;