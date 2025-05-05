import { useStorage } from "@plasmohq/storage/hook";
import { createContext, useContext, useEffect } from "react";
import type { Theme } from "src/types/theme";
import { OptionKey } from "src/types/option";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme?: Theme;
  setTheme: (theme: Theme) => Promise<void>;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => Promise.resolve(),
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme, { isLoading: isThemeLoading }] = useStorage<Theme>(OptionKey.THEME);

  useEffect(() => {
    if (isThemeLoading || !theme) return;

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, isThemeLoading]);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
