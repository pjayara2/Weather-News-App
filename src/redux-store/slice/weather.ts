// Toolkit Import
import { createSlice } from '@reduxjs/toolkit';

export interface WeatherState {

}

const initialState: WeatherState = {

}

const reducers = {

}

export const { actions: weatherActions, reducer: weatherReducer } = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: reducers
});