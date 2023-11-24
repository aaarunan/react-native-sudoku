import { Pressable } from "react-native";
import { Text } from "./Themed"
import { StyleSheet } from "react-native";

interface ButtonProps {
    text: string;
    emphasized?: boolean;
    block?: boolean;
    onPress: () => void;
}

export default function Button(props: ButtonProps) {

  function getStyle() {
    if (props.emphasized) {
      return [styles.button, styles.emphasized];
    }
    if (props.block) {
      return [styles.button, styles.block];
    }
    return styles.button;
  }

    return (
          <Pressable
            onPress={props.onPress}
            style = {getStyle()}
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
    backgroundColor: "#DDDDDD",
    padding: "1rem",
    margin: "0.5rem",
  },
  emphasized: {
    backgroundColor: "#AAAAAA",
  },
  block : {
    width: "100%"
  }
});