import { ACCOUNT_ID } from '../../../../config/api_config';
import apiClient from '../../../../shared/api';
import { MovieListResponse } from '../../../../shared/types/movie_list_response';

export const getFavoriteMovies = async (page: number) => {
  const response = await apiClient.get<MovieListResponse>(
    `/account/${ACCOUNT_ID}/favorite/movies`,
    { params: { page, sort_by: 'created_at.desc' } }
  );
  return response.data;
};

export const toggleFavoriteStatus = async (payload: ToggleFavoritePayload) => {
  const response = await apiClient.post(`/account/${ACCOUNT_ID}/favorite`, payload);
  return response.data;
};