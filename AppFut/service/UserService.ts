import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "./httpClient";


const prefix = 'auth';
const prefix2 = 'usuario';

type PropsLogin = {
    email: string,
    password: string,
}

type PropsRegister = {
    nombre: string,
    apepat: string,
    apemat: string,
    email: string,
    password: string,
    rol_id: number,
}

export const login = createAsyncThunk(
    `${prefix}/login`,
    async ({ email, password }: PropsLogin) => {
        return (await httpClient.post(`${prefix}/login`, { email, password })).data;
    }
)

export const createUser = createAsyncThunk(
    `${prefix2}`,
    async ({ nombre, apepat,apemat,email,password,rol_id }: PropsRegister) => {
        return (await httpClient.post(`${prefix2}`, { nombre, apepat,apemat,email,password,rol_id })).data;
    }
)