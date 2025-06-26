import { Person } from "./person";

export interface PersonListResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}