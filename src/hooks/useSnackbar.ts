// React Imports
import { useContext } from 'react';

// Context Imports
import type { SnackbarContextType } from '@src/contexts/SnackbarProvider';
import { SnackbarContext } from '@src/contexts/SnackbarProvider';

export const useSnackbar = (): SnackbarContextType => {

    const context = useContext(SnackbarContext);

    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }

    return context;
};
