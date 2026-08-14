"use client";

import { useEffect, useState } from "react";

interface ContactClockProps {
  readonly timezoneIana: string;
  readonly timezoneLabel: string;
}

/** Żywy zegar w strefie Warszawy — renderowany dopiero po montażu (bez mismatchu hydratacji). */
export function ContactClock({
  timezoneIana,
  timezoneLabel,
}: ContactClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("pl-PL", {
      timeZone: timezoneIana,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timezoneIana]);

  return (
    <p className="flex items-center gap-2 font-mono text-sm tracking-[0.16em] text-on-surface">
      <span className="tabular-nums">{time ?? "--:--:--"}</span>
      <span className="text-[0.65rem] tracking-[0.22em] text-on-surface-variant/60">
        {timezoneLabel}
      </span>
    </p>
  );
}
