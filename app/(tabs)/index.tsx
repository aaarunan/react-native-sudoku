import { Platform, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import SudokuGrid from "../../components/SudokuGrid";
import InputControls from "../../components/Controls";
import { useEffect, useState } from "react";
import { difficulties } from "../../types/Difficulty";
import { StoredBoard } from "../../types/board";
import { useStoredBoards } from "../../hooks/sudoku/useStoredBoards";
import useSudoku from "../../hooks/sudoku/useSudoku";
import SudokuTopBar from "../../components/SudokuTopBar";
import SudokuBottomBar from "../../components/SudokuBottomBar";

export default function TabOneScreen() {
  const [board, setBoard] = useState<StoredBoard>();

  const [difficulty, setDifficulty] = useState<string>(difficulties.EASY);

  const [boards] = useStoredBoards(difficulty);

  function onFinish() {
    alert("You finished the board!");
  }

  const sudoku = useSudoku(board, onFinish);

  useEffect(() => {
    if (boards.length === 0) {
      return;
    }
    const storedBoard: StoredBoard =
      boards[Math.floor(Math.random() * boards.length)];
    setBoard(storedBoard);
  }, [boards]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <SudokuTopBar
          difficulty={difficulty}
          onPickDifficulty={setDifficulty}
        ></SudokuTopBar>
        <View style={styles.mainContainer}>
          <View style={styles.leftContainer}>
            <SudokuGrid
              grid={sudoku.board}
              selectedCell={sudoku.selectedCell}
              onCellClick={sudoku.changeSelectedCell}
            ></SudokuGrid>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.controls}>
              <InputControls
                onClick={sudoku.setNewValueOnSelectedCell}
              ></InputControls>
            </View>
            <View style={styles.controls}>
              <SudokuBottomBar
                onClear={() => sudoku.setNewValueOnSelectedCell(0)}
                onMark={sudoku.markCell}
              ></SudokuBottomBar>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    width: Platform.OS === "web" ? "50%" : "100%",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: Platform.OS === "web" ? "center" : "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContainer: {
    display: "flex",
    flexDirection: Platform.OS === "web" ? "row" : "column",
    width: "100%",
    height: Platform.OS === "web" ? "auto" : "100%",
  },
  leftContainer: {
    marginTop: Platform.OS === "web" ? 20 : 0,
    width: Platform.OS === "web" ? "50%" : "100%",
  },
  rightContainer: {
    width: Platform.OS === "web" ? "50%" : "100%",
    alignItems: "center",
    justifyContent: Platform.OS === "web" ? "center" : "flex-start",
    height: "100%",
  },
  controls: {
    width: Platform.OS === "web" ? "50%" : "100%",
    paddingTop: 20,
  },
});

export { styles as SudokuScreenStyles };
