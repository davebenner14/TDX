export const WEATHER_CODES = {
  0: {
    label: "Clear Sky",
    shortLabel: "Clear",
    type: "clear",
  },
  1: {
    label: "Mainly Clear",
    shortLabel: "Mostly Clear",
    type: "clear",
  },
  2: {
    label: "Partly Cloudy",
    shortLabel: "Partly Cloudy",
    type: "cloudy",
  },
  3: {
    label: "Overcast",
    shortLabel: "Overcast",
    type: "cloudy",
  },
  45: {
    label: "Fog",
    shortLabel: "Foggy",
    type: "fog",
  },
  48: {
    label: "Depositing Rime Fog",
    shortLabel: "Icy Fog",
    type: "fog",
  },
  51: {
    label: "Light Drizzle",
    shortLabel: "Drizzle",
    type: "rain",
  },
  53: {
    label: "Moderate Drizzle",
    shortLabel: "Drizzle",
    type: "rain",
  },
  55: {
    label: "Dense Drizzle",
    shortLabel: "Heavy Drizzle",
    type: "rain",
  },
  56: {
    label: "Light Freezing Drizzle",
    shortLabel: "Freezing Drizzle",
    type: "freezing",
  },
  57: {
    label: "Dense Freezing Drizzle",
    shortLabel: "Freezing Drizzle",
    type: "freezing",
  },
  61: {
    label: "Slight Rain",
    shortLabel: "Light Rain",
    type: "rain",
  },
  63: {
    label: "Moderate Rain",
    shortLabel: "Rain",
    type: "rain",
  },
  65: {
    label: "Heavy Rain",
    shortLabel: "Heavy Rain",
    type: "rain",
  },
  66: {
    label: "Light Freezing Rain",
    shortLabel: "Freezing Rain",
    type: "freezing",
  },
  67: {
    label: "Heavy Freezing Rain",
    shortLabel: "Freezing Rain",
    type: "freezing",
  },
  71: {
    label: "Slight Snowfall",
    shortLabel: "Light Snow",
    type: "snow",
  },
  73: {
    label: "Moderate Snowfall",
    shortLabel: "Snow",
    type: "snow",
  },
  75: {
    label: "Heavy Snowfall",
    shortLabel: "Heavy Snow",
    type: "snow",
  },
  77: {
    label: "Snow Grains",
    shortLabel: "Snow Grains",
    type: "snow",
  },
  80: {
    label: "Slight Rain Showers",
    shortLabel: "Light Showers",
    type: "rain",
  },
  81: {
    label: "Moderate Rain Showers",
    shortLabel: "Showers",
    type: "rain",
  },
  82: {
    label: "Violent Rain Showers",
    shortLabel: "Heavy Showers",
    type: "rain",
  },
  85: {
    label: "Slight Snow Showers",
    shortLabel: "Snow Showers",
    type: "snow",
  },
  86: {
    label: "Heavy Snow Showers",
    shortLabel: "Heavy Snow",
    type: "snow",
  },
  95: {
    label: "Thunderstorm",
    shortLabel: "Thunderstorm",
    type: "storm",
  },
  96: {
    label: "Thunderstorm With Light Hail",
    shortLabel: "Storm and Hail",
    type: "storm",
  },
  99: {
    label: "Thunderstorm With Heavy Hail",
    shortLabel: "Severe Storm",
    type: "storm",
  },
};

export function getWeatherDetails(code) {
  return (
    WEATHER_CODES[code] || {
      label: "Unknown Conditions",
      shortLabel: "Unknown",
      type: "cloudy",
    }
  );
}