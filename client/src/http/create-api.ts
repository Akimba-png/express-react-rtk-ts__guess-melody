import axios, { AxiosResponse } from 'axios';
import { ApiRoute } from '../constants/const';

export const createApi = () => {
  const api = axios.create({
    baseURL: ApiRoute.BaseUrl,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse) => {
    return response;
  }
  const onFail = (error: any) => {
    return Promise.reject(error);

  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
