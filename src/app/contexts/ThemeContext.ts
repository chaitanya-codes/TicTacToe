"use client";
import { createContext } from "react";

export const ThemeContext = createContext<any>({ theme: false, setTheme: () => {} });