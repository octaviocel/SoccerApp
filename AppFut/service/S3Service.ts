import httpClient from "./httpClient";

const prefix ='s3';

export default class S3Service{

    static async create(file:any) {
        let data = new FormData();
        data.append("foto", file);
    
        return (await httpClient.post(prefix, data)).data;
      }
    
      static async get(key:any) {
        return (await httpClient.get(prefix + "/" + key)).data;
      }
    
      static async delete(key:any) {
        return (await httpClient.delete(prefix + "/" + key)).data;
      }
}