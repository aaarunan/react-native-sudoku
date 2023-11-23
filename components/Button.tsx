import { Pressable } from "react-native";
import { Text } from "./Themed"

interface ButtonProps {
    text: string;
    onPress: () => void;
}

export default function Button(props: ButtonProps) {

    return (
          <Pressable
            onPress={props.onPress}
          >
            <Text>{props.text}</Text>
          </Pressable>
    );
}