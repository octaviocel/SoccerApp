import { Platform } from "react-native";
import httpClient, { httpFormDataClient } from "./httpClient";

const prefix = '/s3';

interface ImageData {
  name: string;
  type: string;
  uri: string;
}

export default class S3Service {

  static async create(data: any) {
    const { fileName, type, uri } = data;

   // const blob = new Blob([uri], { type });

    const foto = new FormData();
    //foto.append('file', blob, fileName);
    foto.append('file',{
      uri: uri,
      name: fileName,
      fileName: fileName,
      type: type
    }as any)
    console.log(foto);

    return (await httpFormDataClient.post(prefix, foto)).data;
  }

  static async get(key: any) {
    return (await httpClient.get(prefix + "/" + key)).data;
  }

  static async delete(key: any) {
    return (await httpClient.delete(prefix + "/" + key)).data;
  }
}