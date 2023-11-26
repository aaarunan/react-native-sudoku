import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";
import Colors from "../constants/Colors";

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
      <Text style={styles.color}>{props.text}</Text>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.primary,
    padding: 10,
  },
  emphasized: {
    backgroundColor: Colors.dark.active,
  },
  block: {
    width: "100%",
  },
  pressed: {
    backgroundColor: Colors.dark.active,
  },
  color: {
    color: Colors.dark.text,
  }
});
