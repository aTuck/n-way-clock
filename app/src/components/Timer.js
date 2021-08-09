import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const DEFAULT_INITIAL_SECONDS = 600;

export default function Timer({ initialSeconds, color, initialRotation }) {
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    initialSeconds ?? DEFAULT_INITIAL_SECONDS
  );
  const [rotation, setRotation] = useState(initialRotation ?? 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      isActive && setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleActiveButtonClick = () => setIsActive(!isActive);
  const handleRotateButtonClick = (degrees) => () =>
    setRotation(Math.abs(rotation + degrees) % 360);

  const duration = dayjs.duration(secondsLeft, "seconds");
  const timeLeft = `${duration.get("minutes")}m ${duration.get("seconds")}s`;
  return (
    <div style={{ backgroundColor: color }} className="timer">
      <div className={`timer__body--rotation${rotation}`}>
        <div className="timer__duration">{timeLeft}</div>
        <button className="timer__button" onClick={handleActiveButtonClick}>
          {isActive ? "Stop" : "Start"}
        </button>
        <button className="timer__button" onClick={handleRotateButtonClick(90)}>
          {"->"}
        </button>
      </div>
    </div>
  );
}
