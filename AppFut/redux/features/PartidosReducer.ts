import { getPartidosPendientes } from './../../service/PartidosService';
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit"
import PartidoPen from "../../models/PartidoPen"


interface PartidoState {
    partidos: PartidoPen[]
    fetched: boolean
    error: boolean
}

const initialState: PartidoState = {
    partidos: [],
    fetched: false,
    error: false,
}

export const partidoSlice = createSlice({
    name: 'partidos',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<PartidoState>) => {
        builder
            .addCase(getPartidosPendientes.pending, (state) => {
                //console.log("pendiente")
                state.fetched = false;
            })
            .addCase(getPartidosPendientes.fulfilled, (state, action) => {
                // console.log("hecho")
                state.fetched = true;
                state.partidos = action.payload;
            })
            .addCase(getPartidosPendientes.rejected, (state) => {
                // console.log("error")
                //console.log()
                state.error = true;
                state.fetched = true;
            });
        
    }
});

export default partidoSlice.reducer;