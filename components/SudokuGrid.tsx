import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import styles from "../assets/styles/grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import Cell from "../types/Cell";
import { SudokuBoard } from "../types/board";

interface props {
  grid: SudokuBoard | undefined;
  selectedCell: [number, number];
  onCellClick: (row: number, col: number) => void;
}

export default function SudokuGrid(props: props) {
  const GRIDSIZE = 9;

  const [htmlGrid, setHTMLGrid] = useState(generateSudokuHTMLGrid());

  useEffect(() => {
    setHTMLGrid(generateSudokuHTMLGrid());
  }, [props.grid, props.selectedCell]);

  function generateSudokuHTMLGrid(
    sudokuGrid: SudokuBoard | undefined = props.grid,
    gridSize = GRIDSIZE
  ): JSX.Element[] {
    if (sudokuGrid === undefined) {
      return [];
    }
    const htmlGrid = [];
    for (let row = 0; row < gridSize; row++) {
      const rowCells = [];
      for (let col = 0; col < gridSize; col++) {
        let val = sudokuGrid[row][col].value as number | null;
        if (val == 0) {
          val = null
        }
        rowCells.push(
          <TouchableOpacity
            key={`cell-${row}-${col}`}
            style={getCellClass(row, col)}
            onPress={() => props.onCellClick(row, col)}
          >
            <Text>{ val }</Text>
          </TouchableOpacity>
        );
      }
      htmlGrid.push(
        <View key={`row-${row}`} style={styles.gridRow}>
          {rowCells}
        </View>
      );
    }
    return htmlGrid;
  }

  function getCellClass(row: number, col: number) {
    const selectedStyles: [object]  = [styles.gridCell]
    if (row === props.selectedCell[0] && col === props.selectedCell[1]) {
      selectedStyles.push(styles.selectedCell);
    }
    if (props.grid!![row][col].isMarked) {
      selectedStyles.push(styles.markedCell);
    }
    return selectedStyles;
  }

  return <View style={styles.gridContainer}>{htmlGrid}</View>;
}
