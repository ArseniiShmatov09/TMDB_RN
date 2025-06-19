import { Genre } from "./genre";
import { Movie } from "./movie";

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  overview: string | null;
}