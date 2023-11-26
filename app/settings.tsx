import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalScreen() {
  const { t, i18n } = useTranslation();

  function setLanguage(language: string) {
    AsyncStorage.setItem("language", language);

    i18n.changeLanguage(language);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("tabSettings")}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.buttons}>
        <Button
          text={t("norwegian")}
          onPress={() => {
            setLanguage("no");
          }}
          block
        />
        <Button
          text={t("english")}
          onPress={() => {
            setLanguage("en");
          }}
          block
        />
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttons: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  }

});
