import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Box = ({ symbol, playerSymbol, id, turn, active, setActive }: { symbol: string, id: number, playerSymbol: Array<string>, turn: number, active: boolean, setActive: () => string | void }) => {
  const { theme } = useContext(ThemeContext);
  const [showOccupied, setShowOccupied] = useState(false);
  const [placeholder, setPlaceholder] = useState(false)
  const [text, setText] = useState("");

  return (
    <div
      onClick={() => {
        const res = setActive();
        if (res) {
          if (res == "active") setText("Occupied");
          else if (res == "computer") setText("Computer's turn");
          document.body.style.pointerEvents = "none";
          setShowOccupied(true);
          setTimeout(() => {
            setShowOccupied(false);
            setText("")
            document.body.style.pointerEvents = "";
          }, 1500);
        }
      }}
      className={`relative flex justify-center items-center text-3xl hover:cursor-crosshair ${active ? (symbol == "⭕" ? "bg-sky-700 hover:bg-sky-800" : "bg-green-400 hover:bg-green-500") : theme ? "bg-gray-600 hover:bg-gray-700" : "bg-white hover:bg-white/60"}`}
      onMouseEnter={() => setPlaceholder(true)}
      onMouseLeave={() => setPlaceholder(false)}
    >
      {placeholder && !active ? <span className='text-gray-500/35 animate-pulse [animation-duration:800ms] text-4xl'>{playerSymbol[turn]}</span> : <span className='text-5xl'>{symbol.toUpperCase()}</span>}
      {showOccupied && <span className='absolute bottom-5 text-xl text-red-500 animate-pulse [animation-duration:500ms] mt-1'>{text}!</span>}
    </div>
  )
}

export default Box