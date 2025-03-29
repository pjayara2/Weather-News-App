// Types Import
import { SnackbarContextType } from "@src/contexts/SnackbarProvider";


interface ErrorResponse {
    response?: {
        data?: {
            errorMessage?: string;
            error?: string;
        };
    };
    message?: string;
}

export interface DataResponse {
    totalItems: number;
    data: any[];
    totalPages: number;
    currentPage: number;
    perPage: number;
}

export const handleApiError = (error: ErrorResponse, snackbar: SnackbarContextType) => {
    const { data } = error?.response || {};

    if (Array.isArray(data?.errorMessage)) {
        snackbar.error(data?.errorMessage[0].message);

        return;
    }

    const message = data?.errorMessage || data?.error || error?.message || 'An unexpected error occurred.';
    snackbar.error(message);
};

// Utility function to safely parse JSON
export const safeParseJson = (jsonString: string) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);

        return {}; // Return empty object if parsing fails
    }
};