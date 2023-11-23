import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {

  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title: t('notFound') }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('doesNotExist')}</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t('goBack')}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
