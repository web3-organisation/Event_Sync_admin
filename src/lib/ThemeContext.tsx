import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  toggle: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("es-admin-theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("es-admin-theme", mode);
    // Update meta theme-color
    const meta = document.querySelector("meta[name='theme-color']");
    if (meta)
      meta.setAttribute("content", mode === "dark" ? "#080E1A" : "#F1F5F9");
    // Update body background immediately to avoid flash
    document.body.style.backgroundColor =
      mode === "dark" ? "#080E1A" : "#F1F5F9";
  }, [mode]);

  const toggle = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
