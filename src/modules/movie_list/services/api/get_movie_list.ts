import apiClient from '../../../../shared/api';
import { MovieListResponse } from '../../../../shared/types/movie_list_response';

export const getPopularMovies = async (page: number) => {
  const response = await apiClient.get<MovieListResponse>('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query: string, page: number) => {
  const response = await apiClient.get<MovieListResponse>('/search/movie', {
    params: { query, page },
  });
  return response.data;
};