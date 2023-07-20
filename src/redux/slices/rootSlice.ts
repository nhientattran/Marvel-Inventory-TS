import { createSlice } from "@reduxjs/toolkit";

export interface CharacterState {
    name: string,
    description: string,
    movies_appeared: string,
    super_power: string,
    date_created: string
}

const initialState: CharacterState = {
    name: 'Character',
    description: '',
    movies_appeared: '',
    super_power: '',
    date_created: ''
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseMovie: (state, action) => { state.movies_appeared = action.payload },
        choosePower: (state, action) => { state.super_power = action.payload },
        chooseDate: (state, action) => { state.date_created = action.payload }
    }
})

export const reducer = rootSlice.reducer
export const {
    chooseName,
    chooseDescription,
    chooseMovie,
    choosePower,
    chooseDate
} = rootSlice.actions;