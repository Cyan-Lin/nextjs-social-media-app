"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class" // 這個theme provider會看html tag的class (在toggle theme的時候，會自動切換 html tag的class)
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
