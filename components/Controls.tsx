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
      }
      htmlGrid.push(
        <View key={`row-${row}`} style={styles.gridRow}>
          {rowCells}
        </View>
      );
    }
    return htmlGrid;
  }

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <View style={styles.container}>
        {nums.map((num) => {
          return (
            <TouchableOpacity
              key={num}
              onPress={() => onClick(num)}
              style={styles.cell}
            >
              <Text>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        text={t("solve")}
        onPress={() => {
          if (onSolve) onSolve();
        }}
      />
      <Button
        text={t("clear")}
        onPress={() => {
          if (onClear) onClear();
        }}
      />
      <Button
        text={t("mark")}
        onPress={() => {
          if (onMark) onMark();
        }}
      />
      {creatorMode && (
        <>
          <Button
            text={t("create")}
            onPress={() => {
              if (onCreate) onCreate();
            }}
          />      
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    border: "1px solid black",
  },
});
