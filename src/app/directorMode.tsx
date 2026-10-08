import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type DirectorUiMode = "simple" | "professional";

const STORAGE_KEY = "storyai:director-desk-ui-mode";

export function resolveInitialDirectorUiMode(search: string, storedValue: string | null): DirectorUiMode {
  const queryMode = new URLSearchParams(search).get("mode");
  if (queryMode !== null) {
    return queryMode === "professional" ? "professional" : "simple";
  }
  return storedValue === "professional" ? "professional" : "simple";
}

type DirectorModeContextValue = {
  mode: DirectorUiMode;
  setMode: (mode: DirectorUiMode) => void;
};

const DirectorModeContext = createContext<DirectorModeContextValue>({
  // Direct component mounts keep the historical complete UI; the application provider defaults users to simple mode.
  mode: "professional",
  setMode() {},
});

export function DirectorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DirectorUiMode>(() => {
    let storedValue: string | null = null;
    try {
      storedValue = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Embedded/private browsing may block storage. Simple mode remains the safe default.
    }
    return resolveInitialDirectorUiMode(window.location.search, storedValue);
  });

  const value = useMemo<DirectorModeContextValue>(() => ({
    mode,
    setMode(nextMode) {
      setModeState(nextMode);
      try {
        window.localStorage.setItem(STORAGE_KEY, nextMode);
      } catch {
        // Mode switching still works for the current session when persistence is unavailable.
      }
    },
  }), [mode]);

  return <DirectorModeContext.Provider value={value}>{children}</DirectorModeContext.Provider>;
}

export function useDirectorMode() {
  return useContext(DirectorModeContext);
}
