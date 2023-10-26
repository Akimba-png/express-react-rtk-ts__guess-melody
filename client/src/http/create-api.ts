import axios from 'axios';
import { ApiRoute } from '../constants/const';

export const createApi = () => {
  const api = axios.create({
    baseURL: ApiRoute.BaseUrl,
    timeout: 5000,
  });

  return api;
};
