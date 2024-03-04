import { useState } from "react";

function Square({ value, onsqClick }) {
  return (
    <button
      className="square border border-black bg-transparent w-8 h-8 box-border"
      onClick={onsqClick}
    >
      {value}
    </button>
  );
}

function Board({ isNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquare = squares.slice();

    if (isNext) {
      nextSquare[i] = "O";
    } else {
      nextSquare[i] = "X";
    }
    onPlay(nextSquare);
  }

  const Winner = calculateWinner(squares);
  let status;
  if (Winner) {
    status = "Winner: " + Winner;
  } else {
    status = "Next Player is: " + (isNext ? "O" : "X");
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="font-bold mb-2">{status}</div>

        <div className="flex items-center">
          <Square value={squares[0]} onsqClick={() => handleClick(0)} />
          <Square value={squares[1]} onsqClick={() => handleClick(1)} />
          <Square value={squares[2]} onsqClick={() => handleClick(2)} />
        </div>
        <div className="flex items-center">
          <Square value={squares[3]} onsqClick={() => handleClick(3)} />
          <Square value={squares[4]} onsqClick={() => handleClick(4)} />
          <Square value={squares[5]} onsqClick={() => handleClick(5)} />
        </div>
        <div className="flex items-center">
          <Square value={squares[6]} onsqClick={() => handleClick(6)} />
          <Square value={squares[7]} onsqClick={() => handleClick(7)} />
          <Square value={squares[8]} onsqClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const isNext = currentMove % 2 === 0;

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function JumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let discription;
    if (move > 0) {
      discription = "go to move #" + move;
    } else {
      discription = "go to start";
    }

    return (
      <li key="{move}">
        <button
          onClick={() => JumpTo(move)}
          className="border border-black rounded bg-slate-200"
        >
          {discription}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="flex justify-center items-center flex-row h-screen">
        <Board isNext={isNext} squares={currentSquare} onPlay={handlePlay} />
        <div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
