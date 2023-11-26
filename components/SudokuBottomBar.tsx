import Button from "./Button";
import { useTranslation } from "react-i18next";
import { View } from "./Themed";
import { StyleSheet } from "react-native";

interface props {
  onClear: () => void;
  onMark?: () => void;
  creatorMode?: boolean;
  onCreate?: () => void;
}

export default function SudokuBottomBar(props: props) {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.element}>
          <Button text={t("clear")} onPress={props.onClear} />
        </View>
        {props.creatorMode ? (
          <>
            <View style={styles.element }>
              <Button
                text={t("create")}
                block
                onPress={() => {
                  if (props.onCreate) props.onCreate();
                }}
              />
            </View>
          </>
        ) : (
          <View style={styles.element}>
            <Button
              text={t("mark")}
              block
              onPress={() => {
                if (props.onMark) props.onMark();
              }}
            />
          </View>
        )}
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
    width: "100%",
  },
  element: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
