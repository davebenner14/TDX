import { useEffect, useMemo, useState } from "react";
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

const SKY_COLOURS = {
  night: {
    top: "#01030a",
    middle: "#071229",
    bottom: "#101c38",
  },

  dawn: {
    top: "#17254a",
    middle: "#a55b85",
    bottom: "#ffb36d",
  },

  day: {
    top: "#168ed4",
    middle: "#60bdeb",
    bottom: "#c9efff",
  },

  sunset: {
    top: "#1d244d",
    middle: "#9b4775",
    bottom: "#ff8b43",
  },
};

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");

  return {
    red: parseInt(normalized.substring(0, 2), 16),
    green: parseInt(normalized.substring(2, 4), 16),
    blue: parseInt(normalized.substring(4, 6), 16),
  };
}

function mixColour(firstColour, secondColour, amount) {
  const first = hexToRgb(firstColour);
  const second = hexToRgb(secondColour);

  const progress = Math.max(0, Math.min(1, amount));

  const red = Math.round(
    first.red + (second.red - first.red) * progress
  );

  const green = Math.round(
    first.green + (second.green - first.green) * progress
  );

  const blue = Math.round(
    first.blue + (second.blue - first.blue) * progress
  );

  return `rgb(${red}, ${green}, ${blue})`;
}

function getMinutesFromWeatherTime(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const timePart = value.includes("T")
    ? value.split("T")[1]
    : value;

  const [hours, minutes] = timePart.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}

function getSkyInformation({
  currentTime,
  sunrise,
  sunset,
  isDay,
}) {
  const currentMinutes = getMinutesFromWeatherTime(currentTime);
  const sunriseMinutes = getMinutesFromWeatherTime(sunrise);
  const sunsetMinutes = getMinutesFromWeatherTime(sunset);

  if (
    currentMinutes === null ||
    sunriseMinutes === null ||
    sunsetMinutes === null
  ) {
    const fallbackPalette = isDay
      ? SKY_COLOURS.day
      : SKY_COLOURS.night;

    return {
      phase: isDay ? "day" : "night",
      palette: fallbackPalette,
      starOpacity: isDay ? 0 : 1,
      sunPosition: isDay ? 55 : 100,
    };
  }

  const dawnStart = sunriseMinutes - 90;
  const dawnEnd = sunriseMinutes + 45;

  const sunsetStart = sunsetMinutes - 100;
  const sunsetEnd = sunsetMinutes + 50;

  /*
    Night into dawn
  */
  if (
    currentMinutes >= dawnStart &&
    currentMinutes < sunriseMinutes
  ) {
    const progress =
      (currentMinutes - dawnStart) /
      (sunriseMinutes - dawnStart);

    return {
      phase: "dawn",
      palette: {
        top: mixColour(
          SKY_COLOURS.night.top,
          SKY_COLOURS.dawn.top,
          progress
        ),
        middle: mixColour(
          SKY_COLOURS.night.middle,
          SKY_COLOURS.dawn.middle,
          progress
        ),
        bottom: mixColour(
          SKY_COLOURS.night.bottom,
          SKY_COLOURS.dawn.bottom,
          progress
        ),
      },
      starOpacity: 1 - progress,
      sunPosition: 94 - progress * 10,
    };
  }

  /*
    Dawn into daytime
  */
  if (
    currentMinutes >= sunriseMinutes &&
    currentMinutes < dawnEnd
  ) {
    const progress =
      (currentMinutes - sunriseMinutes) /
      (dawnEnd - sunriseMinutes);

    return {
      phase: "dawn",
      palette: {
        top: mixColour(
          SKY_COLOURS.dawn.top,
          SKY_COLOURS.day.top,
          progress
        ),
        middle: mixColour(
          SKY_COLOURS.dawn.middle,
          SKY_COLOURS.day.middle,
          progress
        ),
        bottom: mixColour(
          SKY_COLOURS.dawn.bottom,
          SKY_COLOURS.day.bottom,
          progress
        ),
      },
      starOpacity: 0,
      sunPosition: 84 - progress * 22,
    };
  }

  /*
    Normal daytime
  */
  if (
    currentMinutes >= dawnEnd &&
    currentMinutes < sunsetStart
  ) {
    const dayLength = sunsetStart - dawnEnd;

    const dayProgress =
      dayLength > 0
        ? (currentMinutes - dawnEnd) / dayLength
        : 0.5;

    /*
      Moves the decorative sun slowly across the background.
    */
    const sunPosition =
      72 - Math.sin(dayProgress * Math.PI) * 50;

    return {
      phase: "day",
      palette: SKY_COLOURS.day,
      starOpacity: 0,
      sunPosition,
    };
  }

  /*
    Daytime into sunset
  */
  if (
    currentMinutes >= sunsetStart &&
    currentMinutes < sunsetMinutes
  ) {
    const progress =
      (currentMinutes - sunsetStart) /
      (sunsetMinutes - sunsetStart);

    return {
      phase: "sunset",
      palette: {
        top: mixColour(
          SKY_COLOURS.day.top,
          SKY_COLOURS.sunset.top,
          progress
        ),
        middle: mixColour(
          SKY_COLOURS.day.middle,
          SKY_COLOURS.sunset.middle,
          progress
        ),
        bottom: mixColour(
          SKY_COLOURS.day.bottom,
          SKY_COLOURS.sunset.bottom,
          progress
        ),
      },
      starOpacity: 0,
      sunPosition: 72 + progress * 17,
    };
  }

  /*
    Sunset into nighttime
  */
  if (
    currentMinutes >= sunsetMinutes &&
    currentMinutes < sunsetEnd
  ) {
    const progress =
      (currentMinutes - sunsetMinutes) /
      (sunsetEnd - sunsetMinutes);

    return {
      phase: "sunset",
      palette: {
        top: mixColour(
          SKY_COLOURS.sunset.top,
          SKY_COLOURS.night.top,
          progress
        ),
        middle: mixColour(
          SKY_COLOURS.sunset.middle,
          SKY_COLOURS.night.middle,
          progress
        ),
        bottom: mixColour(
          SKY_COLOURS.sunset.bottom,
          SKY_COLOURS.night.bottom,
          progress
        ),
      },
      starOpacity: progress,
      sunPosition: 89 + progress * 15,
    };
  }

  return {
    phase: "night",
    palette: SKY_COLOURS.night,
    starOpacity: 1,
    sunPosition: 110,
  };
}

function TechWeather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState("");
  const [clockTick, setClockTick] = useState(0);

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
        `&daily=sunrise,sunset` +
        `&forecast_days=1` +
        `&timezone=auto`;

      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error(
          "Weather information could not be loaded."
        );
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
      setError(
        "Location services are not supported by this browser."
      );

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

  /*
    Recalculates the sky every minute so sunset and dawn
    gradually progress without refreshing the browser.
  */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setClockTick((currentValue) => currentValue + 1);
    }, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const current = weather?.current;
  const daily = weather?.daily;

  const isDay = Boolean(current?.is_day);
  const weatherType = getWeatherType(current?.weather_code);

  const skyInformation = useMemo(() => {
    const baseTime = current?.time;

    if (!baseTime) {
      return getSkyInformation({
        currentTime: null,
        sunrise: null,
        sunset: null,
        isDay,
      });
    }

    /*
      Advances the API's current local time by the number of
      minutes that have passed since it was retrieved.
    */
    const baseMinutes = getMinutesFromWeatherTime(baseTime);

    let adjustedTime = baseTime;

    if (baseMinutes !== null && clockTick > 0) {
      const totalMinutes = (baseMinutes + clockTick) % 1440;

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const datePart = baseTime.split("T")[0];

      adjustedTime =
        `${datePart}T` +
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}`;
    }

    return getSkyInformation({
      currentTime: adjustedTime,
      sunrise: daily?.sunrise?.[0],
      sunset: daily?.sunset?.[0],
      isDay,
    });
  }, [
    current?.time,
    daily?.sunrise,
    daily?.sunset,
    isDay,
    clockTick,
  ]);

  const locationTitle = [location.city, location.region]
    .filter(Boolean)
    .join(", ");

  const sceneStyle = {
    "--sky-top": skyInformation.palette.top,
    "--sky-middle": skyInformation.palette.middle,
    "--sky-bottom": skyInformation.palette.bottom,
    "--star-opacity": skyInformation.starOpacity,
    "--sun-position": `${skyInformation.sunPosition}%`,
  };

  return (
    <section
      className={
        `simpleWeatherScene ` +
        `simpleWeatherScene-${skyInformation.phase} ` +
        `simpleWeatherScene-${weatherType}`
      }
      style={sceneStyle}
    >
      <div className="simpleSky" aria-hidden="true">
        <div className="simpleSkyStars">
          {Array.from({ length: 42 }).map((_, index) => (
            <span
              key={index}
              style={{
                "--star-left": `${(index * 37) % 100}%`,
                "--star-top": `${(index * 53) % 82}%`,
                "--star-size": `${1 + (index % 3)}px`,
                "--star-delay": `${(index % 9) * -0.42}s`,
                "--star-duration": `${2.2 + (index % 5) * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="simpleSkySun">
          <span />
        </div>

        <div className="simpleSkyHaze" />
        <div className="simpleSkyClouds" />
        <div className="simpleSkyWeatherTint" />
      </div>

      <div className="simpleWeatherContainer">
        <div className="simpleWeatherHeader">
          <div>
            <span className="simpleWeatherEyebrow">
              LIVE WEATHER
            </span>

            <h2>Current conditions</h2>
          </div>

          <button
            className="simpleLocationButton"
            type="button"
            onClick={useCurrentLocation}
            disabled={locationLoading}
          >
            <span aria-hidden="true">⌖</span>

            {locationLoading
              ? "Finding location..."
              : "Use My Location"}
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
                    {getWeatherDescription(
                      current.weather_code
                    )}
                  </strong>

                  <span className="simpleWeatherFeels">
                    Feels like{" "}
                    {Math.round(
                      current.apparent_temperature
                    )}
                    °C
                  </span>
                </div>
              </div>

              <div className="simpleWeatherStats">
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
                  <span>Sky</span>

                  <strong>
                    {skyInformation.phase === "dawn"
                      ? "Dawn"
                      : skyInformation.phase === "sunset"
                        ? "Sunset"
                        : skyInformation.phase === "night"
                          ? "Night"
                          : "Daytime"}
                  </strong>
                </div>
              </div>

              {error && (
                <p className="simpleWeatherNotice">
                  {error}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default TechWeather;