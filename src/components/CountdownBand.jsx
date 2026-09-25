import { useEffect, useState } from 'react';
import { getTimeLeft, pad } from './Countdown';
import {
  COUNTDOWN_EYEBROW,
  COUNTDOWN_HEADING,
  COUNTDOWN_SHLOKA_LINE1,
  COUNTDOWN_SHLOKA_LINE2,
  COUNTDOWN_FOOTNOTE,
  COUNTDOWN_UNIT_LABELS_LONG,
  MONOGRAM_INITIALS,
  MONOGRAM_A11Y,
} from '../content';

const LotusDivider = () => (
  <div className="cdb-divider cdb-lotus-divider" aria-hidden="true">
    <svg viewBox="0 0 540 30" fill="none" focusable="false">
      <line x1="0" y1="15" x2="218" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M218 15 C218 12.8 221 12.8 223 15 C221 17.2 218 17.2 218 15 Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="220.5" cy="15" r="0.9" fill="currentColor" />
      <path d="M223 15 L228 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />

      <g transform="translate(270, 15)" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 -13 C2.2 -7 4.2 -2 4.2 2.5 C4.2 6.2 2.2 9 0 10 C-2.2 9 -4.2 6.2 -4.2 2.5 C-4.2 -2 -2.2 -7 0 -13 Z" />
        <path d="M0 -8 C1.2 -4 1.8 0 1.8 2 C1.8 4.2 0.9 6 0 6.5 C-0.9 6 -1.8 4.2 -1.8 2 C-1.8 0 -1.2 -4 0 -8 Z" strokeWidth="1.0" opacity="0.85" />
        <path d="M-3.8 3.5 C-7.5 0 -10.5 -4 -8.5 -9.5 C-5.2 -7.8 -2.8 -2.5 -1.5 1.5" />
        <path d="M3.8 3.5 C7.5 0 10.5 -4 8.5 -9.5 C5.2 -7.8 2.8 -2.5 1.5 1.5" />
        <path d="M-5.5 7 C-12 7 -19.5 5 -20 -0.8 C-15 0.5 -9.5 3.5 -5.5 5.5" />
        <path d="M5.5 7 C12 7 19.5 5 20 -0.8 C15 0.5 9.5 3.5 5.5 5.5" />
        <path d="M-11 8.5 C-4 11.5 4 11.5 11 8.5" />
      </g>

      <path d="M312 15 L317 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M322 15 C322 12.8 319 12.8 317 15 C319 17.2 322 17.2 322 15 Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="319.5" cy="15" r="0.9" fill="currentColor" />
      <line x1="322" y1="15" x2="540" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

const FlourishDivider = () => (
  <div className="cdb-divider cdb-flourish-divider" aria-hidden="true">
    <svg viewBox="0 0 380 28" fill="none" focusable="false">
      <line x1="0" y1="12" x2="152" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M152 12 C152 10 154.8 10 156.8 12 C154.8 14 152 14 152 12 Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="154.2" cy="12" r="0.8" fill="currentColor" />
      <path d="M156.8 12 L161 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />

      <g transform="translate(190, 12)" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 -8.5 C1.2 -5.5 1.6 -3.2 0 -1.5 C-1.6 -3.2 -1.2 -5.5 0 -8.5 Z" fill="currentColor" stroke="none" />
        <path d="M-13 0 C-13 -4.5 -4 -4.5 0 -1 C4 -4.5 13 -4.5 13 0 C13 4.5 4 4.5 0 1 C-4 4.5 -13 4.5 -13 0 Z" />
        <line x1="0" y1="1.5" x2="0" y2="7" strokeWidth="1.2" />
        <path d="M0 13.5 C1.3 11 1.4 8.5 0 7.5 C-1.4 8.5 -1.3 11 0 13.5 Z" fill="currentColor" stroke="none" />
        <path d="M-4 10.5 C-3 8.2 -1.2 7.8 0 8.5 C-1.2 9.8 -2.6 11 -4 10.5 Z" fill="currentColor" stroke="none" />
        <path d="M4 10.5 C3 8.2 1.2 7.8 0 8.5 C1.2 9.8 2.6 11 4 10.5 Z" fill="currentColor" stroke="none" />
      </g>

      <path d="M219 12 L223.2 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M228 12 C228 10 225.2 10 223.2 12 C225.2 14 228 14 228 12 Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="225.8" cy="12" r="0.8" fill="currentColor" />
      <line x1="228" y1="12" x2="380" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

/**
 * Full-width countdown band shown after the last page.
 *
 * A deep maroon field with the four units laid out in a row, separated by
 * hairline rules — per the couple's reference design. Distinct from the
 * inline PAGE 7 `Countdown`, which is small, sits on the page artwork and
 * uses single-letter unit labels; this one is a standalone closing section.
 *
 * Shares `getTimeLeft`/`pad` with that component so there is only one
 * implementation of the target date and tick logic.
 */
export default function CountdownBand() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    [time.days, COUNTDOWN_UNIT_LABELS_LONG.days],
    [time.hours, COUNTDOWN_UNIT_LABELS_LONG.hours],
    [time.minutes, COUNTDOWN_UNIT_LABELS_LONG.minutes],
    [time.seconds, COUNTDOWN_UNIT_LABELS_LONG.seconds],
  ];

  return (
    <section className="cdb" aria-label="Time remaining until the wedding">
      <p className="cdb-eyebrow">{COUNTDOWN_EYEBROW}</p>
      <h2 className="cdb-heading">{COUNTDOWN_HEADING}</h2>

      <LotusDivider />

      <div className="cdb-shloka">
        <p className="cdb-shloka-line">{COUNTDOWN_SHLOKA_LINE1}</p>
        <p className="cdb-shloka-line">{COUNTDOWN_SHLOKA_LINE2}</p>
      </div>

      <FlourishDivider />

      {/* role=timer + aria-live=off: the values update every second, which
          would otherwise flood a screen reader with announcements. The
          section label above already conveys the purpose. */}
      <div className="cdb-units" role="timer" aria-live="off">
        {units.map(([value, label]) => (
          <div className="cdb-unit" key={label}>
            <span className="cdb-value">{pad(value)}</span>
            <span className="cdb-label">{label}</span>
          </div>
        ))}
      </div>

      <p className="cdb-footnote">{COUNTDOWN_FOOTNOTE}</p>

      {/* Closing monogram — the last thing on the page, echoing the browser
          tab icon. The heart is a drawn path rather than the "♥" character:
          that glyph is missing from a good number of system fonts and would
          render as a tofu box on those devices.
          The whole group is one labelled image so a screen reader says
          "Karthik loves Santhiya" instead of spelling out "K", "S". */}
      <div className="cdb-monogram" role="img" aria-label={MONOGRAM_A11Y}>
        <span className="cdb-monogram-letter" aria-hidden="true">
          {MONOGRAM_INITIALS.groom}
        </span>
        <svg
          className="cdb-monogram-heart"
          viewBox="0 0 24 22"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M12 21C5.7 16.6 1.5 12.9 1.5 8.2 1.5 4.6 4.3 2 7.6 2c2 0 3.5 1 4.4 2.3C12.9 3 14.4 2 16.4 2c3.3 0 6.1 2.6 6.1 6.2 0 4.7-4.2 8.4-10.5 12.8Z"
            fill="currentColor"
          />
        </svg>
        <span className="cdb-monogram-letter" aria-hidden="true">
          {MONOGRAM_INITIALS.bride}
        </span>
      </div>
    </section>
  );
}
