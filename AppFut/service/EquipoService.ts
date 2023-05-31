import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "./httpClient";


const prefix = '/equipo'

export const getEquipos = createAsyncThunk(
    'equipo/getEquipos',
    async () => {
        return (await httpClient.get(`${prefix}`)).data;
    }
)

export const getEquipoLiga = createAsyncThunk(
    'equipo/getEquipoLiga',
    async (id : number) => {
        return (await httpClient.get(`${prefix}/liga/${id}`)).data;
    }
)

export const createEquipo = createAsyncThunk(
    'equipo/createEquipo',
    async (data : any) => {
        return (await httpClient.post(`${prefix}`, data)).data;
    }
)