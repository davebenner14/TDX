export function getWeatherType(code) {
  const numericCode = Number(code);

  if (numericCode === 0 || numericCode === 1) {
    return "clear";
  }

  if (numericCode === 2 || numericCode === 3) {
    return "cloudy";
  }

  if ([45, 48].includes(numericCode)) {
    return "cloudy";
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
    ].includes(numericCode)
  ) {
    return "rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(numericCode)) {
    return "snow";
  }

  return "cloudy";
}

export function getWeatherDescription(code) {
  const numericCode = Number(code);

  const descriptions = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Freezing Fog",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Heavy Drizzle",
    56: "Freezing Drizzle",
    57: "Heavy Freezing Drizzle",
    61: "Light Rain",
    63: "Rain",
    65: "Heavy Rain",
    66: "Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Light Snow",
    73: "Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Light Showers",
    81: "Rain Showers",
    82: "Heavy Showers",
    85: "Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Heavy Thunderstorm",
  };

  return descriptions[numericCode] || "Current Weather";
}