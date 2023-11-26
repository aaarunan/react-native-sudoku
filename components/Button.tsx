import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";

interface ButtonProps {
  text: string;
  emphasized?: boolean;
  block?: boolean;
  onPress: () => void;
}

export default function Button(props: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  function getStyle() {
    if (props.emphasized) {
      return [styles.button, styles.emphasized, isPressed && styles.pressed];
    }
    if (props.block) {
      return [styles.button, styles.block, isPressed && styles.pressed];
    }
    return [styles.button, isPressed && styles.pressed];
  }

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={getStyle()}
    >
      <Text>{props.text}</Text>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AAAAAA",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  emphasized: {
    backgroundColor: "green",
  },
  block: {
    width: "100%",
  },
  pressed: {
    backgroundColor: "#CCCCCC", // Change this to the color you want when pressed
  },
});
