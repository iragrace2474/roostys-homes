'use client';

import { useState } from 'react';

export type DateRange = { check_in: string; check_out: string };

// Deliberately NOT `d.toISOString()` — that converts to UTC first, which
// shifts the date by a day in any timezone ahead of UTC (e.g. Africa/Kampala,
// UTC+3, where this property actually is). check_in/check_out are plain
// calendar dates with no timezone attached, so the ISO string must be built
// from the Date's local components to match what's rendered and clicked.
function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isDisabled(iso: string, ranges: DateRange[]): boolean {
  return ranges.some((r) => iso >= r.check_in && iso < r.check_out);
}

function buildMonthCells(base: Date): (Date | null)[] {
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < first.getDay(); i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

export default function BookingCalendar({
  disabledRanges,
  checkIn,
  checkOut,
  onChange,
}: {
  disabledRanges: DateRange[];
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const todayISO = toISO(new Date());

  function handleDayClick(iso: string) {
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, '');
      return;
    }
    if (iso <= checkIn) {
      onChange(iso, '');
      return;
    }
    let blocked = false;
    const cursorDate = new Date(checkIn);
    const end = new Date(iso);
    while (cursorDate < end) {
      if (isDisabled(toISO(cursorDate), disabledRanges)) {
        blocked = true;
        break;
      }
      cursorDate.setDate(cursorDate.getDate() + 1);
    }
    onChange(blocked ? iso : checkIn, blocked ? '' : iso);
  }

  function renderMonth(base: Date) {
    const cells = buildMonthCells(base);
    const label = base.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return (
      <div key={label} className="flex-1">
        <p className="text-center font-semibold text-forest-900">{label}</p>
        <div className="cal-grid mt-3 gap-y-1 text-center text-xs font-medium text-ink-soft">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="cal-grid mt-1 gap-y-1">
          {cells.map((date, i) => {
            if (!date) return <span key={i} />;
            const iso = toISO(date);
            const past = iso < todayISO;
            const disabled = past || isDisabled(iso, disabledRanges);
            const isStart = iso === checkIn;
            const isEnd = iso === checkOut;
            const inRange = Boolean(checkIn && checkOut && iso > checkIn && iso < checkOut);
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => handleDayClick(iso)}
                className={[
                  'aspect-square rounded-md text-sm transition',
                  disabled
                    ? 'cursor-not-allowed text-ink-soft/30 line-through'
                    : 'text-ink hover:bg-forest-100',
                  isStart || isEnd ? 'bg-forest-800 text-white hover:bg-forest-800' : '',
                  inRange ? 'bg-yellow-100' : '',
                ].join(' ')}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const nextCursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="rounded-full border border-forest-200 px-3 py-1 text-forest-800 hover:bg-forest-50"
        >
          &larr;
        </button>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="rounded-full border border-forest-200 px-3 py-1 text-forest-800 hover:bg-forest-50"
        >
          &rarr;
        </button>
      </div>
      <div className="flex flex-col gap-8 sm:flex-row">
        {renderMonth(cursor)}
        {renderMonth(nextCursor)}
      </div>
      <p className="mt-4 text-sm text-ink-soft">
        {checkIn && checkOut
          ? `${checkIn} → ${checkOut}`
          : checkIn
            ? 'Pick a check-out date.'
            : 'Pick a check-in date.'}
      </p>
    </div>
  );
}
