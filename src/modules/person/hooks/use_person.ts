import { useState, useEffect, useCallback, useRef } from 'react';
import { Person } from '../../../shared/types/person';
import { getPopularPeople, searchPeople } from '../services/api/person_api';

export const useActors = (query: string) => {
  const [actors, setActors] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const isFetching = useRef(false);

  const fetchActors = useCallback(async (pageToFetch: number) => {
    if (isFetching.current) return;
    isFetching.current = true;

    pageToFetch === 1 ? setIsLoading(true) : setIsLoadingMore(true);
    setError(null);

    try {
      const data = query
        ? await searchPeople(query, pageToFetch)
        : await getPopularPeople(pageToFetch);

      setActors(prev => {
        const ids = new Set(prev.map(p => p.id));
        const fresh = data.results.filter(p => !ids.has(p.id));
        return pageToFetch === 1 ? fresh : [...prev, ...fresh];
      });

      pageRef.current = pageToFetch;
      if (data.page >= data.total_pages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch {
      setError('Не удалось загрузить список актеров');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      isFetching.current = false;
    }
  }, [query]);

  useEffect(() => {
    setActors([]);
    pageRef.current = 1;
    setHasMore(true);
    fetchActors(1);
  }, [query, fetchActors]);

  const loadMore = () => {
    if (!hasMore || isFetching.current) return;
    fetchActors(pageRef.current + 1);
  };

  const refresh = () => {
    pageRef.current = 1;
    setHasMore(true);
    fetchActors(1);
  };

  return { actors, isLoading, isLoadingMore, error, hasMore, loadMore, refresh };
};