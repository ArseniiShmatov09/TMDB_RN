import apiClient from "../../../../shared/api";
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