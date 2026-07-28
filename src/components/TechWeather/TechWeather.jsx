import { useEffect, useState } from "react";
import "./TechWeather.css";

import WeatherIcon from "./WeatherIcon";
import {
  getWeatherDescription,
  getWeatherType,
} from "./weatherCodes";

const DEFAULT_LOCATION = {
  latitude: 43.8828,
  longitude: -79.4403,
  city: "Richmond Hill",
  region: "Ontario",
  country: "Canada",
};

function TechWeather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
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
        country: result.countryName || "",
      };
    } catch (locationError) {
      console.error(locationError);

      return {
        latitude,
        longitude,
        city: "Current Location",
        region: "",
        country: "",
      };
    }
  }

  async function fetchWeather(selectedLocation) {
    try {
      setLoading(true);
      setError("");

      const { latitude, longitude } = selectedLocation;

      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
        `&timezone=auto`;

      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error("Weather information could not be loaded.");
      }

      const result = await response.json();

      setWeather(result);
      setLocation(selectedLocation);
    } catch (weatherError) {
      console.error(weatherError);

      setError(
        weatherError.message ||
          "Weather information is currently unavailable."
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

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const selectedLocation = await getLocationName(
          position.coords.latitude,
          position.coords.longitude
        );

        await fetchWeather(selectedLocation);

        setLocationLoading(false);
      },
      (locationError) => {
        console.error(locationError);

        setError(
          "Your location could not be accessed. Showing Richmond Hill instead."
        );

        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  useEffect(() => {
    fetchWeather(DEFAULT_LOCATION);
  }, []);

  const current = weather?.current;

  const isDay = Boolean(current?.is_day);
  const weatherType = getWeatherType(current?.weather_code);

  const sceneClass = isDay
    ? `simpleWeatherScene simpleWeatherSceneDay simpleWeatherScene-${weatherType}`
    : `simpleWeatherScene simpleWeatherSceneNight simpleWeatherScene-${weatherType}`;

  const locationTitle = [location.city, location.region]
    .filter(Boolean)
    .join(", ");

  return (
    <section className={sceneClass}>
      <div className="simpleWeatherOverlay" />

      <div className="simpleWeatherContainer">
        <div className="simpleWeatherHeader">
          <div>
            <span className="simpleWeatherEyebrow">LIVE WEATHER</span>
            <h2>Current conditions</h2>
          </div>

          <button
            className="simpleLocationButton"
            type="button"
            onClick={useCurrentLocation}
            disabled={locationLoading}
          >
            <span aria-hidden="true">⌖</span>

            {locationLoading ? "Finding location..." : "Use My Location"}
          </button>
        </div>

        <div className="simpleWeatherCard">
          {loading && (
            <div className="simpleWeatherMessage">
              <div className="simpleWeatherLoader" />
              <p>Loading current weather...</p>
            </div>
          )}

          {!loading && error && !weather && (
            <div className="simpleWeatherMessage">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => fetchWeather(DEFAULT_LOCATION)}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && current && (
            <>
              <div className="simpleWeatherLocation">
                <span>Current location</span>

                <h3>{locationTitle}</h3>

                {location.country && <p>{location.country}</p>}
              </div>

              <div className="simpleWeatherMain">
                <div className="simpleWeatherIconArea">
                  <WeatherIcon
                    code={current.weather_code}
                    isDay={isDay}
                  />
                </div>

                <div className="simpleWeatherDetails">
                  <div className="simpleWeatherTemperature">
                    {Math.round(current.temperature_2m)}
                    <sup>°C</sup>
                  </div>

                  <strong className="simpleWeatherCondition">
                    {getWeatherDescription(current.weather_code)}
                  </strong>

                  <span className="simpleWeatherFeels">
                    Feels like {Math.round(current.apparent_temperature)}°C
                  </span>
                </div>
              </div>

              <div className="simpleWeatherStats">
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
                  <span>Time of day</span>
                  <strong>{isDay ? "Daytime" : "Nighttime"}</strong>
                </div>
              </div>

              {error && (
                <p className="simpleWeatherNotice">{error}</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default TechWeather;