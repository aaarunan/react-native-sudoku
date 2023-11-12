import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen() {

  const { t , i18n } = useTranslation()

  function setLanguage(language: string) {

    AsyncStorage.setItem('language', language);

    i18n.changeLanguage(language);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('tabSettings')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Pressable onPress={() => setLanguage('no')}>
        <Text>{t('norwegian')}</Text>
      </Pressable>
      <Pressable onPress={() => setLanguage('en')}>
        <Text>{t('english')}</Text>
      </Pressable>


      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
