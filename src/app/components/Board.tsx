"use client";
import { useState } from 'react'
import Box from './Box'

const defaultBoard = () => Array.from({ length: 3 }).map(_ => Array.from({ length: 3 }).map(_ => ''));

const Board = () => {
  const [board, setBoard] = useState(defaultBoard());
  const [pvp, setPvp] = useState(true);
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [playerSymbol, setPlayerSymbol] = useState(["⭕", "❌"]);
  const [turn, setTurn] = useState(0);
  const [started, setStarted] = useState(false);

  const click = (i: number, j: number) => {
    if (board[i][j]) return "active";
    if (!pvp && turn) return "computer";
    const copy = [...board];
    copy[i][j] = playerSymbol[turn];
    setTurn(turn => turn == 0 ? 1 : 0);
    setBoard(copy);
    setStarted(true);
    const winner = checkWinner();
    if (winner) return won(winner);
    if (checkTie()) return;
    setTimeout(() => { if (!pvp && !turn) computerMove() }, (1 + Math.floor(Math.random() * 4)) * 350)
  }

  const computerMove = () => {
    const copy = board;

    const winMove = findBestMove(playerSymbol[1]);
    const blockMove = findBestMove(playerSymbol[0]);
    if (winMove || blockMove) {
      if (winMove) copy[winMove.i][winMove.j] = playerSymbol[1];
      else if (blockMove) copy[blockMove.i][blockMove.j] = playerSymbol[1];
    } else if (!checkTie()) {
      let row = Math.floor(Math.random() * 3);
      let col = Math.floor(Math.random() * 3);
      while (copy[row][col]) {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);    
      }
      copy[row][col] = playerSymbol[1];
    }
    setBoard(copy);
    setTurn(turn => turn == 0 ? 1 : 0);
    if (checkTie()) return;
    const winner = checkWinner();
    if (winner) return won(winner);
  }

  const findBestMove = (symbol: string) => {
    // check if user or computer can win by performing move
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j] && !checkWinner()) {
          board[i][j] = symbol;
          const winner = checkWinner();
          board[i][j] = '';
          if (winner == symbol) return { i, j };
        }
      }
    }
    return 0;
  }

  const checkWinner = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) return board[i][0];
      if (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) return board[0][i];
    }
    if (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) return board[0][0];
    if (board[0][2] && board[0][2] == board[1][1] && board[1][1] == board[2][0]) return board[0][2];
    return false;
  }
  
  const checkTie = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) return false;
      }
    }
    won(null);
    return true;
  }

  const won = (winner: string | null) => {
    setTimeout(() => {
      if (winner) alert(winner + " wins");
      else alert("It's a tie!");
      setTurn(0);
      setBoard(defaultBoard());
      setStarted(false);
    }, 600);
  }

  return (
    <div className='flex flex-col md:flex-row md:justify-around items-center md:items-start w-screen mt-8'>
      <div className="players sm:flex flex-col gap-5 mt-8 shrink-2 self-start absolute md:relative md:self-auto hidden">
        <h1>Player Names:</h1>
        <input type="text" placeholder='Player 1' className='p-3 placeholder:text-slate-500' onChange={e => setPlayers([e.target.value, players[1]])} />
        <input type="text" placeholder='Player 2' className='p-3 placeholder:text-slate-500' onChange={e => setPlayers([players[0], e.target.value])} disabled={!pvp} />
      </div>
      <div id="board" className={`relative shrink-0 board md:w-[33vmax] md:h-[33vmax] w-[45vmax] h-[45vmax] grid grid-cols-3 grid-rows-3 gap-1 bg-slate-400`}>
        <span className='text-lg absolute -top-10'>Turn: {turn == 0 ? players[0] : players[1]}</span>
        {Array.from({ length: 3 }).map((_, i) => {
          return Array.from({ length: 3 }).map((_, j) => {
            return <Box key={i + j + 1} id={i + j + 1} turn={turn} playerSymbol={playerSymbol} symbol={board[i][j]} setActive={() => click(i, j)} />
          })
        })
        }
      </div>
      <div className="info flex">
        <div className="mt-8 bg-indigo-300 p-6 flex flex-col gap-4">
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
              className="relative flex justify-around items-center w-full p-3 h-8"
              disabled={started}
            >
              <div className={`absolute w-1/2 h-full bg-sky-800 z-0 transition-all duration-300 ${playerSymbol[0] == "❌" ? 'left-1/2 rounded-r-2xl' : 'left-0 rounded-l-2xl'}`}></div>
              <div className={`absolute w-1/2 h-full bg-green-800 z-0 transition-all duration-300 ${playerSymbol[0] == "❌" ? 'right-1/2 rounded-l-2xl' : 'right-0 rounded-r-2xl'}`}></div>
              <div className='z-10 text-lg'>{playerSymbol[0]}</div>
              <div className='z-10 text-lg'>{playerSymbol[1]}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board