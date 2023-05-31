import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userReducer';
import ligaReducer from './features/ligaReducer';
import PartidosReducer from './features/PartidosReducer';
import EquipoReducer from './features/EquipoReducer';
import JugadorReducer from './features/JugadorReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ligas: ligaReducer,
        partidos : PartidosReducer,
        equipos: EquipoReducer,
        jugadores: JugadorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
