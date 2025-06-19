import apiClient from '../../../../shared/api';
import { MovieDetail } from '../../../../shared/types/movie_detail';

export const getMovieDetail = async (movieId: number) => {
  const response = await apiClient.get<MovieDetail>(`/movie/${movieId}`);
  return response.data;
};

export interface AccountState {
  id: number;
  favorite: boolean;
  rated: boolean | { value: number };
  watchlist: boolean;
}

export const getMovieAccountState = async (movieId: number) => {
  const response = await apiClient.get<AccountState>(`/movie/${movieId}/account_states`);
  return response.data;
};