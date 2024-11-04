// src/hooks/use-theme.ts
"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useNextTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme,
    setTheme,
    systemTheme,
    mounted,
  };
}
