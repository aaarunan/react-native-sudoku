import React, { useEffect, useState } from "react";
import { Text, View, useThemeColor } from "../components/Themed";
import { Platform, StyleSheet } from "react-native";
import { SudokuBoard } from "../types/board";
import SudokuCell from "./SudokuCell";
import Colors from "../constants/Colors";
import { useTheme } from "@react-navigation/native";

interface props {
  grid: SudokuBoard | undefined;
  selectedCell: [number, number];
  onCellClick: (row: number, col: number) => void;
}

export default function SudokuGrid(props: props) {
  const GRIDSIZE = 9;

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
          val = null;
        }
        rowCells.push(
          <SudokuCell
            cell={sudokuGrid[row][col]}
            key={`cell-${row}-${col}`}
            row={row}
            col={col}
            isSelected={
              props.selectedCell[0] === row && props.selectedCell[1] === col
            }
            onCellClick={props.onCellClick}
          />
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

  return <View style={[styles.gridContainer]}>{ generateSudokuHTMLGrid(props.grid, GRIDSIZE) }</View>;
}

const styles = StyleSheet.create({
  gridContainer: {
    width: "100%",
    borderWidth: 4,
  },
  gridRow: {
    flexDirection: "row",
    width: "100%",
    margin: 0,
  },
});
