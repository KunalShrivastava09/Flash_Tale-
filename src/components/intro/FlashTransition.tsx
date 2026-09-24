/**
 * A full-bleed warm parchment panel used for the ~120ms camera-flash beat.
 * CinematicIntro tweens its opacity almost instantly to 1 and back to 0 —
 * this component just provides the element and the warm paper flash color.
 */
export default function FlashTransition() {
  return (
    <div
      data-flash-el="flash-panel"
      className="pointer-events-none absolute inset-0 bg-[#f2e4c5] opacity-0"
      aria-hidden="true"
    />
  );
}
