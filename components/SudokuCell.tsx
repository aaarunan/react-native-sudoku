import { Pressable } from "react-native";
import { Cell } from "../types/board";
import { Text } from "../components/Themed";
import { StyleSheet } from "react-native";

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
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "red",
  },
  marked: {
    backgroundColor: "green",
  },
  borderTop: {
    borderTopWidth: 4,
    borderColor: "gray",
  },
  borderLeft: {
    borderLeftWidth: 4,
    borderColor: "gray",
  },
});