import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from './httpClient';

const prefix = 'liga'

export const getAllLigas = createAsyncThunk(
    'liga/getAll',
    async () => {
        return (await httpClient.get(`${prefix}`)).data;
    }
)