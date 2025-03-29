import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Geolocation from '@react-native-community/geolocation';

// Async Thunk
export const fetchGpsData = createAsyncThunk('gps/fetchGpsData', async () => {
    return new Promise<any>((resolve, reject) => Geolocation.getCurrentPosition(
        (position) => {
            resolve(position.coords);
        },
        (error) => {
            resolve(null); // Return null on error
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 10000,
        }
    ));
});

// Define the shape of the GPS coordinates state
interface GpsState {
    coords: any;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: GpsState = {
    coords: null,
    isLoading: false,
    error: null,
};

const reducers = {

}

const extraReducers = (builder: any) => {
    builder
        .addCase(fetchGpsData.pending, (state: GpsState) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchGpsData.fulfilled, (state: GpsState, action: PayloadAction<GpsState['coords']>) => {
            state.coords = action?.payload || state.coords;
            state.isLoading = false;
        })
        .addCase(fetchGpsData.rejected, (state: GpsState, action: any) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch GPS data';
        });
};

export const { actions: gpsActions, reducer: gpsReducer } = createSlice({
    name: 'gps',
    initialState,
    reducers,
    extraReducers,
});
