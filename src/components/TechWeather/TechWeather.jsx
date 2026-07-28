import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WeatherIcon from "./WeatherIcon";
import { getWeatherDetails } from "./weatherCodes";
import "./TechWeather.css";

const DEFAULT_LOCATION = {
  latitude: 43.6532,
  longitude: -79.3832,
  name: "Toronto",
  region: "Ontario",
  country: "Canada",
  countryCode: "CA",
  timezone: "America/Toronto",
  source: "default",
};

const CACHE_KEY = "tdx-tech-weather-cache-v1";
const UNIT_KEY = "tdx-tech-weather-unit";
const LOCATION_KEY = "tdx-tech-weather-location";
const CACHE_DURATION = 15 * 60 * 1000;

function safeReadStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeWriteStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be blocked. The component still works without caching.
  }
}

function readStoredLocation() {
  const savedLocation = safeReadStorage(LOCATION_KEY);

  if (!savedLocation) {
    return null;
  }

  try {
    const parsed = JSON.parse(savedLocation);

    if (
      typeof parsed.latitude !== "number" ||
      typeof parsed.longitude !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function readCachedWeather(location, unit) {
  const cached = safeReadStorage(CACHE_KEY);

  if (!cached) {
    return null;
  }

  try {
    const parsed = JSON.parse(cached);

    const locationMatches =
      Math.abs(parsed.location.latitude - location.latitude) < 0.01 &&
      Math.abs(parsed.location.longitude - location.longitude) < 0.01;

    const unitMatches = parsed.unit === unit;
    const cacheIsFresh = Date.now() - parsed.timestamp < CACHE_DURATION;

    if (!locationMatches || !unitMatches || !cacheIsFresh) {
      return null;
    }

    return parsed.weather;
  } catch {
    return null;
  }
}

function getInitialUnit() {
  const savedUnit = safeReadStorage(UNIT_KEY);

  return savedUnit === "fahrenheit" ? "fahrenheit" : "celsius";
}

function getTemperatureSymbol(unit) {
  return unit === "fahrenheit" ? "°F" : "°C";
}

function formatTemperature(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "--";
  }

  return Math.round(value);
}

function formatHour(dateString, timezone) {
  if (!dateString) {
    return "--";
  }

  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    timeZone: timezone,
  }).format(new Date(dateString));
}

function formatDay(dateString, timezone, index) {
  if (index === 0) {
    return "Today";
  }

  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    timeZone: timezone,
  }).format(new Date(`${dateString}T12:00:00`));
}

function formatFullDate(date, timezone) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  }).format(date);
}

function formatLocalTime(date, timezone) {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).format(date);
}

function parseWeatherTime(value) {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getMinutesDifference(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    return Infinity;
  }

  return Math.abs(firstDate.getTime() - secondDate.getTime()) / 60000;
}

function getWeatherScene({
  weatherCode,
  isDay,
  currentTime,
  sunrise,
  sunset,
}) {
  const code = Number(weatherCode ?? 0);
  const currentDate = parseWeatherTime(currentTime) || new Date();
  const sunriseDate = parseWeatherTime(sunrise);
  const sunsetDate = parseWeatherTime(sunset);

  const nearSunrise =
    sunriseDate && getMinutesDifference(currentDate, sunriseDate) <= 50;

  const nearSunset =
    sunsetDate && getMinutesDifference(currentDate, sunsetDate) <= 65;

  const stormCodes = [95, 96, 99];
  const snowCodes = [71, 73, 75, 77, 85, 86];
  const heavyRainCodes = [63, 65, 66, 67, 81, 82];
  const rainCodes = [51, 53, 55, 56, 57, 61, 80];
  const fogCodes = [45, 48];

  if (stormCodes.includes(code)) {
    return "storm";
  }

  if (snowCodes.includes(code)) {
    return isDay ? "snow-day" : "snow-night";
  }

  if (heavyRainCodes.includes(code)) {
    return isDay ? "rain-day" : "rain-night";
  }

  if (rainCodes.includes(code)) {
    return isDay ? "drizzle-day" : "rain-night";
  }

  if (fogCodes.includes(code)) {
    return isDay ? "fog-day" : "fog-night";
  }

  if (nearSunset) {
    return "sunset";
  }

  if (nearSunrise) {
    return "sunrise";
  }

  if (!isDay) {
    return code >= 2 ? "cloudy-night" : "clear-night";
  }

  if (code === 3) {
    return "cloudy-day";
  }

  if (code === 2) {
    return "partly-cloudy-day";
  }

  return "clear-day";
}

function formatWindDirection(degrees) {
  if (degrees === null || degrees === undefined) {
    return "--";
  }

  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  const index = Math.round(degrees / 45) % 8;

  return directions[index];
}

function getLocationLabel(location) {
  return [location.name, location.region]
    .filter(Boolean)
    .filter((value, index, items) => items.indexOf(value) === index)
    .join(", ");
}

function normalizeLocationName(reverseLocation) {
  return (
    reverseLocation.city ||
    reverseLocation.locality ||
    reverseLocation.principalSubdivision ||
    "Your Local Area"
  );
}

async function reverseGeocodeCurrentPosition(latitude, longitude) {
  const url = new URL(
    "https://api.bigdatacloud.net/data/reverse-geocode-client",
  );

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("localityLanguage", "en");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to identify your current city.");
  }

  const data = await response.json();

  return {
    latitude,
    longitude,
    name: normalizeLocationName(data),
    region: data.principalSubdivision || "",
    country: data.countryName || "",
    countryCode: data.countryCode || "",
    timezone: data.localityInfo?.informative?.find(
      (item) => item.description === "time zone",
    )?.name,
    source: "device",
  };
}

async function detectApproximateLocation() {
  const url =
    "https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to detect an approximate location.");
  }

  const data = await response.json();

  if (
    typeof data.latitude !== "number" ||
    typeof data.longitude !== "number"
  ) {
    throw new Error("Approximate location coordinates were unavailable.");
  }

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    name: normalizeLocationName(data),
    region: data.principalSubdivision || "",
    country: data.countryName || "",
    countryCode: data.countryCode || "",
    timezone: undefined,
    source: "approximate",
  };
}

async function searchLocations(query, signal) {
  const url = new URL(
    "https://geocoding-api.open-meteo.com/v1/search",
  );

  url.searchParams.set("name", query);
  url.searchParams.set("count", "6");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("The location search could not be completed.");
  }

  const data = await response.json();

  return (data.results || []).map((result) => ({
    id: result.id,
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    region: result.admin1 || "",
    country: result.country || "",
    countryCode: result.country_code || "",
    timezone: result.timezone,
    source: "search",
  }));
}

async function getWeather(location, unit, signal) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", location.latitude);
  url.searchParams.set("longitude", location.longitude);

  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "cloud_cover",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(","),
  );

  url.searchParams.set(
    "hourly",
    [
      "temperature_2m",
      "apparent_temperature",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
      "relative_humidity_2m",
    ].join(","),
  );

  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ].join(","),
  );

  url.searchParams.set("temperature_unit", unit);
  url.searchParams.set(
    "wind_speed_unit",
    unit === "fahrenheit" ? "mph" : "kmh",
  );
  url.searchParams.set("precipitation_unit", "mm");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "7");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Weather data could not be retrieved.");
  }

  return response.json();
}

function buildHourlyForecast(weather) {
  if (!weather?.hourly?.time || !weather?.current?.time) {
    return [];
  }

  const currentTimestamp = new Date(weather.current.time).getTime();

  let startIndex = weather.hourly.time.findIndex(
    (time) => new Date(time).getTime() >= currentTimestamp,
  );

  if (startIndex < 0) {
    startIndex = 0;
  }

  return weather.hourly.time
    .slice(startIndex, startIndex + 12)
    .map((time, offset) => {
      const index = startIndex + offset;

      return {
        time,
        temperature: weather.hourly.temperature_2m[index],
        apparentTemperature:
          weather.hourly.apparent_temperature[index],
        precipitationProbability:
          weather.hourly.precipitation_probability[index],
        weatherCode: weather.hourly.weather_code[index],
        windSpeed: weather.hourly.wind_speed_10m[index],
        humidity: weather.hourly.relative_humidity_2m[index],
      };
    });
}

function buildDailyForecast(weather) {
  if (!weather?.daily?.time) {
    return [];
  }

  return weather.daily.time.map((date, index) => ({
    date,
    weatherCode: weather.daily.weather_code[index],
    maxTemperature: weather.daily.temperature_2m_max[index],
    minTemperature: weather.daily.temperature_2m_min[index],
    precipitationProbability:
      weather.daily.precipitation_probability_max[index],
    sunrise: weather.daily.sunrise[index],
    sunset: weather.daily.sunset[index],
    windSpeed: weather.daily.wind_speed_10m_max[index],
  }));
}

function WeatherMetric({ label, value, detail, icon }) {
  return (
    <div className="techWeatherMetric">
      <span className="techWeatherMetricIcon" aria-hidden="true">
        {icon}
      </span>

      <div className="techWeatherMetricContent">
        <span className="techWeatherMetricLabel">{label}</span>
        <strong className="techWeatherMetricValue">{value}</strong>
        {detail && (
          <span className="techWeatherMetricDetail">{detail}</span>
        )}
      </div>
    </div>
  );
}

function TechWeather() {
  const [unit, setUnit] = useState(getInitialUnit);
  const [location, setLocation] = useState(
    () => readStoredLocation() || DEFAULT_LOCATION,
  );
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Establishing environmental data link...",
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [searchOpen, setSearchOpen] = useState(false);

  const weatherRequestRef = useRef(null);
  const searchRequestRef = useRef(null);
  const searchWrapperRef = useRef(null);

  const loadWeather = useCallback(
    async (targetLocation, targetUnit, useCache = true) => {
      weatherRequestRef.current?.abort();

      const controller = new AbortController();
      weatherRequestRef.current = controller;

      setStatus("loading");
      setMessage("Synchronizing with atmospheric data network...");

      const cachedWeather = useCache
        ? readCachedWeather(targetLocation, targetUnit)
        : null;

      if (cachedWeather) {
        setWeather(cachedWeather);
        setStatus("ready");
        setMessage("Live environmental feed connected.");
        return;
      }

      try {
        const weatherData = await getWeather(
          targetLocation,
          targetUnit,
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        const normalizedLocation = {
          ...targetLocation,
          timezone:
            weatherData.timezone ||
            targetLocation.timezone ||
            DEFAULT_LOCATION.timezone,
        };

        setLocation(normalizedLocation);
        setWeather(weatherData);
        setStatus("ready");
        setMessage("Live environmental feed connected.");

        safeWriteStorage(
          LOCATION_KEY,
          JSON.stringify(normalizedLocation),
        );

        safeWriteStorage(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            location: normalizedLocation,
            unit: targetUnit,
            weather: weatherData,
          }),
        );
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Weather request failed:", error);

        setStatus("error");
        setMessage(
          "Environmental data is temporarily unavailable. Try refreshing the feed.",
        );
      }
    },
    [],
  );

  const useDeviceLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setMessage(
        "Precise device location is not supported. Using approximate network location.",
      );

      detectApproximateLocation()
        .then((approximateLocation) => {
          setLocation(approximateLocation);
          return loadWeather(approximateLocation, unit, false);
        })
        .catch(() => {
          setLocation(DEFAULT_LOCATION);
          loadWeather(DEFAULT_LOCATION, unit, false);
        });

      return;
    }

    setStatus("locating");
    setMessage("Requesting secure device location signal...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        let detectedLocation = {
          latitude,
          longitude,
          name: "Your Local Area",
          region: "",
          country: "",
          countryCode: "",
          timezone: undefined,
          source: "device",
        };

        try {
          detectedLocation = await reverseGeocodeCurrentPosition(
            latitude,
            longitude,
          );
        } catch (error) {
          console.warn("Reverse geocoding failed:", error);
        }

        setLocation(detectedLocation);
        loadWeather(detectedLocation, unit, false);
      },
      async (error) => {
        console.warn("Device location declined or failed:", error);

        setMessage(
          "Precise location was unavailable. Acquiring approximate regional position...",
        );

        try {
          const approximateLocation =
            await detectApproximateLocation();

          setLocation(approximateLocation);
          loadWeather(approximateLocation, unit, false);
        } catch (approximateError) {
          console.warn(
            "Approximate location failed:",
            approximateError,
          );

          setLocation(DEFAULT_LOCATION);
          loadWeather(DEFAULT_LOCATION, unit, false);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 10 * 60 * 1000,
      },
    );
  }, [loadWeather, unit]);

  useEffect(() => {
    loadWeather(location, unit);

    return () => {
      weatherRequestRef.current?.abort();
    };
    // Initial load is intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      searchRequestRef.current?.abort();
      setSearchResults([]);
      setSearchStatus("idle");
      return;
    }

    searchRequestRef.current?.abort();

    const controller = new AbortController();
    searchRequestRef.current = controller;

    setSearchStatus("loading");

    const timer = window.setTimeout(async () => {
      try {
        const results = await searchLocations(
          searchQuery.trim(),
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        setSearchResults(results);
        setSearchStatus(results.length ? "ready" : "empty");
        setSearchOpen(true);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Location search failed:", error);
        setSearchStatus("error");
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  function handleUnitChange(nextUnit) {
    if (nextUnit === unit) {
      return;
    }

    setUnit(nextUnit);
    safeWriteStorage(UNIT_KEY, nextUnit);
    loadWeather(location, nextUnit, false);
  }

  function handleLocationSelection(selectedLocation) {
    setLocation(selectedLocation);
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    loadWeather(selectedLocation, unit, false);
  }

  function handleRefresh() {
    loadWeather(location, unit, false);
  }

  const currentWeather = weather?.current;
  const currentUnits = weather?.current_units;
  const timezone =
    weather?.timezone ||
    location.timezone ||
    DEFAULT_LOCATION.timezone;

  const hourlyForecast = useMemo(
    () => buildHourlyForecast(weather),
    [weather],
  );

  const dailyForecast = useMemo(
    () => buildDailyForecast(weather),
    [weather],
  );

  const weatherDetails = getWeatherDetails(
    currentWeather?.weather_code,
  );

  const temperatureSymbol = getTemperatureSymbol(unit);
  const isDay = currentWeather?.is_day === 1;
  const todayForecast = dailyForecast[0];

  const weatherScene = getWeatherScene({
    weatherCode: currentWeather?.weather_code,
    isDay,
    currentTime: currentWeather?.time,
    sunrise: todayForecast?.sunrise,
    sunset: todayForecast?.sunset,
  });

  const windUnit =
    currentUnits?.wind_speed_10m ||
    (unit === "fahrenheit" ? "mph" : "km/h");

  const atmosphericClass = currentWeather
    ? `techWeather--${weatherDetails.type} ${
        isDay ? "techWeather--day" : "techWeather--night"
      } techWeather--${weatherScene}`
    : "techWeather--loading";

  const displayLocation = getLocationLabel(location);

  return (
    <section
      className={`techWeatherSection ${atmosphericClass}`}
      aria-labelledby="tech-weather-heading"
    >
      <div className="techWeatherBackground" aria-hidden="true">
        <div className="techWeatherGrid" />
        <div className="techWeatherGlow techWeatherGlow--one" />
        <div className="techWeatherGlow techWeatherGlow--two" />
        <div className="techWeatherRadar">
          <div className="techWeatherRadarSweep" />
          <div className="techWeatherRadarRing techWeatherRadarRing--one" />
          <div className="techWeatherRadarRing techWeatherRadarRing--two" />
          <div className="techWeatherRadarRing techWeatherRadarRing--three" />
        </div>

        <div className="techWeatherParticles">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              style={{
                "--particle-index": index,
                "--particle-left": `${(index * 17) % 100}%`,
                "--particle-delay": `${(index % 8) * -0.8}s`,
                "--particle-duration": `${5 + (index % 6)}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="techWeatherContainer">
        <header className="techWeatherSectionHeader">
          <div>
            <span className="techWeatherEyebrow">
              TDX Live Systems Demo
            </span>

            <h2 id="tech-weather-heading">
              Real-Time Environmental Intelligence
            </h2>

            <p>
              A location-aware interface combining live APIs, responsive
              data visualization and adaptive atmospheric design.
            </p>
          </div>

          <div className="techWeatherHeaderStatus">
            <span
              className={`techWeatherStatusLight ${
                status === "ready"
                  ? "techWeatherStatusLight--active"
                  : ""
              }`}
            />

            <span>
              {status === "ready"
                ? "SYSTEM ONLINE"
                : "ESTABLISHING LINK"}
            </span>
          </div>
        </header>

        <div className="techWeatherPanel">
          <div className="techWeatherPanelTopbar">
            <div className="techWeatherSignal">
              <span className="techWeatherSignalBars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>

              <div>
                <span>Location Signal</span>
                <strong>
                  {location.source === "device"
                    ? "Precise"
                    : location.source === "approximate"
                      ? "Regional"
                      : location.source === "search"
                        ? "Manual"
                        : "Default"}
                </strong>
              </div>
            </div>

            <div className="techWeatherControls">
              <div
                className="techWeatherSearch"
                ref={searchWrapperRef}
              >
                <label
                  className="techWeatherSearchField"
                  htmlFor="tech-weather-search"
                >
                  <span aria-hidden="true">⌖</span>

                  <input
                    id="tech-weather-search"
                    type="search"
                    value={searchQuery}
                    placeholder="Search another city"
                    autoComplete="off"
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => {
                      if (searchResults.length) {
                        setSearchOpen(true);
                      }
                    }}
                  />
                </label>

                {searchOpen && searchQuery.trim().length >= 2 && (
                  <div className="techWeatherSearchResults">
                    {searchStatus === "loading" && (
                      <div className="techWeatherSearchMessage">
                        Scanning geographic database...
                      </div>
                    )}

                    {searchStatus === "empty" && (
                      <div className="techWeatherSearchMessage">
                        No matching locations found.
                      </div>
                    )}

                    {searchStatus === "error" && (
                      <div className="techWeatherSearchMessage">
                        Location search is temporarily unavailable.
                      </div>
                    )}

                    {searchStatus === "ready" &&
                      searchResults.map((result) => (
                        <button
                          key={`${result.id}-${result.latitude}-${result.longitude}`}
                          type="button"
                          className="techWeatherSearchResult"
                          onClick={() =>
                            handleLocationSelection(result)
                          }
                        >
                          <span>
                            <strong>{result.name}</strong>

                            <small>
                              {[result.region, result.country]
                                .filter(Boolean)
                                .join(", ")}
                            </small>
                          </span>

                          <span aria-hidden="true">→</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="techWeatherLocationButton"
                onClick={useDeviceLocation}
              >
                <span aria-hidden="true">◎</span>
                Use My Location
              </button>

              <div
                className="techWeatherUnitToggle"
                role="group"
                aria-label="Temperature unit"
              >
                <button
                  type="button"
                  className={
                    unit === "celsius"
                      ? "techWeatherUnitButton techWeatherUnitButton--active"
                      : "techWeatherUnitButton"
                  }
                  onClick={() => handleUnitChange("celsius")}
                >
                  °C
                </button>

                <button
                  type="button"
                  className={
                    unit === "fahrenheit"
                      ? "techWeatherUnitButton techWeatherUnitButton--active"
                      : "techWeatherUnitButton"
                  }
                  onClick={() => handleUnitChange("fahrenheit")}
                >
                  °F
                </button>
              </div>
            </div>
          </div>

          {status === "error" && !weather ? (
            <div className="techWeatherError">
              <span className="techWeatherErrorCode">ERR: WX-01</span>
              <h3>Weather signal interrupted</h3>
              <p>{message}</p>

              <button type="button" onClick={handleRefresh}>
                Retry Connection
              </button>
            </div>
          ) : (
            <>
              <div className="techWeatherCurrentGrid">
                <div className="techWeatherPrimary">
                  <div className="techWeatherLocationRow">
                    <div>
                      <span className="techWeatherLocationLabel">
                        Current Location
                      </span>

                      <h3>{displayLocation}</h3>

                      <p>
                        {location.country || "Location-aware weather feed"}
                      </p>
                    </div>

                    <div className="techWeatherCoordinates">
                      <span>
                        LAT {Number(location.latitude).toFixed(3)}
                      </span>
                      <span>
                        LNG {Number(location.longitude).toFixed(3)}
                      </span>
                    </div>
                  </div>

                  <div className="techWeatherCurrentMain">
                    <WeatherIcon
                      code={currentWeather?.weather_code}
                      isDay={isDay}
                      className="techWeatherCurrentIcon"
                    />

                    <div className="techWeatherTemperatureBlock">
                      <div className="techWeatherTemperature">
                        <span>
                          {formatTemperature(
                            currentWeather?.temperature_2m,
                          )}
                        </span>

                        <sup>{temperatureSymbol}</sup>
                      </div>

                      <strong className="techWeatherCondition">
                        {weatherDetails.label}
                      </strong>

                      <span className="techWeatherFeelsLike">
                        Feels like{" "}
                        {formatTemperature(
                          currentWeather?.apparent_temperature,
                        )}
                        {temperatureSymbol}
                      </span>
                    </div>
                  </div>

                  <div className="techWeatherLiveTime">
                    <div>
                      <span>Local Time</span>
                      <strong>
                        {formatLocalTime(currentTime, timezone)}
                      </strong>
                    </div>

                    <div>
                      <span>Local Date</span>
                      <strong>
                        {formatFullDate(currentTime, timezone)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="techWeatherTelemetry">
                  <div className="techWeatherTelemetryHeader">
                    <div>
                      <span>Atmospheric Telemetry</span>
                      <strong>LIVE DATA STREAM</strong>
                    </div>

                    <button
                      type="button"
                      className="techWeatherRefreshButton"
                      onClick={handleRefresh}
                      disabled={
                        status === "loading" ||
                        status === "locating"
                      }
                      aria-label="Refresh weather data"
                    >
                      ↻
                    </button>
                  </div>

                  <div className="techWeatherMetricGrid">
                    <WeatherMetric
                      icon="◉"
                      label="Humidity"
                      value={`${
                        currentWeather?.relative_humidity_2m ?? "--"
                      }%`}
                      detail="Relative moisture"
                    />

                    <WeatherMetric
                      icon="⌁"
                      label="Wind"
                      value={`${formatTemperature(
                        currentWeather?.wind_speed_10m,
                      )} ${windUnit}`}
                      detail={`${formatWindDirection(
                        currentWeather?.wind_direction_10m,
                      )} direction`}
                    />

                    <WeatherMetric
                      icon="△"
                      label="Wind Gusts"
                      value={`${formatTemperature(
                        currentWeather?.wind_gusts_10m,
                      )} ${windUnit}`}
                      detail="Peak current gust"
                    />

                    <WeatherMetric
                      icon="▧"
                      label="Cloud Cover"
                      value={`${
                        currentWeather?.cloud_cover ?? "--"
                      }%`}
                      detail="Sky coverage"
                    />

                    <WeatherMetric
                      icon="⬡"
                      label="Pressure"
                      value={`${formatTemperature(
                        currentWeather?.surface_pressure,
                      )} hPa`}
                      detail="Surface pressure"
                    />

                    <WeatherMetric
                      icon="◌"
                      label="Precipitation"
                      value={`${
                        currentWeather?.precipitation ?? "--"
                      } mm`}
                      detail="Current interval"
                    />
                  </div>

                  <div className="techWeatherConnectionStatus">
                    <span className="techWeatherConnectionPulse" />

                    <div>
                      <strong>{message}</strong>
                      <span>
                        Updated{" "}
                        {currentWeather?.time
                          ? formatHour(
                              currentWeather.time,
                              timezone,
                            )
                          : "--"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="techWeatherDataSection">
                <div className="techWeatherDataHeader">
                  <div>
                    <span className="techWeatherDataCode">
                      WX-HOURLY-12
                    </span>
                    <h3>12-Hour Forecast</h3>
                  </div>

                  <span>LOCAL TIMEZONE · {timezone}</span>
                </div>

                <div className="techWeatherHourly">
                  {hourlyForecast.map((hour, index) => (
                    <article
                      className={`techWeatherHourlyCard ${
                        index === 0
                          ? "techWeatherHourlyCard--active"
                          : ""
                      }`}
                      key={hour.time}
                    >
                      <span className="techWeatherHourlyTime">
                        {index === 0
                          ? "Now"
                          : formatHour(hour.time, timezone)}
                      </span>

                      <WeatherIcon
                        code={hour.weatherCode}
                        isDay={
                          index === 0
                            ? isDay
                            : new Date(hour.time).getHours() >= 7 &&
                              new Date(hour.time).getHours() < 20
                        }
                        className="techWeatherHourlyIcon"
                      />

                      <strong className="techWeatherHourlyTemperature">
                        {formatTemperature(hour.temperature)}°
                      </strong>

                      <span className="techWeatherHourlyRain">
                        <span aria-hidden="true">◒</span>
                        {hour.precipitationProbability ?? 0}%
                      </span>
                    </article>
                  ))}
                </div>
              </div>

              <div className="techWeatherDataSection techWeatherDataSection--daily">
                <div className="techWeatherDataHeader">
                  <div>
                    <span className="techWeatherDataCode">
                      WX-FORECAST-07
                    </span>
                    <h3>Seven-Day Outlook</h3>
                  </div>

                  <span>PREDICTIVE ENVIRONMENTAL MODEL</span>
                </div>

                <div className="techWeatherDaily">
                  {dailyForecast.map((day, index) => {
                    const dayDetails = getWeatherDetails(
                      day.weatherCode,
                    );

                    return (
                      <article
                        className="techWeatherDailyCard"
                        key={day.date}
                      >
                        <div className="techWeatherDailyDay">
                          <strong>
                            {formatDay(day.date, timezone, index)}
                          </strong>
                          <span>{dayDetails.shortLabel}</span>
                        </div>

                        <WeatherIcon
                          code={day.weatherCode}
                          isDay
                          className="techWeatherDailyIcon"
                        />

                        <div className="techWeatherDailyTemperature">
                          <strong>
                            {formatTemperature(day.maxTemperature)}°
                          </strong>
                          <span>
                            {formatTemperature(day.minTemperature)}°
                          </span>
                        </div>

                        <div className="techWeatherDailyRain">
                          <span aria-hidden="true">◒</span>
                          <span>
                            {day.precipitationProbability ?? 0}%
                          </span>
                        </div>

                        <div className="techWeatherDailyWind">
                          <span>WIND</span>
                          <strong>
                            {formatTemperature(day.windSpeed)}{" "}
                            {windUnit}
                          </strong>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {(status === "loading" || status === "locating") && (
            <div className="techWeatherLoadingOverlay">
              <div className="techWeatherLoadingScanner">
                <span />
                <span />
                <span />
              </div>

              <strong>
                {status === "locating"
                  ? "Acquiring Location Signal"
                  : "Synchronizing Weather Network"}
              </strong>

              <p>{message}</p>
            </div>
          )}

          <footer className="techWeatherFooter">
            <div>
              <span className="techWeatherFooterMark">TDX</span>

              <span>
                Location-aware interface demonstration by Triangle
                Dynamics
              </span>
            </div>

            <div>
              Weather data by{" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
              >
                Open-Meteo
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default TechWeather;