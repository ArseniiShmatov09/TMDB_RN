import apiClient from "../../../../shared/api";
import { MovieCreditsResponse } from "../../../../shared/types/movie_credits_response";
import { PersonDetails } from "../../../../shared/types/person_details";
import { PersonListResponse } from "../../../../shared/types/person_list_response";

export const getPopularPeople = async (page: number) => {
  const response = await apiClient.get<PersonListResponse>('/person/popular', {
    params: { page },
  });
  return response.data;
};

export const searchPeople = async (query: string, page: number) => {
  const response = await apiClient.get<PersonListResponse>('/search/person', {
    params: { query, page },
  });
  return response.data;
};

export const getPersonDetails = async (id: number) => {
  const response = await apiClient.get<PersonDetails>(`/person/${id}`);
  return response.data;
};

export const getPersonMovieCredits = async (id: number) => {
  const response = await apiClient.get<MovieCreditsResponse>(`/person/${id}/movie_credits`);
  return response.data;
};