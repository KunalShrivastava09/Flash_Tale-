/**
 * Formats a frame count as a cinema-style timecode: MM:SS:FF.
 * Not tied to real elapsed time — driven by a controlled counter so the
 * intro's on-screen timecode reads as a deliberate cinematic detail.
 */
export function formatTimecode(totalFrames: number, fps = 24): string {
  const safeFrames = Math.max(0, Math.floor(totalFrames));
  const frames = safeFrames % fps;
  const totalSeconds = Math.floor(safeFrames / fps);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}
