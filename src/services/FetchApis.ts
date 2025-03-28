// Third-party Import
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import MyHttpClient from 'axios';

// Utils Import
import { Constants } from '@src/common';

const DEBUG = true;

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

let accessToken: string | null = null;

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

        // Determine the correct baseURL based on the endpoint
        const endpoint = config.url || '';
        config.baseURL = getBaseURLForCategory(endpoint);  // Set the baseURL dynamically

        // Add Authorization token if available
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    } catch (error) {
        return Promise.reject(error);
    }
}, async (error) => {
    if (DEBUG) console.log("request", error);
    return Promise.reject(error);
});

// Add a response interceptor
FetchApis.interceptors.response.use(async (response: AxiosResponse) => {
    if (DEBUG) console.log("✉️ ", response);

    if (response?.data?.status === 401) {
        // handle logout
    }

    return response;
}, async (error: AxiosError) => {
    if (DEBUG) console.log("response", error);
    if (error?.response?.status === 401) {
        // handle logout
    }

    return Promise.reject(error);
});

export default FetchApis;