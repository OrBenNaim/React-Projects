import { useState } from "react";

interface SquareProps{
  value: string | null;
  onSquareClick: () => void;
}


function Square({value, onSquareClick}: SquareProps): JSX.Element{
  
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


interface BoardProps{
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}


function calculateWinner(squares: string[]): string | null{
  /*
  0  1  2 
  3  4  5
  6  7  8
  */
  
  const optionsToWin = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let idx: number = 0; idx < optionsToWin.length; idx++){
      const [idx1, idx2, idx3] = optionsToWin[idx];

      if(squares[idx1] && squares[idx1] === squares[idx2] && squares[idx1] === squares[idx3]){
        return squares[idx1];   // squares[idx1] is a string ('X' or 'O')
      }
  }
  return null;
}


function Board({xIsNext, squares, onPlay}: BoardProps): JSX.Element{
  
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  
  function handleClick(index: number): void{
    
    // Check if the selected square already marked or if there is a winner
    if(squares[index] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();  // Create a copy of squares array
    
    if (xIsNext){
      nextSquares[index] = "X";
    }
    else{
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);  
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner){
    status = 'Winner: ' + winner;
  }
  else{
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game(): JSX.Element{
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: string[]): void{
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}