"use client";
import { createContext } from "react";

export const ThemeContext = createContext<{theme: boolean, setTheme: Function}>({ theme: false, setTheme: () => {} });