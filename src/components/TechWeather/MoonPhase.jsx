const LUNAR_CYCLE_DAYS = 29.53058867;

/*
  Calculates the approximate position of the moon
  inside its current lunar cycle.

  This allows the moon graphic to show:
  - new moon
  - crescent
  - quarter
  - gibbous
  - full moon
*/
function getMoonPhase(date = new Date()) {
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const daysSinceKnownNewMoon =
    (date.getTime() - knownNewMoon.getTime()) / 86400000;

  const cyclePosition =
    ((daysSinceKnownNewMoon % LUNAR_CYCLE_DAYS) + LUNAR_CYCLE_DAYS) %
    LUNAR_CYCLE_DAYS;

  const phase = cyclePosition / LUNAR_CYCLE_DAYS;
  const illumination = Math.round(
    ((1 - Math.cos(phase * Math.PI * 2)) / 2) * 100
  );

  let name = "New Moon";
  let symbol = "🌑";

  if (phase < 0.03 || phase >= 0.97) {
    name = "New Moon";
    symbol = "🌑";
  } else if (phase < 0.22) {
    name = "Waxing Crescent";
    symbol = "🌒";
  } else if (phase < 0.28) {
    name = "First Quarter";
    symbol = "🌓";
  } else if (phase < 0.47) {
    name = "Waxing Gibbous";
    symbol = "🌔";
  } else if (phase < 0.53) {
    name = "Full Moon";
    symbol = "🌕";
  } else if (phase < 0.72) {
    name = "Waning Gibbous";
    symbol = "🌖";
  } else if (phase < 0.78) {
    name = "Last Quarter";
    symbol = "🌗";
  } else {
    name = "Waning Crescent";
    symbol = "🌘";
  }

  return {
    name,
    symbol,
    illumination,
  };
}

function MoonPhase({ date = new Date(), compact = false }) {
  const moon = getMoonPhase(date);

  return (
    <div className={`moonPhase ${compact ? "moonPhaseCompact" : ""}`}>
      <div className="moonPhaseGraphic" aria-hidden="true">
        <span>{moon.symbol}</span>

        <div className="moonGlow" />
      </div>

      {!compact && (
        <div className="moonPhaseInformation">
          <span className="moonPhaseLabel">Moon phase</span>
          <strong>{moon.name}</strong>
          <span>{moon.illumination}% illuminated</span>
        </div>
      )}
    </div>
  );
}

export default MoonPhase;