import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import SudokuGrid from "../../components/SudokuGrid";
import InputControls from "../../components/Controls";
import { useState } from "react";
import { difficulties } from "../../types/Difficulty";
import { StoredBoard } from "../../types/board";
import { useStoredBoards } from "../../hooks/sudoku/useStoredBoards";
import { createEmptyNumberBoard } from "../../hooks/sudoku/sudoku";
import useSudoku from "../../hooks/sudoku/useSudoku";
import SudokuTopBar from "../../components/SudokuTopBar";
import SudokuBottomBar from "../../components/SudokuBottomBar";
import { useTranslation } from "react-i18next";
import { SudokuScreenStyles as styles } from ".";

export default function TabTwoScreen() {
  const [board] = useState<StoredBoard>({
    board: createEmptyNumberBoard(),
    solvedBoard: createEmptyNumberBoard(-1),
    difficulty: difficulties.EASY,
  } as StoredBoard);

  const sudoku = useSudoku(board);

  const [_, createNewBoard] = useStoredBoards();

  const [difficulty, setDifficulty] = useState<string>(difficulties.EASY);

  const { t } = useTranslation();

  function handleOnCreate() {
    if (boardIsEmpty()) {
      alert("Board is empty");
      return;
    }
    try {
      createNewBoard(sudoku.board, difficulty);
      alert(t("successBoard"));
    } catch (e) {
      alert(e);
    }
  }

  function boardIsEmpty() {
    if (!sudoku.board) {
      return true;
    }
    return sudoku.board.every((row) => {
      return row.every((cell) => {
        return cell.value === 0;
      });
    });
  }

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
                onCreate={handleOnCreate}
                creatorMode
              ></SudokuBottomBar>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
