import { createSlice } from "@reduxjs/toolkit";

export const pasteSlice = createSlice({
    name:"pastes",
    initialState:{
        
    },
    reducers:{
        updateToPastes:(state,action)=>{

        },
        updateToPastes:(state,action)=>{

        },
        resetAllPastes:(state,action)=>{

        },
        removeFromPastes:(state,action)=>{

        }
    }
})

export const {updateToPastes,resetAllPastes,removeFromPastes} = pasteSlice.actions;

export default pasteSlice.reducer;