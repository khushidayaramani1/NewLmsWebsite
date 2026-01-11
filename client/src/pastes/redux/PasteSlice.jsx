import { createSlice } from "@reduxjs/toolkit";

export const PasteSlice = createSlice({
    name:"pastes",
    initialState,
    reducers:{
        updateToPastes:(state,action)=>{

        },
        createToPastes:(state,action)=>{

        },
        resetAllPastes:(state,action)=>{

        },
        removeFromPastes:(state,action)=>{

        }
    }
})

export const {updateToPastes,resetAllPastes,removeFromPastes} = PasteSlice.actions;

export default PasteSlice.reducer;