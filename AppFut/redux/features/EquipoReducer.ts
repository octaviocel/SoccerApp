import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import Equipo from "../../models/Equipo";
import { createEquipo, getEquipoLiga, getEquipos } from "../../service/EquipoService";


interface EquipoState {
    equipos: Equipo[]
    equipoLiga: Equipo[]
    fetched: boolean
    error: boolean
}

const initialState: EquipoState = {
    equipos: [],
    equipoLiga: [],
    fetched: false,
    error: false,
}

export const equipoSlice = createSlice({
    name: 'equipo',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<EquipoState>) => {
        builder
            .addCase(getEquipos.pending, (state) => {
                state.fetched = false;
            })
            .addCase(getEquipos.fulfilled, (state, action) => {
                state.fetched = true;
                state.equipos = action.payload;
            })
            .addCase(getEquipos.rejected, (state) => {
                state.error = true;
                state.fetched = true;
            })
        builder
            .addCase(createEquipo.pending, (state) => {
                state.fetched = false;
            })
            .addCase(createEquipo.fulfilled, (state, action) => {
                state.fetched = true;
                state.equipos.push(action.payload);
            })
            .addCase(createEquipo.rejected, (state) => {
                state.error = true;
                state.fetched = true;
            })
        builder
            .addCase(getEquipoLiga.pending, (state) => {
                state.fetched = false;
            })
            .addCase(getEquipoLiga.fulfilled, (state, action) => {
                state.fetched = true;
                state.equipoLiga = action.payload;
            })
            .addCase(getEquipoLiga.rejected, (state) => {
                state.error = true;
                state.fetched = true;
            })


    }
})

export default equipoSlice.reducer;