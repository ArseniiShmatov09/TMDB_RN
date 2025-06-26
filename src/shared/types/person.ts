export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for: KnownFor[];
}