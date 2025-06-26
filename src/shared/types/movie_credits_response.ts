import { Movie } from "./movie";

export interface MovieCreditsResponse {
  cast: Movie[];
  crew: Movie[];
  id: number;
}