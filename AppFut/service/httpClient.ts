import React from "react";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "@env"

const toke = null;
//await SecureStore.getItemAsync("auth-token");

console.log(BASE_URL)
const httpClient: AxiosInstance = axios.create({
  //baseURL: BASE_URL,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});




// httpClient.interceptors.request.use(
//   function (config: AxiosRequestConfig) {
//     //console.log(BASE_URL)
//     const toke = await SecureStore.getItemAsync("auth-token");
//     config.headers = {
//       "Content-Type": "application/json",
//     };
//     if (toke) {
//       config.headers = {
//         "Content-Type": "application/json",
//         "auth-token": toke,
//       };
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// httpClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     //console.log(error)
//     if (error.response) {
//       const status = error.response.status;
//       if (status === 401) {
//         // signOut();
//       }
//       return Promise.reject(error.response.data);
//     } else {
//       return Promise.reject({
//         status: 500,
//         message: "Error de conexión con el servidor.",
//       });
//     }
//   }
// );

const httpFormDataClient = axios.create({
  baseURL: BASE_URL, // Server Address
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpFormDataClient.interceptors.request.use(
  async function (config: any) {
    const toke = await SecureStore.getItemAsync("auth-token");
    config.headers = {
      'Content-Type': 'multipart/form-data',
    };
  
    if (toke) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${toke}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { httpFormDataClient };

export default httpClient;