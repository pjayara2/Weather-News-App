// Third-party Import
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import MyHttpClient from 'axios';

// Utils Import
import { Constants } from '../common';

const DEBUG = false;
const ENABLE_CRYPTO = false; // Set to false to disable both encryption and decryption

// Base URLs for different categories
const BASE_URLS = {
    weather: Constants.WeatherBaseURL,  // Weather base URL
    news: Constants.NewsBaseURL,  // Weather base URL
};

const FetchApis = MyHttpClient.create({
    baseURL: BASE_URLS.weather,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let userInfo: any | null = null;
let accessToken: string | null = null;
let systemInfo: any = null;
let sessionInitialized: Promise<void>;

const initializeSession = async () => {
    const session = { userId: 1, name: 'Pradeepan', accessToken: null }; // get value from store

    if (session?.accessToken) {
        userInfo = session;
        accessToken = session.accessToken;
    }
};

const fetchSystemInfo = async () => {
    try {
        systemInfo = {
            // device Information if we need
        };
    } catch (error) {
        console.error('Failed to fetch system information:', error);
    }
};

const initialize = async () => {
    sessionInitialized = new Promise<void>(async (resolve, reject) => {
        try {
            await initializeSession();
            await fetchSystemInfo();
            resolve();
        } catch (error) {
            console.error('Initialization failed', error);
            reject(error);
        }
    });
};

// Function to determine the baseURL based on the request URL category
const getBaseURLForCategory = (url: string) => {
    if (Object.values(Constants.concatUrl.weather).includes(url)) {
        return BASE_URLS.weather;  // Weather base URL
    } else if (Object.values(Constants.concatUrl.news).includes(url)) {
        return BASE_URLS.news;  // Workflow base URL
    }

    return BASE_URLS.weather;  // Default base URL if no match
};

// Add a request interceptor to dynamically set baseURL
FetchApis.interceptors.request.use(async (config: AxiosRequestConfig | any) => {
    try {
        await sessionInitialized;

        const originalData = config.data;

        // Determine the correct baseURL based on the endpoint
        const endpoint = config.url || '';
        config.baseURL = getBaseURLForCategory(endpoint);  // Set the baseURL dynamically

        // Add Authorization token if available
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Add system information if available
        if (systemInfo) {
            config.headers['SystemInfo'] = JSON.stringify(systemInfo);
        }

        // Encrypt request data if `ENABLE_CRYPTO` is true
        if (originalData && ENABLE_CRYPTO) {
            // config.data = encryptData(originalData); // Encrypt the data
        }

        return config;
    } catch (error) {
        return Promise.reject(error);
    }
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
FetchApis.interceptors.response.use(async (response: AxiosResponse) => {
    if (DEBUG) console.log("✉️ ", response.data);

    const encryptedData = response.data;

    // Decrypt the response data if `ENABLE_CRYPTO` is true
    if (encryptedData && ENABLE_CRYPTO) {
        // response.data = decryptData(encryptedData);
    }

    if (response.data?.status === 401) {
        // handle logout
    }

    return response.data;
}, async (error: AxiosError) => {
    if (error.response?.status === 401) {
        // handle logout
    }

    return Promise.reject(error);
});

export { initialize, accessToken, userInfo };
export default FetchApis;

// Example usage: Call this function once at the start of your application
initialize();