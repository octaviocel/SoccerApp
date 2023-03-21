import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "./httpClient";

const prefix = 'usuario';

type PropsLogin = {
    email: string,
    password: string,
}

export const login = createAsyncThunk(
    `${prefix}/login`,
    async ({ email, password }: PropsLogin) => {
        return (await httpClient.post(`${prefix}/login`, { email, password })).data;
    }
)