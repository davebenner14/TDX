import { useEffect, useState } from "react";
import "./TechWeather.css";

const DEFAULT_LOCATION = {
  latitude: 43.8828,
  longitude: -79.4403,
  city: "Richmond Hill",
  region: "Ontario",
};

function getWeatherInformation(code) {
  const weatherCode = Number(code);

  if (weatherCode === 0 || weatherCode === 1) {
    return {
      type: "clear",
      label: weatherCode === 0 ? "Clear" : "Mainly Clear",
    };
  }

  if ([2, 3, 45, 48].includes(weatherCode)) {
    return {
      type: "cloud",
      label:
        weatherCode === 2
          ? "Partly Cloudy"
          : weatherCode >= 45
            ? "Foggy"
            : "Cloudy",
    };
  }

  if (
    [
      51,
      53,
      55,
      56,
      57,
      61,
      63,
      65,
      66,
      67,
      80,
      81,
      82,
      95,
      96,
      99,
    ].includes(weatherCode)
  ) {
    return {
      type: "rain",
      label: weatherCode >= 95 ? "Thunderstorm" : "Rain",
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return {
      type: "snow",
      label: "Snow",
    };
  }

  return {
    type: "cloud",
    label: "Current Weather",
  };
}

function getMinutesFromTime(value) {
  if (!value || !value.includes("T")) {
    return null;
  }

  const time = value.split("T")[1];
  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}

function getDateFromTime(value) {
  if (!value || !value.includes("T")) {
    return "";
  }

  return value.split("T")[0];
}

function getSkyPhase(time, sunrise, sunset, isDay) {
  const currentMinutes = getMinutesFromTime(time);
  const sunriseMinutes = getMinutesFromTime(sunrise);
  const sunsetMinutes = getMinutesFromTime(sunset);

  if (
    currentMinutes === null ||
    sunriseMinutes === null ||
    sunsetMinutes === null
  ) {
    return isDay ? "day" : "night";
  }

  const dawnStart = sunriseMinutes - 60;
  const dawnEnd = sunriseMinutes + 35;

  const sunsetStart = sunsetMinutes - 75;
  const sunsetEnd = sunsetMinutes + 45;

  if (
    currentMinutes >= dawnStart &&
    currentMinutes <= dawnEnd
  ) {
    return "dawn";
  }

  if (
    currentMinutes >= sunsetStart &&
    currentMinutes <= sunsetEnd
  ) {
    return "sunset";
  }

  if (currentMinutes > dawnEnd && currentMinutes < sunsetStart) {
    return "day";
  }

  return "night";
}

function formatHour(value, index) {
  if (index === 0) {
    return "Now";
  }

  if (!value || !value.includes("T")) {
    return "";
  }

  const [hoursText] = value.split("T")[1].split(":");
  const hours = Number(hoursText);

  if (hours === 0) {
    return "12 a.m.";
  }

  if (hours === 12) {
    return "12 p.m.";
  }

  if (hours > 12) {
    return `${hours - 12} p.m.`;
  }

  return `${hours} a.m.`;
}

function findSunTimes(hourTime, daily) {
  const hourDate = getDateFromTime(hourTime);

  const matchingIndex = daily?.time?.findIndex(
    (day) => day === hourDate
  );

  const safeIndex =
    matchingIndex !== undefined && matchingIndex >= 0
      ? matchingIndex
      : 0;

  return {
    sunrise: daily?.sunrise?.[safeIndex],
    sunset: daily?.sunset?.[safeIndex],
  };
}

function WeatherVisual({
  type,
  isDay,
  compact = false,
  partlyCloudy = false,
}) {
  const sizeClass = compact
    ? "weatherVisual weatherVisualCompact"
    : "weatherVisual";

  if (!isDay && type === "clear") {
    return (
      <div className={`${sizeClass} weatherMoon`}>
        <div className="weatherMoonBody">
          <span className="moonMark moonMarkOne" />
          <span className="moonMark moonMarkTwo" />
          <span className="moonMark moonMarkThree" />
        </div>
      </div>
    );
  }

  if (!isDay && type === "cloud") {
    return (
      <div className={`${sizeClass} weatherNightCloud`}>
        <div className="weatherMoon weatherMoonBehind">
          <div className="weatherMoonBody">
            <span className="moonMark moonMarkOne" />
            <span className="moonMark moonMarkTwo" />
          </div>
        </div>

        <CloudVisual dark />
      </div>
    );
  }

  if (type === "clear") {
    return (
      <div className={`${sizeClass} weatherSun`}>
        <div className="weatherSunGlow" />

        <div className="weatherSunBody">
          <span />
        </div>
      </div>
    );
  }

  if (type === "rain") {
    return (
      <div className={sizeClass}>
        <CloudVisual dark />

        <div className="weatherRain">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (type === "snow") {
    return (
      <div className={sizeClass}>
        <CloudVisual />

        <div className="weatherSnow">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>
    );
  }

  if (partlyCloudy) {
    return (
      <div className={`${sizeClass} weatherPartlyCloudy`}>
        <div className="weatherSun weatherSunBehind">
          <div className="weatherSunGlow" />

          <div className="weatherSunBody">
            <span />
          </div>
        </div>

        <CloudVisual />
      </div>
    );
  }

  return (
    <div className={sizeClass}>
      <CloudVisual dark={!isDay} />
    </div>
  );
}

function CloudVisual({ dark = false }) {
  return (
    <div className={`weatherCloud ${dark ? "weatherCloudDark" : ""}`}>
      <span className="cloudCircle cloudCircleOne" />
      <span className="cloudCircle cloudCircleTwo" />
      <span className="cloudCircle cloudCircleThree" />
      <span className="cloudBase" />
    </div>
  );
}

function ForecastCard({ hour, index, daily }) {
  const weatherInformation = getWeatherInformation(hour.weatherCode);

  const sunTimes = findSunTimes(hour.time, daily);

  const phase = getSkyPhase(
    hour.time,
    sunTimes.sunrise,
    sunTimes.sunset,
    Boolean(hour.isDay)
  );

  const cardClasses = [
    "forecastCard",
    `forecastCard-${phase}`,
    `forecastCard-${weatherInformation.type}`,
  ].join(" ");

  return (
    <article className={cardClasses}>
      <div className="forecastCardStars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="forecastCardWeatherTint" />

      <span className="forecastTime">
        {formatHour(hour.time, index)}
      </span>

      <div className="forecastIconArea">
        <WeatherVisual
          type={weatherInformation.type}
          isDay={Boolean(hour.isDay)}
          compact
          partlyCloudy={Number(hour.weatherCode) === 2}
        />
      </div>

      <strong className="forecastTemperature">
        {Math.round(hour.temperature)}°
      </strong>

      <span className="forecastCondition">
        {weatherInformation.label}
      </span>

      <span className="forecastRainChance">
        <i aria-hidden="true">●</i>
        {hour.precipitationProbability}%
      </span>
    </article>
  );
}

function TechWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [findingLocation, setFindingLocation] = useState(false);
  const [error, setError] = useState("");

  async function getLocationName(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error("Location lookup failed.");
      }

      const result = await response.json();

      return {
        latitude,
        longitude,
        city:
          result.city ||
          result.locality ||
          result.principalSubdivision ||
          "Current Location",
        region: result.principalSubdivision || "",
      };
    } catch (locationError) {
      console.error(locationError);

      return {
        latitude,
        longitude,
        city: "Current Location",
        region: "",
      };
    }
  }

  async function loadWeather(selectedLocation) {
    try {
      setLoading(true);
      setError("");

      const { latitude, longitude } = selectedLocation;

      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day,weather_code` +
        `&hourly=temperature_2m,weather_code,is_day,precipitation_probability` +
        `&daily=sunrise,sunset` +
        `&forecast_days=2` +
        `&timezone=auto`;

      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error("Unable to load the current weather.");
      }

      const result = await response.json();

      setWeatherData(result);
      setLocation(selectedLocation);
    } catch (weatherError) {
      console.error(weatherError);

      setError(
        weatherError.message ||
          "Current weather is temporarily unavailable."
      );
    } finally {
      setLoading(false);
    }
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Location services are not supported by this browser.");
      return;
    }

    setFindingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const selectedLocation = await getLocationName(
          position.coords.latitude,
          position.coords.longitude
        );

        await loadWeather(selectedLocation);
        setFindingLocation(false);
      },

      (locationError) => {
        console.error(locationError);

        setError(
          "We could not access your location. Richmond Hill is still being shown."
        );

        setFindingLocation(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  useEffect(() => {
    loadWeather(DEFAULT_LOCATION);
  }, []);

  const current = weatherData?.current;
  const hourly = weatherData?.hourly;
  const daily = weatherData?.daily;

  const currentWeather = getWeatherInformation(current?.weather_code);
  const isDay = Boolean(current?.is_day);

  const currentSunTimes = findSunTimes(current?.time, daily);

  const currentPhase = getSkyPhase(
    current?.time,
    currentSunTimes.sunrise,
    currentSunTimes.sunset,
    isDay
  );

  const locationName = [location.city, location.region]
    .filter(Boolean)
    .join(", ");

  let twelveHourForecast = [];

  if (current && hourly?.time?.length) {
    let currentIndex = hourly.time.findIndex(
      (time) => time >= current.time
    );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    twelveHourForecast = hourly.time
      .slice(currentIndex, currentIndex + 12)
      .map((time, offset) => {
        const index = currentIndex + offset;

        return {
          time,
          temperature: hourly.temperature_2m[index],
          weatherCode: hourly.weather_code[index],
          isDay: hourly.is_day[index],
          precipitationProbability:
            hourly.precipitation_probability[index] ?? 0,
        };
      });
  }

  const sceneClass = [
    "currentWeather",
    `currentWeather-${currentPhase}`,
    `currentWeather-${currentWeather.type}`,
  ].join(" ");

  return (
    <section className={sceneClass}>
      <div className="currentWeatherAtmosphere" aria-hidden="true">
        <div className="currentWeatherStars">
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              style={{
                "--star-left": `${(index * 41) % 100}%`,
                "--star-top": `${(index * 29) % 82}%`,
                "--star-delay": `${(index % 7) * -0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="currentWeatherHorizon" />
        <div className="currentWeatherConditionTint" />
      </div>

      <div className="currentWeatherContainer">
        <div className="currentWeatherTopbar">
          <div>
            <span className="currentWeatherBrand">TDX WEATHER</span>

            <span className="currentWeatherStatus">
              <i />
              Live conditions
            </span>
          </div>

          <button
            type="button"
            className="currentWeatherLocationButton"
            onClick={useCurrentLocation}
            disabled={findingLocation}
          >
            <span aria-hidden="true">⌖</span>

            {findingLocation ? "Finding you..." : "Use My Location"}
          </button>
        </div>

        <div className="currentWeatherCard">
          {loading && (
            <div className="currentWeatherMessage">
              <div className="currentWeatherLoader" />
              <p>Loading current weather...</p>
            </div>
          )}

          {!loading && error && !current && (
            <div className="currentWeatherMessage">
              <strong>Weather unavailable</strong>
              <p>{error}</p>

              <button
                type="button"
                onClick={() => loadWeather(DEFAULT_LOCATION)}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && current && (
            <>
              <div className="currentWeatherLocation">
                <span>Current location</span>
                <h2>{locationName}</h2>
              </div>

              <div className="currentWeatherMain">
                <div className="currentWeatherArtwork">
                  <WeatherVisual
                    type={currentWeather.type}
                    isDay={isDay}
                    partlyCloudy={Number(current.weather_code) === 2}
                  />
                </div>

                <div className="currentWeatherReading">
                  <div className="currentWeatherTemperature">
                    <span>{Math.round(current.temperature_2m)}</span>
                    <sup>°C</sup>
                  </div>

                  <strong>{currentWeather.label}</strong>

                  <p>
                    Feels like{" "}
                    {Math.round(current.apparent_temperature)}°C
                  </p>
                </div>
              </div>

              <div className="currentWeatherFacts">
                <div>
                  <span>Humidity</span>
                  <strong>{current.relative_humidity_2m}%</strong>
                </div>

                <div>
                  <span>Wind</span>
                  <strong>
                    {Math.round(current.wind_speed_10m)} km/h
                  </strong>
                </div>

                <div>
                  <span>Sky</span>
                  <strong>
                    {currentPhase === "sunset"
                      ? "Sunset"
                      : currentPhase === "dawn"
                        ? "Dawn"
                        : currentPhase === "night"
                          ? "Night"
                          : "Day"}
                  </strong>
                </div>
              </div>

              {error && (
                <p className="currentWeatherError">{error}</p>
              )}
            </>
          )}
        </div>

        {!loading && twelveHourForecast.length > 0 && (
          <div className="forecastSection">
            <div className="forecastHeader">
              <div>
                <span>UPCOMING CONDITIONS</span>
                <h3>12-hour forecast</h3>
              </div>

              <span className="forecastTimezone">
                {weatherData?.timezone}
              </span>
            </div>

            <div className="forecastScroller">
              <div className="forecastGrid">
                {twelveHourForecast.map((hour, index) => (
                  <ForecastCard
                    key={hour.time}
                    hour={hour}
                    index={index}
                    daily={daily}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TechWeather;