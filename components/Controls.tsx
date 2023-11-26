import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";

interface props {
  onClick: (num: number) => void;
}

export default function InputControls(props: props) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <View style={styles.container}>
        {nums.map((num) => {
          return (
            <Pressable
              key={num}
              onPress={() => props.onClick(num)}
              style={styles.cell}
            >
              <Text>{num}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "gray",
  },
});
