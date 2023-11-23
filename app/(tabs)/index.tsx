import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import SudokuGrid from "../../components/SudokuGrid";
import InputControls from "../../components/Controls";
import { useEffect, useState } from "react";
import { difficulties } from "../../types/Difficulty";
import { StoredBoard, SudokuBoard } from "../../types/board";
import { checkIfStorageIsEmptyAndCreateBoards, useStoredBoards } from "../../hooks/sudoku/useStoredBoards";
import { copyBoard, mapToSudokuBoard } from "../../hooks/sudoku/sudoku";
import useSudoku from "../../hooks/sudoku/useSudoku";
import SudokuTopBar from "../../components/SudokuTopBar";

export default function TabOneScreen() {

  checkIfStorageIsEmptyAndCreateBoards();

  const [board, setBoard] = useState<StoredBoard>();

  const [difficulty, setDifficulty] = useState<string>(difficulties.EASY);

  const [boards, createNewBoards] = useStoredBoards(difficulty);

  function onFinish() {
    alert("finished");
  }

  const sudoku = useSudoku(board, onFinish);

  useEffect(() => {
    if  (boards.length === 0) {
      return;
    }
    const storedBoard: StoredBoard = boards[Math.floor(Math.random() * boards.length)];
    setBoard(storedBoard);

  }, [boards]);

  return (
    <View style={styles.container}>
      <SudokuTopBar difficulty={difficulty} onPickDifficulty={setDifficulty}></SudokuTopBar>
      <SudokuGrid
        grid={sudoku.board}
        selectedCell={sudoku.selectedCell}
        onCellClick={sudoku.changeSelectedCell}
      ></SudokuGrid>
      <InputControls onClick={sudoku.setNewValueOnSelectedCell}
      onMark={sudoku.markCell}
      onClear={() => {sudoku.setNewValueOnSelectedCell(0)}}
      onSolve={() => {}}
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
