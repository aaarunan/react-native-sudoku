import { useEffect, useState } from "react";
import { StoredBoard, SudokuBoard } from "../../types/board";
import { mapToSudokuBoard } from "./sudoku";

interface useSudokuProps {
  board: StoredBoard | undefined;
  onFinished?: () => void;
}

export default function useSudoku(prop: StoredBoard | undefined, onFinished?: () => void) {
  const [board, setBoard] = useState<SudokuBoard>();
  const [solved, setSolved] = useState<number[][]>();
  const [invalidCells, setInvalidCells] = useState<number>(-1);
  const [selectedCell, setSelectedCell] = useState<[number, number]>([-1, -1]);

  useEffect(() => {
    const invalidCells = countInvalidCells();
    console.log(invalidCells);
    setInvalidCells(invalidCells);
  }, [board]);

  useEffect(() => {
    if (onFinished && invalidCells === 0) {
      onFinished();
    }
  }, [invalidCells]);

  useEffect(() => {
    if (!prop) return;
    setBoard(mapToSudokuBoard(prop.board));
    setSolved(prop.solvedBoard);
  }, [prop]);

  function markCell() {
    if (!board) return;
    if (selectedCell[0] === -1) return;

    const newGrid = board;
    newGrid[selectedCell[0]][selectedCell[1]].isMarked = !newGrid[selectedCell[0]][selectedCell[1]].isMarked;
    setBoard(newGrid);

    setSelectedCell([-1, -1]);
  }

  function changeSelectedCell(row: number, col: number) {
    if (cellIsSolved(row, col) || !board) {
      return;
    }

    setSelectedCell([row, col]);
  }

  function setNewValueOnSelectedCell(num: number) {
    if (selectedCell[0] === -1) return;

    if (!board) return;

    const newGrid = board;
    newGrid[selectedCell[0]][selectedCell[1]].value = num;
    setBoard(newGrid);
    if (cellIsSolved(selectedCell[0], selectedCell[1])) {
      setInvalidCells(invalidCells - 1);
    }

    setSelectedCell([-1, -1]);
  }

  function countInvalidCells() {
    if (!board) return -1;
    let count = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!cellIsSolved(row, col)) {
          count++;
        }
      }
    }
    return count;
  }

  function cellIsSolved(row: number, col: number) {
    if (!board || !solved) {
      return false;
    }
    const cell = board[row][col];
    const solvedCell = solved[row][col];

    return cell.value === solvedCell;
  }

  return {
    board,
    solved,
    invalidCells,
    selectedCell,
    markCell,
    changeSelectedCell,
    setNewValueOnSelectedCell,
  }

}