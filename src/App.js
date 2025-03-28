import { useState, useRef } from "react";
import "./styles.css";

const LoadedBoard = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

const isValid = (grid, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
    let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    let boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (grid[boxRow][boxCol] === num) return false;
  }
  return true;
};

const solveSudoku = async (grid, setBoard, speedRef, stopRef) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (stopRef.current) return false;
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            setBoard(JSON.parse(JSON.stringify(grid)));
            await new Promise((resolve) =>
              setTimeout(resolve, speedRef.current)
            );
            if (await solveSudoku(grid, setBoard, speedRef, stopRef))
              return true;
            grid[row][col] = 0;
            setBoard(JSON.parse(JSON.stringify(grid)));
            await new Promise((resolve) =>
              setTimeout(resolve, speedRef.current)
            );
          }
        }
        return false;
      }
    }
  }
  return true;
};

const isValidSudoku = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== 0) {
        let num = grid[row][col];
        grid[row][col] = 0;
        if (!isValid(grid, row, col, num)) {
          grid[row][col] = num;
          return false;
        }
        grid[row][col] = num;
      }
    }
  }
  return true;
};

function Display({ board, onChange }) {
  return (
    <table>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={cell === 0 ? "" : cell}
                  onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [board, setBoard] = useState(() =>
    JSON.parse(JSON.stringify(LoadedBoard))
  );
  const [speed, setSpeed] = useState(500);
  const [solving, setSolving] = useState(false);
  const speedRef = useRef(speed);
  const stopRef = useRef(false);

  const handleChange = (rowIndex, colIndex, value) => {
    if (value === "" || (value >= 1 && value <= 9)) {
      const newBoard = board.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex
            ? value
              ? parseInt(value)
              : 0
            : cell
        )
      );
      setBoard(newBoard);
    }
  };

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <Display board={board} onChange={handleChange} />

      <label>
        Speed: {speed}ms
        <input
          type="range"
          min="0"
          max="1000"
          value={speed}
          onChange={(e) => {
            setSpeed(parseInt(e.target.value));
            speedRef.current = parseInt(e.target.value);
          }}
        />
      </label>

      <button
        onClick={() => {
          if (!isValidSudoku(board)) {
            alert("Invalid Sudoku board!");
            return;
          }
          setSolving(true);
          stopRef.current = false;
          let newBoard = JSON.parse(JSON.stringify(board));
          solveSudoku(newBoard, setBoard, speedRef, stopRef).then(() =>
            setSolving(false)
          );
        }}
        disabled={solving}
      >
        Solve Sudoku
      </button>

      <button
        onClick={() => {
          stopRef.current = true;
          setSolving(false);
        }}
        disabled={!solving}
      >
        Stop Solving
      </button>

      <button
        onClick={() => {
          stopRef.current = true;
          setSolving(false);
          setBoard(JSON.parse(JSON.stringify(LoadedBoard)));
        }}
      >
        Reset Board
      </button>
    </div>
  );
}
