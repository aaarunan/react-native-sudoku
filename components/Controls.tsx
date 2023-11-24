import {StyleSheet} from "react-native";
import {Text, View} from "./Themed";
import {TouchableOpacity} from "react-native-gesture-handler";

interface props {
    onClick: (num: number) => void;
}

export default function InputControls(props: props) {
    const gridSize = 3;


    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            <View style={styles.container}>
                {nums.map((num) => {
                    return (
                        <TouchableOpacity
                            key={num}
                            onPress={() => props.onClick(num)}
                            style={styles.cell}
                        >
                            <Text>{num}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        border: "1px solid black",
    },
});
