import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

// Extend the Theme interface to include custom color properties
export interface CustomTheme extends Theme {
    colors: Theme['colors'] & {
        yellow: string,
        gray: string,
        white: string
    };
}

export const lightTheme: CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#cc0001',
        text: '#404040',
        yellow: '#fbb910',
        gray: '#737373',
        white: '#FFF'
    },
};

export const darkTheme: CustomTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#cc0001',
        text: '#404040',
        yellow: '#fbb910',
        gray: '#737373',
        white: '#FFF'
    },
};
