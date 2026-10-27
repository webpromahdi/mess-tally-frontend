const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface DayInfo {
  /** ISO date */
  iso: string;
  day: number;
  weekday: string;
  weekdayLong: string;
  monthShort: string;
  isFriday: boolean;
}

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toIso(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function describeDay(iso: string): DayInfo {
  const date = parse(iso);
  const dow = date.getUTCDay();
  return {
    iso,
    day: date.getUTCDate(),
    weekday: WEEKDAYS[dow],
    weekdayLong: WEEKDAYS_LONG[dow],
    monthShort: MONTHS[date.getUTCMonth()],
    isFriday: dow === 5,
  };
}

/** Every day from `start` to `end` inclusive. */
export function daysBetween(start: string, end: string): DayInfo[] {
  const out: DayInfo[] = [];
  const cursor = parse(start);
  const last = parse(end).getTime();
  while (cursor.getTime() <= last) {
    out.push(
      describeDay(
        toIso(
          cursor.getUTCFullYear(),
          cursor.getUTCMonth() + 1,
          cursor.getUTCDate(),
        ),
      ),
    );
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

/** e.g. "Sat, 31 Oct" */
export function formatDayLong(iso: string) {
  const d = describeDay(iso);
  return `${d.weekday}, ${d.day} ${d.monthShort}`;
}

export function isFuture(iso: string, today: string) {
  return iso > today;
}

/** `"2026-10"` → `"Oct 2026"` or `"October 2026"`. Timezone-safe (no Date parsing). */
export function monthLabel(key: string, long = false) {
  const [year, month] = key.split("-").map(Number);
  if (!year || !month || month < 1 || month > 12) return key;
  return `${(long ? MONTHS_LONG : MONTHS)[month - 1]} ${year}`;
}

/** ISO timestamp → `"1 Oct 2026"` (UTC, matching backend month ranges). */
export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Local calendar date as `YYYY-MM-DD` (no string parsing, so no UTC drift). */
export function todayIso() {
  const now = new Date();
  return toIso(now.getFullYear(), now.getMonth() + 1, now.getDate());
}
