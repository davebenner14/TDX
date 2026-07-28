function ForecastSun() {
  return (
    <div className="forecastIcon forecastIconSun">
      <span />
    </div>
  );
}

function ForecastMoon() {
  return (
    <div className="forecastIcon forecastIconMoon">
      <span className="forecastMoonCrater forecastMoonCraterOne" />
      <span className="forecastMoonCrater forecastMoonCraterTwo" />
    </div>
  );
}

function ForecastCloud({ dark = false }) {
  return (
    <div className={`forecastIconCloud ${dark ? "forecastIconCloudDark" : ""}`}>
      <span className="forecastCloudPart forecastCloudPartOne" />
      <span className="forecastCloudPart forecastCloudPartTwo" />
      <span className="forecastCloudBase" />
    </div>
  );
}

function ForecastPartlyCloudy() {
  return (
    <div className="forecastIcon forecastIconCombined">
      <div className="forecastMiniSun" />
      <ForecastCloud />
    </div>
  );
}

function ForecastNightCloud() {
  return (
    <div className="forecastIcon forecastIconCombined">
      <div className="forecastMiniMoon" />
      <ForecastCloud dark />
    </div>
  );
}

function ForecastRain() {
  return (
    <div className="forecastIcon forecastIconPrecipitation">
      <ForecastCloud dark />

      <div className="forecastDrops">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function ForecastSnow() {
  return (
    <div className="forecastIcon forecastIconPrecipitation">
      <ForecastCloud />

      <div className="forecastSnowflakes">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>
    </div>
  );
}

function ForecastIcon({
  type,
  isDay,
  partlyCloudy = false,
}) {
  if (type === "rain") {
    return <ForecastRain />;
  }

  if (type === "snow") {
    return <ForecastSnow />;
  }

  if (!isDay && type === "clear") {
    return <ForecastMoon />;
  }

  if (!isDay && type === "cloud") {
    return <ForecastNightCloud />;
  }

  if (type === "cloud") {
    return partlyCloudy ? (
      <ForecastPartlyCloudy />
    ) : (
      <ForecastCloud />
    );
  }

  return <ForecastSun />;
}

export default ForecastIcon;