import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const PasteSlice = createSlice({
    name: "pastes",
    initialState,
    reducers: {
        updateToPastes: (state, action) => {
            return action.payload;
        },
        createToPastes: (state, action) => {
            state.push(action.payload);
        },
        resetAllPastes: () => {
            return [];
        },
        removeFromPastes: (state, action) => {
            return state.filter((_, idx) => idx !== action.payload);
        },
    },
});

export const { updateToPastes, createToPastes, resetAllPastes, removeFromPastes } = PasteSlice.actions;

export default PasteSlice.reducer;