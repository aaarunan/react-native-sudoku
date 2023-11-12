import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
  selectedCell: {
    backgroundColor: "red",
  },
  markedCell: {
    backgroundColor: "green",
  }
});

export default styles;