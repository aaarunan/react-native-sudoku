import { Cell, StoredBoard, SudokuBoard } from "../../types/board";

export function mapToSudokuBoard(board: number[][]): SudokuBoard {
  return board.map((row) => {
    return row.map((cell) => {
      return {
        value: cell,
        isMarked: false,
      } as Cell;
    });
  });
}

export function mapToNumberBoard(board: SudokuBoard): number[][] {
  return board.map((row) => {
    return row.map((cell) => {
      return cell.value;
    });
  });
}

export function copyBoard(board: SudokuBoard): SudokuBoard {
  return board.map((row) => {
    return row.map((cell) => {
      return {
        value: cell.value,
        isMarked: cell.isMarked,
      } as Cell;
    });
  });
}

export function createEmptyBoard(): SudokuBoard {
  return Array.from(Array(9), () => new Array(9).fill({
    value: 0,
    isMarked: false,
  } as Cell));
}

export function createEmptyNumberBoard(val:number = 0): number[][] {
  return Array.from(Array(9), () => new Array(9).fill(val)); }

export function filterBoardsByDifficulty(
  boards: StoredBoard[],
  difficulty: string | null | undefined
) {
  if (difficulty == null) return boards;
  return boards.filter((board) => board.difficulty === difficulty);
}

export function isValidSudoku(grid: number[][]): boolean {
  const N = 9;

  function isValidPlacement(row: number, col: number, num: number): boolean {
    for (let x = 0; x < N; x++) {
      if (x !== col && grid[row][x] === num) {
        return false; // Check the current row
      }
      if (x !== row && grid[x][col] === num) {
        return false; // Check the current column
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          startRow + i !== row &&
          startCol + j !== col &&
          grid[startRow + i][startCol + j] === num
        ) {
          return false; // Check the 3x3 subgrid
        }
      }
    }

    return true;
  }

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const num = grid[row][col];
      if (num !== 0 && !isValidPlacement(row, col, num)) {
        return false; // Invalid initial placement
      }
    }
  }

  return true; 
}


export function solveSudoku(board: number[][]): number[][] | null {
  const [row, col] = findEmptyCell(board);

  if (row === -1) {
    return board;
  }

  for (let num = 1; num < 10; num++) {
    if (cellIsValid(board, row, col, num)) {
      board[row][col] = num;
      const solvedBoard = solveSudoku(board);
      if (solvedBoard) {
        return solvedBoard;
      }
      board[row][col] = 0;
    }
  }
  return null;
}
function cellIsValid(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);

    if (board[m][n] == num) {
      return false;
    }

    const rowNotValid = board[i][col] == num;
    const colNotValid = board[row][i] == num;

    if (rowNotValid || colNotValid) {
      return false;
    }
  }
  return true;
}

function findEmptyCell(board: number[][]): [number, number] {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
}