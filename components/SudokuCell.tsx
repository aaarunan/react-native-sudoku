import { Pressable } from "react-native";
import { Cell } from "../types/board";
import { Text } from "../components/Themed";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

interface props {
  cell: Cell;
  row: number;
  col: number;
  isSelected: boolean;
  onCellClick: (row: number, col: number) => void;
}
export default function SudokuCell(props: props) {
  function getCellClass() {
    const selectedStyles: [object] = [styles.cell];

    if (props.isSelected) {
      selectedStyles.push(styles.selected);
    } else if (props.cell.isMarked) {
      selectedStyles.push(styles.marked);
    }
    if (props.row % 3 === 0 && props.row !== 0) {
      selectedStyles.push(styles.borderTop);
    }
    if (props.col % 3 === 0 && props.col !== 0) {
      selectedStyles.push(styles.borderLeft);
    }

    return selectedStyles;
  }
  return (
    <Pressable
      style={getCellClass()}
      onPress={() => props.onCellClick(props.row, props.col)}
    >
      <Text>{
        
      props.cell.value === 0 ? "" : props.cell.value
      }</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    display: "flex",
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: Colors.dark.primary,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 20,
    minWidth: 20,
  },
  selected: {
    backgroundColor: "#313e69",
  },
  marked: {
    backgroundColor: "#366931",
  },
  borderTop: {
    borderTopWidth: 4,
    borderColor: Colors.dark.primary,
  },
  borderLeft: {
    borderLeftWidth: 4,
    borderColor: Colors.dark.primary,
  },
});