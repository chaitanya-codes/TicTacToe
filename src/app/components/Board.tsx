"use client";
import { useState } from 'react'
import Box from './Box'

const defaultBoard = () => Array.from({ length: 3 }).map(_ =>
  Array.from({ length: 3 }).map(_ => ({ symbol: '', active: false })
));

const Board = () => {
  const [board, setBoard] = useState(defaultBoard());
  const [pvp, setPvp] = useState(true);
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [playerSymbol, setPlayerSymbol] = useState(["⭕", "❌"]);
  const [turn, setTurn] = useState(0);
  const [started, setStarted] = useState(false);

  const click = (i: number, j: number) => {
    if (board[i][j].active) return "active";
    if (!pvp && turn) return "computer";
    const copy = [...board];
    copy[i][j].active = !copy[i][j].active;
    copy[i][j].symbol = playerSymbol[turn];
    setTurn(turn => turn == 0 ? 1 : 0);
    setBoard(copy);
    setStarted(true);
    if (turn && !pvp) computerMove();
    const winner = checkWinner();
    if (winner) {
      setTimeout(() => {
        alert(winner + " wins");
        setBoard(defaultBoard());
        setStarted(false);
      }, 600);
    }
  }

  const computerMove = () => {

    const copy = board;
    copy[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)].symbol = playerSymbol[1];
    setBoard(copy);
    // const winner = findBestMove("X");
    // if (winner) {

    // }
  }

  const findBestMove = (symbol: string) => {
    return 0;
  }

  const checkWinner = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0].symbol && board[i][0].symbol == board[i][1].symbol && board[i][1].symbol == board[i][2].symbol) return board[i][0].symbol;
      if (board[0][i].symbol && board[0][i].symbol == board[1][i].symbol && board[1][i].symbol == board[2][i].symbol) return board[0][i].symbol;
    }
    if (board[0][0].symbol && board[0][0].symbol == board[1][1].symbol && board[1][1].symbol == board[2][2].symbol) return board[0][0].symbol;
    if (board[0][2].symbol && board[0][2].symbol == board[1][1].symbol && board[1][1].symbol == board[2][0].symbol) return board[0][2].symbol;
    return false;
  }

  return (
    <div>
      <div className="players absolute left-10 flex flex-col gap-5">
        <input type="text" placeholder='Player 1' className='p-3' onChange={e => setPlayers([e.target.value, players[1]])} />
        <input type="text" placeholder='Player 2' className='p-3' onChange={e => setPlayers([players[0], e.target.value])} disabled={!pvp} />
      </div>
      <div className="info p-4">
        <span className='text-lg'>Turn: {turn == 0 ? players[0] : players[1]}</span>
        <div className="pvp absolute right-16 bg-indigo-300 p-5 flex flex-col gap-4">
          <h3 className='text-lg text-teal-800'>
            {players[0]} <span className='text-black'>v/s</span> {pvp ? players[1] : `🤖 Computer`}
          </h3>
          <button
            className='p-3 min-w-60 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-800 disabled:bg-emerald-800'
            onClick={() => { setPvp(pvp => !pvp); setBoard(defaultBoard()); if (pvp) setPlayers([players[0], "Computer"]); else setPlayers([players[0], "Player 2"]) }}
            disabled={started}
          >
            Switch to {pvp ? "Computer Mode" : "Player vs Player"}
          </button>
          <div className='flex flex-col w-full gap-2'>
            <div className='flex justify-around items-center'><h1>Player 1</h1><h1>Player 2</h1></div>
            <button
              onClick={() => setPlayerSymbol(symbols => symbols.toReversed())}
              className="relative flex justify-around items-center w-full p-3 h-8">
              <div className={`absolute w-1/2 h-full bg-sky-800 z-0 transition-all duration-300 ${playerSymbol[0] == "❌" ? 'left-1/2 rounded-r-2xl' : 'left-0 rounded-l-2xl'}`}></div>
              <div className={`absolute w-1/2 h-full bg-green-800 z-0 transition-all duration-300 ${playerSymbol[0] == "❌" ? 'right-1/2 rounded-l-2xl' : 'right-0 rounded-r-2xl'}`}></div>
              <div className='z-10 text-lg'>{playerSymbol[0]}</div>
              <div className='z-10 text-lg'>{playerSymbol[1]}</div>
            </button>
          </div>
        </div>
      </div>
      <div id="board" className={`board w-[500px] h-[500px] grid grid-cols-3 grid-rows-3 gap-1 bg-slate-400`}>
        {Array.from({ length: 3 }).map((_, i) => {
          return Array.from({ length: 3 }).map((_, j) => {
            return <Box key={i + j + 1} id={i + j + 1} turn={turn} playerSymbol={playerSymbol} symbol={board[i][j].symbol} active={board[i][j].active} setActive={() => click(i, j)} />
          })
        })
        }
      </div>
    </div>
  )
}

export default Board