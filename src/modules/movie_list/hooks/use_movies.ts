// hook
import { useState, useEffect, useCallback, useRef } from 'react';
import { Movie } from '../../../shared/types/movie';
import { getPopularMovies } from '../services/api/get_movie_list';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const isFetching = useRef(false);

  const fetchMovies = useCallback(async (pageToFetch: number) => {
    if (isFetching.current) return;
    isFetching.current = true;

    pageToFetch === 1 ? setIsLoading(true) : setIsLoadingMore(true);
    setError(null);

    try {
      const data = await getPopularMovies(pageToFetch);

      setMovies(prev => {
        const ids = new Set(prev.map(m => m.id));
        const fresh = data.results.filter(m => !ids.has(m.id));
        return pageToFetch === 1 ? fresh : [...prev, ...fresh];
      });

      pageRef.current = pageToFetch;
      if (data.page >= data.total_pages) setHasMore(false);
    } catch {
      setError('Не удалось загрузить фильмы');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const loadMore = () => {
    if (!hasMore) return;
    fetchMovies(pageRef.current + 1);
  };

  const refresh = () => {
    setHasMore(true);
    pageRef.current = 1;
    fetchMovies(1);
  };

  return { movies, isLoading, isLoadingMore, error, hasMore, loadMore, refresh };
};
