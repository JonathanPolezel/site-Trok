// src/components/theme-toggle.tsx
"use client";

import { useTheme } from "@/hooks/use-theme";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
}
