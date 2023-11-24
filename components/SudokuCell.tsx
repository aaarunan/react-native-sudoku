import { TouchableOpacity } from "react-native";
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

    return selectedStyles;
  }
  return (
    <TouchableOpacity
      style={getCellClass()}
      onPress={() => props.onCellClick(props.row, props.col)}
    >
      <Text>{props.cell.value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
  },
  selected: {
    backgroundColor: "red",
  },
  marked: {
    backgroundColor: "green",
  },
});
