import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Box = ({ symbol, playerSymbol, id, turn, setActive }: { symbol: string, id: number, playerSymbol: Array<string>, turn: number, setActive: () => string | void }) => {
  const { theme } = useContext(ThemeContext);
  const [showText, setShowText] = useState(false);
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
          setShowText(true);
          setTimeout(() => {
            setShowText(false);
            setText("")
            document.body.style.pointerEvents = "";
          }, 1500);
        }
      }}
      className={`relative flex justify-center items-center text-3xl hover:cursor-crosshair ${symbol ? (symbol == "⭕" ? "bg-sky-700 hover:bg-sky-800" : "bg-green-400 hover:bg-green-500") : theme ? "bg-gray-600 hover:bg-gray-700" : "bg-white hover:bg-white/60"}`}
      onMouseEnter={() => setPlaceholder(true)}
      onMouseLeave={() => setPlaceholder(false)}
    >
      {placeholder && !symbol ? <span className='text-gray-500/35 animate-pulse [animation-duration:800ms] text-4xl'>{playerSymbol[turn]}</span> : <span className='text-5xl'>{symbol.toUpperCase()}</span>}
      {showText && <span className='absolute bottom-5 text-xl text-red-500 animate-pulse [animation-duration:500ms] mt-1'>{text}!</span>}
    </div>
  )
}

export default Box