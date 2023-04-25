import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from './httpClient';

const prefix = '/equipopartido'

export const getPartidosPendientes = createAsyncThunk(
    'equipopartido/getPendientes',
    async () => {
        return (await httpClient.get(`${prefix}/pendientes`)).data;
    }
)