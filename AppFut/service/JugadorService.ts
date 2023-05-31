import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "./httpClient";


const prefix = '/jugador'

export const getJugadores = createAsyncThunk(
    'jugador/getJugadores',
    async (id: number) => {
        return (await httpClient.get(`${prefix}/equipo/${id}`)).data;
    }
)

export const createJugador = createAsyncThunk(
    'jugador/createJugador',
    async (data: any) => {
        return (await httpClient.post(`${prefix}`, data)).data;
    }
)