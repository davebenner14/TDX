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

function WeatherVisual({ type, isDay }) {
  if (!isDay && type === "clear") {
    return (
      <div className="currentWeatherVisual currentWeatherMoon">
        <div className="currentWeatherMoonBody">
          <span className="moonMark moonMarkOne" />
          <span className="moonMark moonMarkTwo" />
          <span className="moonMark moonMarkThree" />
        </div>
      </div>
    );
  }

  if (type === "clear") {
    return (
      <div className="currentWeatherVisual currentWeatherSun">
        <div className="currentWeatherSunGlow" />

        <div className="currentWeatherSunBody">
          <span />
        </div>
      </div>
    );
  }

  if (type === "rain") {
    return (
      <div className="currentWeatherVisual">
        <div className="currentWeatherCloud currentWeatherCloudDark">
          <span className="cloudCircle cloudCircleOne" />
          <span className="cloudCircle cloudCircleTwo" />
          <span className="cloudCircle cloudCircleThree" />
          <span className="cloudBase" />
        </div>

        <div className="currentWeatherRain">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (type === "snow") {
    return (
      <div className="currentWeatherVisual">
        <div className="currentWeatherCloud">
          <span className="cloudCircle cloudCircleOne" />
          <span className="cloudCircle cloudCircleTwo" />
          <span className="cloudCircle cloudCircleThree" />
          <span className="cloudBase" />
        </div>

        <div className="currentWeatherSnow">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>
    );
  }

  return (
    <div className="currentWeatherVisual">
      <div className="currentWeatherCloud">
        <span className="cloudCircle cloudCircleOne" />
        <span className="cloudCircle cloudCircleTwo" />
        <span className="cloudCircle cloudCircleThree" />
        <span className="cloudBase" />
      </div>
    </div>
  );
}

function TechWeather() {
  const [weather, setWeather] = useState(null);
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
        `&timezone=auto`;

      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error("Unable to load the current weather.");
      }

      const result = await response.json();

      setWeather(result.current);
      setLocation(selectedLocation);
    } catch (weatherError) {
      console.error(weatherError);

      setError(
        weatherError.message || "Current weather is temporarily unavailable."
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

  const weatherInformation = getWeatherInformation(weather?.weather_code);
  const isDay = Boolean(weather?.is_day);

  const locationName = [location.city, location.region]
    .filter(Boolean)
    .join(", ");

  const sceneClass = isDay
    ? `currentWeather currentWeatherDay currentWeather-${weatherInformation.type}`
    : `currentWeather currentWeatherNight currentWeather-${weatherInformation.type}`;

  return (
    <section className={sceneClass}>
      <div className="currentWeatherAtmosphere" aria-hidden="true">
        <div className="currentWeatherStars">
          {Array.from({ length: 24 }).map((_, index) => (
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

          {!loading && error && !weather && (
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

          {!loading && weather && (
            <>
              <div className="currentWeatherLocation">
                <span>Current location</span>
                <h2>{locationName}</h2>
              </div>

              <div className="currentWeatherMain">
                <div className="currentWeatherArtwork">
                  <WeatherVisual
                    type={weatherInformation.type}
                    isDay={isDay}
                  />
                </div>

                <div className="currentWeatherReading">
                  <div className="currentWeatherTemperature">
                    <span>{Math.round(weather.temperature_2m)}</span>
                    <sup>°C</sup>
                  </div>

                  <strong>{weatherInformation.label}</strong>

                  <p>
                    Feels like {Math.round(weather.apparent_temperature)}°C
                  </p>
                </div>
              </div>

              <div className="currentWeatherFacts">
                <div>
                  <span>Humidity</span>
                  <strong>{weather.relative_humidity_2m}%</strong>
                </div>

                <div>
                  <span>Wind</span>
                  <strong>
                    {Math.round(weather.wind_speed_10m)} km/h
                  </strong>
                </div>

                <div>
                  <span>Sky</span>
                  <strong>{isDay ? "Day" : "Night"}</strong>
                </div>
              </div>

              {error && <p className="currentWeatherError">{error}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default TechWeather;