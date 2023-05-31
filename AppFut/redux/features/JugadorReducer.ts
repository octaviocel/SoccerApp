import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import Jugador from "../../models/Jugador";
import { createJugador, getJugadores } from "../../service/JugadorService";

interface JugadorState {
    jugadores: Jugador[]
    jugadoresEquipo: Jugador[]
    fetched: boolean
    error: boolean
}

const initiaState : JugadorState = {
    jugadores:[],
    jugadoresEquipo:[],
    fetched: false,
    error:false
}

export const jugadorSlice = createSlice({
    name: 'jugador',
    initialState: initiaState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<JugadorState>) => {
        builder
            .addCase(getJugadores.pending, (state) => {
                state.fetched = false;
            })
            .addCase(getJugadores.fulfilled, (state, action) => {
                state.fetched = true;
                state.jugadoresEquipo = action.payload;
            })
            .addCase(getJugadores.rejected, (state) => {
                state.error = true;
                state.fetched = true;
            })

        builder
            .addCase(createJugador.pending, (state) => {
                state.fetched = false;
            })
            .addCase(createJugador.fulfilled, (state, action) => {
                state.fetched = true;
                state.jugadores.push(action.payload);
            })
            .addCase(createJugador.rejected, (state) => {
                state.error = true;
                state.fetched = true;
            })
    }
})

export default jugadorSlice.reducer;