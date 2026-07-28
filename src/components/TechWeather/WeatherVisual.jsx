function SunVisual() {
  return (
    <div className="heroWeatherVisual heroSun">
      <div className="heroSunGlow" />

      <div className="heroSunBody">
        <span />
      </div>
    </div>
  );
}

function MoonVisual() {
  return (
    <div className="heroWeatherVisual heroMoon">
      <div className="heroMoonBody">
        <span className="heroMoonCrater heroMoonCraterOne" />
        <span className="heroMoonCrater heroMoonCraterTwo" />
        <span className="heroMoonCrater heroMoonCraterThree" />
      </div>
    </div>
  );
}

function CloudShape({ dark = false }) {
  return (
    <div className={`heroCloud ${dark ? "heroCloudDark" : ""}`}>
      <span className="heroCloudPart heroCloudPartOne" />
      <span className="heroCloudPart heroCloudPartTwo" />
      <span className="heroCloudPart heroCloudPartThree" />
      <span className="heroCloudBase" />
    </div>
  );
}

function CloudVisual({ dark = false }) {
  return (
    <div className="heroWeatherVisual">
      <CloudShape dark={dark} />
    </div>
  );
}

function PartlyCloudyVisual() {
  return (
    <div className="heroWeatherVisual heroPartlyCloudy">
      <div className="heroSun heroSunBehind">
        <div className="heroSunGlow" />

        <div className="heroSunBody">
          <span />
        </div>
      </div>

      <CloudShape />
    </div>
  );
}

function RainVisual() {
  return (
    <div className="heroWeatherVisual">
      <CloudShape dark />

      <div className="heroRain">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function SnowVisual() {
  return (
    <div className="heroWeatherVisual">
      <CloudShape />

      <div className="heroSnow">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>
    </div>
  );
}

function NightCloudVisual() {
  return (
    <div className="heroWeatherVisual heroNightCloud">
      <div className="heroMoon heroMoonBehind">
        <div className="heroMoonBody">
          <span className="heroMoonCrater heroMoonCraterOne" />
          <span className="heroMoonCrater heroMoonCraterTwo" />
        </div>
      </div>

      <CloudShape dark />
    </div>
  );
}

function WeatherVisual({ type, isDay, partlyCloudy = false }) {
  if (!isDay && type === "clear") {
    return <MoonVisual />;
  }

  if (!isDay && type === "cloud") {
    return <NightCloudVisual />;
  }

  if (type === "rain") {
    return <RainVisual />;
  }

  if (type === "snow") {
    return <SnowVisual />;
  }

  if (type === "cloud") {
    return partlyCloudy && isDay ? (
      <PartlyCloudyVisual />
    ) : (
      <CloudVisual dark={!isDay} />
    );
  }

  return <SunVisual />;
}

export default WeatherVisual;