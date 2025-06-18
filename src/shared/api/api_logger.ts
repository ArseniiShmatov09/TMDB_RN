import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '../../config/api_config';

const isDev = __DEV__;

const logRequest = (config: AxiosRequestConfig) => {
  const { method, url, params, data, headers  } = config;
  console.log(
    `🚀 [API Request] ${method?.toUpperCase()} | ${API_BASE_URL}${url}`,
    { params, data, headers }
  );
};

const logResponse = (response: AxiosResponse) => {
  const { status, config, data } = response;
  const { method, url } = config;
  console.log(
    `✅ [API Response] ${status} | ${method?.toUpperCase()} | ${url}`,
    { data }
  );
};

const logError = (error: AxiosError) => {
  if (error.response) {
    const { status, config, data, } = error.response;
    const { method, url } = config;
    console.error(
      `❌ [API Error] ${status} | ${method?.toUpperCase()} | ${url}`,
      { error: data }
    );
  } else if (error.request) {
    console.error(`❌ [API Error] Network Error | ${error.config?.url}`, { error });
  } else {
    console.error('❌ [API Error] Request Setup Error', { error });
  }
};

export const setupApiLogger = (apiClient: AxiosInstance) => {
  if (!isDev) {
    return; 
  }

  apiClient.interceptors.request.use(
    (config) => {
      logRequest(config);
      return config;
    },
    (error) => {
      logError(error);
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      logResponse(response);
      return response; 
    },
    (error) => {
      logError(error);
      return Promise.reject(error); 
    }
  );
};