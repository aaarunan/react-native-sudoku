import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import SudokuGrid from "../../components/SudokuGrid";
import InputControls from "../../components/Controls";
import { useEffect, useState } from "react";
import { difficulties } from "../../types/Difficulty";
import { checkIfStorageIsEmptyAndCreateBoards, copyBoard, mapToSudokuBoard, useStoredBoards } from "../../hooks/useSudoku";
import { StoredBoard, SudokuBoard } from "../../types/board";

export default function TabOneScreen() {

  checkIfStorageIsEmptyAndCreateBoards();

  const [difficulty, setDifficulty] = useState<string>(difficulties.EASY);


  const [boards, _] = useStoredBoards(difficulty);
  const [board, setBoard] = useState<SudokuBoard>();
  const [solved, setSolved] = useState<number[][]>();
  const [invalidCells, setInvalidCells] = useState<number>(-1);

  useEffect(() => {
    const invalidCells = countInvalidCells();
    console.log(invalidCells);
    setInvalidCells(invalidCells);
  }, [board]);

  useEffect(() => {
    if (invalidCells === 0) {
      alert("You won!");
    }
  }, [invalidCells]);

  useEffect(() => {
    if  (boards.length === 0) {
      return;
    }
    setRandomBoardFromStorage();
  }, [boards]);

  const [selectedCell, setSelectedCell] = useState<[number, number]>([-1, -1]);

  function cellIsSolved(row: number, col: number) {
    if (!board || !solved) {
      return false;
    }
    const cell = board[row][col];
    const solvedCell = solved[row][col];

    return cell.value === solvedCell;
  }

  function setRandomBoardFromStorage() {
    const storedBoard: StoredBoard = boards[Math.floor(Math.random() * boards.length)];
    const board = mapToSudokuBoard(storedBoard.board)
    console.log(board)
    setBoard(board);
    setSolved(storedBoard.solvedBoard);
  }

  function onHandleMark() {
    if (!board) return;
    if (selectedCell[0] === -1) return;

    const newGrid = board;
    newGrid[selectedCell[0]][selectedCell[1]].isMarked = !newGrid[selectedCell[0]][selectedCell[1]].isMarked;
    setBoard(newGrid);

    setSelectedCell([-1, -1]);
  }

  function handleCellClick(row: number, col: number) {
    if (cellIsSolved(row, col) || !board) {
      return;
    }

    setSelectedCell([row, col]);
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

  function handleControlsClick(num: number) {
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

  function handleClearCell() {
    if (!board) return;
    if (selectedCell[0] === -1) return;
    const newGrid = copyBoard(board)
    newGrid[selectedCell[0]][selectedCell[1]].value = 0;
    setBoard(newGrid);

    setSelectedCell([-1, -1]);
  }

  return (
    <View style={styles.container}>
      <SudokuGrid
        grid={board}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
      ></SudokuGrid>
      <InputControls onClick={handleControlsClick}
      difficulty={difficulty}
      onMark={onHandleMark}
      onClear={handleClearCell}
      onSolve={() => {}}
      onPickDifficulty={setDifficulty}
      ></InputControls>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
