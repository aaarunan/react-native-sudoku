import { Appearance } from "react-native";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const colors = {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
        selectedCell: '#313e69',
        markedCell: '#366931',
        primary: '#4c4d4c',
        active: '#212121', 
    },
    dark: {
        text: '#fff',
        background: '#000',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
        primary: '#4c4d4c',
        active: '#212121', 
        selectedCell: '#313e69',
        markedCell: '#366931',
    },
}

export default colors;
