import { Pressable, StyleSheet } from "react-native";
import Button from "./Button";
import { Text, View } from "./Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import Difficulty, { difficulties } from "../types/Difficulty";
import { useTranslation } from "react-i18next";

interface props {
  onClick: (num: number) => void;
  onClear: () => void;
  onSolve: () => void;
  onCreate?: () => void;
  onMark?: () => void;
  creatorMode?: boolean;
}
export default function InputControls({
  onClick,
  onSolve,
  onClear,
  onCreate,
  onMark,
  creatorMode,
}: props) {
  const gridSize = 3;

  const { t } = useTranslation();

  function generateSudokuHTMLGrid() {
    const htmlGrid = [];
    for (let row = 0; row < gridSize; row++) {
      const rowCells = [];
      for (let col = 0; col < gridSize; col++) {
        const num = gridSize ** 2 - (row * gridSize + col);
        rowCells.push(
          <TouchableOpacity
            key={`cell-${row}-${col}`}
            onPress={() => onClick(num)}
            style={styles.gridCell}
          >
            <Text>{num}</Text>
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

  const controls = generateSudokuHTMLGrid();

  return (
    <>
      <View style={styles.gridContainer}>{controls}</View>
          <Button text={t('solve')} onPress={() => {
            if (onSolve) onSolve();
          }} />
          <Button text={t('clear')} onPress={() => {
            if (onClear) onClear();
          }} />
          <Button text={t('mark')} onPress={() => {
            if (onMark) onMark();
          }} />
      {creatorMode && (
        <>
          <Button text={t('create')} onPress={() => {
            if (onCreate) onCreate();
          }} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 100,
    width: 100,
  },
  gridRow: {
    flexDirection: "row",
  },
  gridCell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
  },
});
