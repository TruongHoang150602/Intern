// http-utils.ts
import Axios, { AxiosResponse } from "axios";

export const ENDPOINT: string =
  process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export interface RequestData {
  baseURL?: string;
  url: string;
  params?: any;
}

export const sendRequest = (
  method: string,
  data: RequestData
): Promise<any> => {
  console.log(ENDPOINT);

  return new Promise((resolve, reject) => {
    Axios({
      baseURL: data.baseURL ?? ENDPOINT,
      url: data.url,
      method: method,
      data: method === "GET" ? undefined : data.params,
      params: method === "GET" ? data.params : undefined,
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.status);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const POST = (data: RequestData): Promise<any> =>
  sendRequest("POST", data);

export const GET = (data: RequestData): Promise<any> =>
  sendRequest("GET", data);

export const PUT = (data: RequestData): Promise<any> =>
  sendRequest("PUT", data);

export const DELETE = (data: RequestData): Promise<any> =>
  sendRequest("DELETE", data);
