import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from './httpClient';

const prefix = '/liga'

export const createLiga = createAsyncThunk(
    'liga/create',
    async (data: any) => {
        //console.log("llego", data)
        return (await httpClient.post(`${prefix}`, data)).data;
    }
)

export const getAllLigas = createAsyncThunk(
    'liga/getAll',
    async () => {
        return (await httpClient.get(`${prefix}`)).data;
    }
)

export const getAllLigasLimit = createAsyncThunk(
    'liga/getAllLimit',
    async () => {
        return (await httpClient.get(`${prefix}/limit`)).data;
    }
)

export const getOneLiga = createAsyncThunk(
    'liga/getOne',
    async (id: number) => {
        return (await httpClient.get(`${prefix}/${id}`)).data;
    }
)


export default class LigaService {
    static async createLiga2(data: any) {
        return (await httpClient.post(`${prefix}`, data)).data;
    }
}
