import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const toke = null;
//await SecureStore.getItemAsync("auth-token");

const httpClient = axios.create({
  baseURL: "http://31.220.17.225",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async function (config: any) {
    const toke = await SecureStore.getItemAsync("auth-token");
    config.headers = {
      "Content-Type": "application/json",
    };
    if (toke) {
      config.headers = {
        "Content-Type": "application/json",
        "auth-token": toke,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // signOut();
      }
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        status: 500,
        message: "Error de conexión con el servidor.",
      });
    }
  }
);

const httpFormDataClient = axios.create({
  baseURL: "http://31.220.17.225", // Server Address
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpFormDataClient.interceptors.request.use(
  async function (config: any) {
    const toke = await SecureStore.getItemAsync("auth-token");
    config.headers = {
      "Content-Type": "multipart/form-data",
    };

    if (toke) {
      config.headers = {
        "Content-Type": "multipart/form-data",
        "auth-token": toke,
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