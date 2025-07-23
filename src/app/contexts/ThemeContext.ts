"use client";
import { createContext } from "react";

export const ThemeContext = createContext<{theme: boolean, setTheme: (value: boolean) => void}>({ theme: false, setTheme: () => {} });