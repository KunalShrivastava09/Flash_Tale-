"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// Layout effects are a no-op during SSR and log a warning there, so on the
// server we fall back to a regular effect. The state still starts at
// `false` either way; the layout effect updates it synchronously before
// paint on the client, so there's no visible flash of the wrong branch.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setReduced(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
