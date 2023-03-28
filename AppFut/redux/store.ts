import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userReducer';
import ligaReducer from './features/ligaReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ligas: ligaReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
