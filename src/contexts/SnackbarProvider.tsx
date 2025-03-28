import React, { createContext, ReactNode } from 'react';
import Snackbar from 'react-native-snackbar';
import { Fonts } from '@src/common';

export type SnackbarContextType = {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {

    const showSnackbar = (message: string, backgroundColor: string) => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: Fonts.Poppins.Medium,
            backgroundColor,
        });
    };

    const success = (message: string) => showSnackbar(message, 'green');
    const error = (message: string) => showSnackbar(message, 'red');
    const info = (message: string) => showSnackbar(message, 'blue');
    const warning = (message: string) => showSnackbar(message, 'orange');

    return (
        <SnackbarContext.Provider value={{ success, error, info, warning }}>
            {children}
        </SnackbarContext.Provider>
    );
};