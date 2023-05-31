import { getAllLigas, getAllLigasLimit, createLiga, getAdminLeague } from './../../service/LigasService';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import Liga from "../../models/Liga";

interface LigaState {
    ligas: Liga[]
    ligasPreview: Liga[]
    ligasAdmin: Liga[]
    fetched: boolean
    error: boolean
}

const initialState: LigaState = {
    ligas: [],
    ligasPreview: [],
    ligasAdmin: [],
    fetched: false,
    error: false,
}

export const ligaSlice = createSlice({
    name: 'liga',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<LigaState>) => {
        builder
            .addCase(getAllLigas.pending, (state) => {
                //console.log("pendiente")
                state.fetched = false;
            })
            .addCase(getAllLigas.fulfilled, (state, action) => {
                // console.log("hecho")
                state.fetched = true;
                state.ligas = action.payload;
            })
            .addCase(getAllLigas.rejected, (state) => {
                // console.log("error")
                //console.log()
                state.error = true;
                state.fetched = true;
            });
        builder
            .addCase(getAllLigasLimit.pending, (state) => {
                //console.log("pendiente")
                state.fetched = false;
            })
            .addCase(getAllLigasLimit.fulfilled, (state, action) => {
                // console.log("hecho")
                state.fetched = true;
                state.ligasPreview = action.payload;
            })
            .addCase(getAllLigasLimit.rejected, (state) => {
                // console.log("error")
                //console.log()
                state.error = true;
                state.fetched = true;
            });
        builder
            .addCase(getAdminLeague.pending, (state) => {
                state.fetched = false;
            })
            .addCase(getAdminLeague.fulfilled, (state, action) => {
                state.fetched = true;
                state.ligasAdmin = action.payload;
            })
            .addCase(getAdminLeague.rejected, (state) => {
                state.error = true;
                state.fetched = true;
            });
        builder
            .addCase(createLiga.pending, (state) => {
                state.fetched = false;
                //console.log(state)
            })
            .addCase(createLiga.fulfilled, (state, action) => {
                state.fetched = true;
                state.ligas.push(action.payload);
            })
            .addCase(createLiga.rejected, (state) => {
                state.error = true;
                state.fetched = true;
                //console.log(state)
            });
    }
})

export default ligaSlice.reducer;