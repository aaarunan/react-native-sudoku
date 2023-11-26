import { Platform, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";
import Colors from "../constants/Colors";

interface props {
  onClick: (num: number) => void;
}

export default function InputControls(props: props) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function generateGridControls() {
    const gridControls = [];
    for (let i = 0; i < nums.length; i += 3) {
      const rowControls = [];
      for (let j = 0; j < 3; j++) {
        rowControls.push(
          <Pressable
            key={`cell-${i}-${j}`}
            onPress={() => props.onClick(nums[i + j])}
            style={styles.cell}
          >
            <Text style={styles.text}>{nums[i + j]}</Text>
          </Pressable>
        );
      }
      gridControls.push(
        <View key={`row-${i}`} style={styles.gridRow}>
          {rowControls}
        </View>
      );
    }
    return gridControls;
  }

  function generateRowControls() {
    return nums.map((num) => {
      return (
        <Pressable
          key={num}
          onPress={() => props.onClick(num)}
          style={styles.cell}
        >
          <Text>{num}</Text>
        </Pressable>
      );
    })
  }

  return (
    <>
      <View style={styles.container}>
        {
          Platform.OS === "web" ? generateGridControls() : generateRowControls()
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: Platform.OS === "web" ? "column" : "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.dark.primary,
  },
  gridRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  } ,
  text : {
    fontSize: 30,
  }
});
