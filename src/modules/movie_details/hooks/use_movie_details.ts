// /src/features/movie-discovery/hooks/useMovieDetail.ts

import { useState, useEffect, useCallback } from 'react';
import { MovieDetail } from '../../../shared/types/movie_detail';
import { getMovieDetail, getMovieAccountState } from '../../movie_details/services/api/get_movie_details';
import { toggleFavoriteStatus } from '../../favorites/services/api/favorites_api';

export const useMovieDetail = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [details, accountState] = await Promise.all([
        getMovieDetail(movieId),
        getMovieAccountState(movieId),
      ]);
      setMovie(details);
      setIsFavorite(accountState.favorite);
    } catch (e) {
      setError('Не удалось загрузить информацию о фильме');
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const toggleFavorite = async () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    try {
      await toggleFavoriteStatus({
        media_type: 'movie',
        media_id: movieId,
        favorite: newFavoriteState,
      });
    } catch (e) {
      setIsFavorite(!newFavoriteState); 
    }
  };

  return { movie, isLoading, error, isFavorite, toggleFavorite, refresh: fetchMovieData };
};