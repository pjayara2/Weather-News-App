import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

// Extend the Theme interface to include custom color properties
export interface CustomTheme extends Theme {
    colors: Theme['colors'] & {

    };
}

export const lightTheme: CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#cc0001'
    },
};

export const darkTheme: CustomTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
    },
};
