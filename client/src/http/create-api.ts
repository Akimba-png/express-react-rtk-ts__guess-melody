import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { tokenService } from '../services/token-service';
import { ApiRoute } from '../constants/const';

export const createApi = () => {
  const api = axios.create({
    baseURL: ApiRoute.BaseUrl,
    timeout: 5000,
    withCredentials: true,
  });

  const onRequest = (request: InternalAxiosRequestConfig) => {
    const accessToken = tokenService.getToken();
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  };
  const onSuccess = (response: AxiosResponse) => {
    return response;
  }

  const onFail = (error: any) => {
    return Promise.reject(error);

  };

  api.interceptors.request.use(onRequest);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
