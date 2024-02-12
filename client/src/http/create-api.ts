import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { tokenService } from '../services/token-service';
import { toastService } from '../services/toast-service';
import { User } from '../models/user';
import { ApiRoute } from '../constants/const';

export const createApi = (onUnAuth: () => void) => {
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

  const onFail = async (error: unknown) => {
    const e = error as AxiosError<{message: string}>;
    const config = e.config;
    if (config && e.response && e.response.status === 401) {
      try {
        const response = await axios.get<User>(
          `${ApiRoute.BaseUrl}${ApiRoute.Refresh}`,
          {
            timeout: 5000,
            withCredentials: true,
          }
        );
        const authorizationToken = response.data.accessToken;
        tokenService.setToken(authorizationToken);
        await api.request(config);
        return;
      } catch (e) {
        onUnAuth();
        return Promise.reject(e);
      }
    } else if (e.response) {
      toastService.showErrorToast(e.response.data.message);
      return Promise.reject(e);
    }
    toastService.showErrorToast(e.message);
    return Promise.reject(e);
  };

  api.interceptors.request.use(onRequest);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
