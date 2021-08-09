import React, { useState } from "react";
import Timer from "./Timer";
import { v4 as uuid } from "uuid";

const MAX_TIMERS_LENGTH = 4;

const r100 = () => Math.floor(Math.random() * 100);
const r3 = () => Math.floor(Math.random() * 3);
const r4 = () => Math.floor(Math.random() * 4);

const generateTimer = (timerId = uuid()) => ({
  timerId,
  initialSeconds: r100() + r100(),
  color: ["blue", "green", "red"][r3()],
  initialRotation: [0, 90, 180, 270][r4()],
});

const buildTimers = (timers) =>
  timers.reduce((acc, timer) => {
    const { timerId, initialSeconds, color, initialRotation } = timer;
    return {
      ...acc,
      [timerId]: { timerId, initialSeconds, color, initialRotation },
    };
  }, {});

export default function Grid() {
  const [gridLayout, setGridLayout] = useState({});
  const [timers, setTimers] = useState(buildTimers([generateTimer()]));

  const onAddTimerClick = () => {
    const newTimers =
      Object.values(timers).length + 1 <= MAX_TIMERS_LENGTH
        ? buildTimers([...Object.values(timers), generateTimer()])
        : timers;

    setTimers(newTimers);
  };

  return (
    <div className="grid">
      <div className="grid__header">
        <button onClick={onAddTimerClick}>Add Timer</button>
      </div>
      <div className="grid__timers">
        {Object.values(timers)?.map((timer) => (
          <Timer key={timer.timerId} {...timer} />
        ))}
      </div>
    </div>
  );
}
