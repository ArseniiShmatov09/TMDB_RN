import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../config/api_config'; 
import { setupApiLogger } from './api_logger';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: API_KEY, 
  },
  params: {
    language: 'ru-RU', 
  },
});

setupApiLogger(apiClient);

export default apiClient;