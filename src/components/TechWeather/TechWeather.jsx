import { useEffect, useState } from "react";
import "./TechWeather.css";

import WeatherVisual from "./WeatherVisual";
import ForecastIcon from "./ForecastIcon";

const DEFAULT_LOCATION = {
  latitude: 43.8828,
  longitude: -79.4403,
  city: "Richmond Hill",
  region: "Ontario",
};

function getWeatherInformation(code, cloudCover = 0) {
  const weatherCode = Number(code);
  const clouds = Number(cloudCover) || 0;

  if (weatherCode === 0 || weatherCode === 1) {
    if (clouds >= 70) {
      return {
        type: "cloud",
        label: "Mostly Cloudy",
        partlyCloudy: false,
      };
    }

    if (clouds >= 25) {
      return {
        type: "cloud",
        label: "Partly Cloudy",
        partlyCloudy: true,
      };
    }

    return {
      type: "clear",
      label: weatherCode === 0 ? "Clear" : "Mainly Clear",
      partlyCloudy: false,
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
      partlyCloudy: weatherCode === 2,
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
      partlyCloudy: false,
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return {
      type: "snow",
      label: "Snow",
      partlyCloudy: false,
    };
  }

  return {
    type: "cloud",
    label: "Current Weather",
    partlyCloudy: false,
  };
}

function getMinutesFromTime(value) {
  if (!value?.includes("T")) {
    return null;
  }

  const [hours, minutes] = value
    .split("T")[1]
    .split(":")
    .map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}

function getDateFromTime(value) {
  return value?.includes("T") ? value.split("T")[0] : "";
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

  if (
    currentMinutes > dawnEnd &&
    currentMinutes < sunsetStart
  ) {
    return "day";
  }

  return "night";
}

function formatHour(value, index) {
  if (index === 0) {
    return "Now";
  }

  if (!value?.includes("T")) {
    return "";
  }

  const hours = Number(value.split("T")[1].split(":")[0]);

  if (hours === 0) {
    return "12 a.m.";
  }

  if (hours === 12) {
    return "12 p.m.";
  }

  return hours > 12
    ? `${hours - 12} p.m.`
    : `${hours} a.m.`;
}

function findSunTimes(hourTime, daily) {
  const date = getDateFromTime(hourTime);

  const index = daily?.time?.findIndex(
    (dailyDate) => dailyDate === date
  );

  const safeIndex = index >= 0 ? index : 0;

  return {
    sunrise: daily?.sunrise?.[safeIndex],
    sunset: daily?.sunset?.[safeIndex],
  };
}

function ForecastCard({ hour, index, daily }) {
  const weather = getWeatherInformation(
    hour.weatherCode,
    hour.cloudCover
  );

  const sunTimes = findSunTimes(hour.time, daily);

  const phase = getSkyPhase(
    hour.time,
    sunTimes.sunrise,
    sunTimes.sunset,
    Boolean(hour.isDay)
  );

  return (
    <article
      className={[
        "forecastCard",
        `forecastCard-${phase}`,
        `forecastCard-${weather.type}`,
      ].join(" ")}
    >
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
        <ForecastIcon
          type={weather.type}
          isDay={Boolean(hour.isDay)}
          partlyCloudy={weather.partlyCloudy}
        />
      </div>

      <strong className="forecastTemperature">
        {Math.round(hour.temperature)}°
      </strong>

      <span className="forecastCondition">
        {weather.label}
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
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover,is_day,weather_code` +
        `&hourly=temperature_2m,weather_code,cloud_cover,is_day,precipitation_probability` +
        `&daily=sunrise,sunset` +
        `&forecast_days=2` +
        `&timezone=auto`;

      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error("Unable to load the weather.");
      }

      const result = await response.json();

      setWeatherData(result);
      setLocation(selectedLocation);
    } catch (weatherError) {
      console.error(weatherError);

      setError(
        weatherError.message ||
          "Weather is temporarily unavailable."
      );
    } finally {
      setLoading(false);
    }
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError(
        "Location services are not supported by this browser."
      );

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

      () => {
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

  const currentWeather = getWeatherInformation(
    current?.weather_code,
    current?.cloud_cover
  );

  const isDay = Boolean(current?.is_day);

  const currentSunTimes = findSunTimes(
    current?.time,
    daily
  );

  const currentPhase = getSkyPhase(
    current?.time,
    currentSunTimes.sunrise,
    currentSunTimes.sunset,
    isDay
  );

  const locationName = [location.city, location.region]
    .filter(Boolean)
    .join(", ");

  let forecast = [];

  if (current && hourly?.time?.length) {
    let currentIndex = hourly.time.findIndex(
      (time) => time >= current.time
    );

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    forecast = hourly.time
      .slice(currentIndex, currentIndex + 12)
      .map((time, offset) => {
        const index = currentIndex + offset;

        return {
          time,
          temperature: hourly.temperature_2m[index],
          weatherCode: hourly.weather_code[index],
          cloudCover: hourly.cloud_cover[index] ?? 0,
          isDay: hourly.is_day[index],
          precipitationProbability:
            hourly.precipitation_probability[index] ?? 0,
        };
      });
  }

  return (
    <section
      className={[
        "currentWeather",
        `currentWeather-${currentPhase}`,
        `currentWeather-${currentWeather.type}`,
      ].join(" ")}
    >
      <div
        className="currentWeatherAtmosphere"
        aria-hidden="true"
      >
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
            <span className="currentWeatherBrand">
              TDX WEATHER
            </span>

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

            {findingLocation
              ? "Finding you..."
              : "Use My Location"}
          </button>
        </div>

        <div className="currentWeatherCard">
          {loading && (
            <div className="currentWeatherMessage">
              <div className="currentWeatherLoader" />
              <p>Loading weather...</p>
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
                    partlyCloudy={
                      currentWeather.partlyCloudy
                    }
                  />
                </div>

                <div className="currentWeatherReading">
                  <div className="currentWeatherTemperature">
                    <span>
                      {Math.round(current.temperature_2m)}
                    </span>

                    <sup>°C</sup>
                  </div>

                  <strong>{currentWeather.label}</strong>

                  <p>
                    Feels like{" "}
                    {Math.round(
                      current.apparent_temperature
                    )}
                    °C
                  </p>
                </div>
              </div>

              <div className="currentWeatherFacts">
                <div>
                  <span>Humidity</span>

                  <strong>
                    {current.relative_humidity_2m}%
                  </strong>
                </div>

                <div>
                  <span>Wind</span>

                  <strong>
                    {Math.round(current.wind_speed_10m)} km/h
                  </strong>
                </div>

                <div>
                  <span>Cloud Cover</span>

                  <strong>
                    {Math.round(current.cloud_cover)}%
                  </strong>
                </div>
              </div>

              {error && (
                <p className="currentWeatherError">
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        {!loading && forecast.length > 0 && (
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
                {forecast.map((hour, index) => (
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