import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import SudokuGrid from "../../components/SudokuGrid";
import InputControls from "../../components/Controls";
import { useState } from "react";
import { copyBoard, createEmptyBoard, useStoredBoards } from "../../hooks/useSudoku";
import { difficulties } from "../../types/Difficulty";
import { SudokuBoard } from "../../types/board";

export default function TabTwoScreen() {
  const [grid, setGrid] = useState<SudokuBoard>(createEmptyBoard());
  const [selectedCell, setSelectedCell] = useState<[number, number]>([-1, -1]);

  const [boards, createNewBoard] =  useStoredBoards();

  const [difficulty, setDifficulty] = useState<string>(difficulties.EASY);

  function handleOnCreate() {
    console.log(difficulty)
    try {
      createNewBoard(grid, difficulty);
    } catch (e) {
      alert(e);
    }
  }

  function handleControlsClick(num: number) {
    if (selectedCell[0] === -1) {
      return;
    }

    setValueAndClearSelectedCell(num);
  }

  function setValueAndClearSelectedCell(num: number) {
    const newGrid = copyBoard(grid);

    newGrid[selectedCell[0]][selectedCell[1]].value = num;

    console.log(newGrid)
    setGrid(newGrid);

    setSelectedCell([-1, -1]);
  }

  function handleCellClick(row: number, col: number) {
    setSelectedCell([row, col]);
  }

  function handleClearCell() {
    setValueAndClearSelectedCell(0);
  }

  return (
    <View style={styles.container}>
      <SudokuGrid
        grid={grid}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
      />
      <InputControls
        onClick={handleControlsClick}
        difficulty={difficulty}
        onPickDifficulty={setDifficulty}
        creatorMode={true}
        onClear={handleClearCell}
        onCreate={handleOnCreate}
        onSolve={() => {
          console.log("solve");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
