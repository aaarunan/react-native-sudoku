import Button from "./Button";
import {useTranslation} from "react-i18next";
import {View} from "./Themed";
import {StyleSheet} from "react-native";

interface props {
    onClear: () => void;
    onMark?: () => void;
    creatorMode?: boolean;
    onCreate?: () => void;
}

export default function SudokuBottomBar(props: props) {
    const {t} = useTranslation();

    return (
        <>
            <View style={styles.container}>
                <Button text={t("clear")} onPress={props.onClear}/>
                {props.creatorMode ? (
                    <>
                        <Button
                            text={t("create")}
                            onPress={() => {
                                if (props.onCreate) props.onCreate();
                            }}
                        />
                    </>
                ) : (
                    <Button text={t("mark")} onPress={() => {
                        if (props.onMark) props.onMark();
                    }}/>
                )
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        width: "100%",
    }

});