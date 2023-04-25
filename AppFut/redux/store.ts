import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userReducer';
import ligaReducer from './features/ligaReducer';
import PartidosReducer from './features/PartidosReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ligas: ligaReducer,
        partidos : PartidosReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
