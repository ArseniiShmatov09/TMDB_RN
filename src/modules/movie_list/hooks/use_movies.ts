import { useState, useEffect, useCallback, useRef } from 'react';
import { Movie } from '../../../shared/types/movie';
import { getPopularMovies, searchMovies } from '../services/api/get_movie_list';

export const useMovies = (query: string) => {
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
      const data = query
        ? await searchMovies(query, pageToFetch)
        : await getPopularMovies(pageToFetch);

      setMovies(prev => {
        const ids = new Set(prev.map(m => m.id));
        const fresh = data.results.filter(m => !ids.has(m.id));
        return pageToFetch === 1 ? fresh : [...prev, ...fresh];
      });

      pageRef.current = pageToFetch;
      if (data.page >= data.total_pages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

    } catch {
      setError('Не удалось загрузить фильмы');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isFetching.current = false;
    }
  }, [query]); 

  useEffect(() => {
    setMovies([]);
    pageRef.current = 1;
    setHasMore(true);
    fetchMovies(1);
  }, [query, fetchMovies]);

  const loadMore = () => {
    if (!hasMore || isFetching.current) return;
    fetchMovies(pageRef.current + 1);
  };

  const refresh = () => {
    pageRef.current = 1;
    setHasMore(true);
    fetchMovies(1);
  };

  return { movies, isLoading, isLoadingMore, error, hasMore, loadMore, refresh };
};