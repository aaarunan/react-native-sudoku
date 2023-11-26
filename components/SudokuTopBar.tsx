import { difficulties } from "../types/Difficulty";
import Button from "./Button";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import { useTranslation } from "react-i18next";

interface props {
  difficulty: string;
  onPickDifficulty: (difficulty: string) => void;
}

export default function SudokuTopBar(props: props) {

  const { t } = useTranslation();

  return (
    <View style={styles.SudokuTopBar}>
      {Object.values(difficulties).map((difficulty) => {
        return (
          <View style={styles.topBarElement} key={difficulty}>
            <Button
              text={t(difficulty)}
              onPress={() => props.onPickDifficulty(difficulty)}
              block
              emphasized={difficulty == props.difficulty}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  SudokuTopBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "1.5rem",
    width: "100%",
  },
  topBarElement: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
  },
});