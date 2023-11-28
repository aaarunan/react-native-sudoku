# react-native-sudoku

Sudoku game for iOS and Android, built with React Native.

## Installation

Ensure you have a Android SDK installed and configured properly (including the ANDROID_HOME environment variable if you are on MacOS or Linux)
This can be found on the [Expo docs](https://docs.expo.dev/workflow/android-studio-emulator/)

PS: If you are on MacOS, you need to set the ANDROID_HOME environment variable in your terminal with:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

```bash
npm install
```

## Running

To launch the app use:

```bash
npm start
```

To open with Expo Go on your device use the QR code provided in the terminal or in the browser window that opens after running `npm start`

To launch the android emulator immediately after starting the app use:

```bash
npm run android
```
