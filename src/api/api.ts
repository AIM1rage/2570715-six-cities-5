import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {AUTH_TOKEN_HEADER, getToken} from '@/api/token.ts';
import {BACKEND_URL, REQUEST_TIMEOUT} from '@/constants/settings.ts';

type ErrorMessage = {
  errorType: string;
  message: string;
  details: {
    property: string;
    value: string;
    messages: string[];
  }[];
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers[AUTH_TOKEN_HEADER] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ErrorMessage>) => {
      if (error.response) {
        const errorMessage = error.response.data;
        errorMessage.details.forEach((detail) => {
          detail.messages.forEach((message) => console.debug(message)); // eslint-disable-line
        });
      }

      throw error;
    }
  );

  return api;
};
