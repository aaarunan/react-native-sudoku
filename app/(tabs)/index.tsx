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
    alert("finished");
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
      <SudokuTopBar
        difficulty={difficulty}
        onPickDifficulty={setDifficulty}
      ></SudokuTopBar>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
      <SudokuGrid
        grid={sudoku.board}
        selectedCell={sudoku.selectedCell}
        onCellClick={sudoku.changeSelectedCell}
      ></SudokuGrid>
      </View>
      <InputControls onClick={sudoku.setNewValueOnSelectedCell}></InputControls>
      <SudokuBottomBar
        onClear={() => sudoku.setNewValueOnSelectedCell(0)}
        onMark={sudoku.markCell}
      ></SudokuBottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "auto",
        margin: "auto",
        minWidth: "50%"
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