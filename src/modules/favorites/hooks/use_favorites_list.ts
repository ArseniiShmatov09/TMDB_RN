import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Movie } from '../../../shared/types/movie';
import { getFavoriteMovies } from '../services/api/favorites_api';

export const useFavoritesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const isFetching = useRef(false);

  const fetchFavorites = useCallback(async (pageToFetch: number) => {
    if (isFetching.current) return;
    isFetching.current = true;

    pageToFetch === 1 ? setIsLoading(true) : setIsLoadingMore(true);
    setError(null);

    try {
      const data = await getFavoriteMovies(pageToFetch);

      setMovies(prev => {
        const ids = new Set(prev.map(m => m.id));
        const fresh = data.results.filter(m => !ids.has(m.id));
        return pageToFetch === 1 ? fresh : [...prev, ...fresh];
      });

      pageRef.current = pageToFetch;
      if (data.page >= data.total_pages) setHasMore(false);
    } catch {
      setError('Не удалось загрузить избранные фильмы');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isFetching.current = false;
    }
  }, []);

  const refresh = useCallback(() => {
    setHasMore(true);
    pageRef.current = 1;
    fetchFavorites(1);
  }, [fetchFavorites]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const loadMore = () => {
    if (!hasMore) return;
    fetchFavorites(pageRef.current + 1);
  };

  return { movies, isLoading, isLoadingMore, error, loadMore, refresh };
};