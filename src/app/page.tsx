"use client";
import { useState } from "react";
import Board from "./components/Board";
import ThemeChanger from "./components/ThemeChanger";
import { ThemeContext } from "./contexts/ThemeContext";

export default function Home() {
  const [theme, setTheme] = useState(false);
  return (
    <div className={`flex justify-center items-center h-screen w-screen ${theme ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <ThemeChanger />
        <Board />
      </ThemeContext.Provider>
    </div>
  );
}