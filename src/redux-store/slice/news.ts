// Toolkit Import
import { createSlice } from '@reduxjs/toolkit';

export interface NewsState {

}

const initialState: NewsState = {

}

const reducers = {

}

export const { actions: newsActions, reducer: newsReducer } = createSlice({
    name: 'news',
    initialState: initialState,
    reducers: reducers
});
