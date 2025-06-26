import { useState, useEffect } from 'react';
import { Movie } from '../../../shared/types/movie';
import { getPersonDetails, getPersonMovieCredits } from '../services/api/person_api';
import { PersonDetails } from '../../../shared/types/person_details';

export const useActorDetails = (actorId: number) => {
  const [details, setDetails] = useState<PersonDetails | null>(null);
  const [credits, setCredits] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActorData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [detailsData, creditsData] = await Promise.all([
          getPersonDetails(actorId),
          getPersonMovieCredits(actorId),
        ]);
        setDetails(detailsData);
        setCredits(creditsData.cast);
      } catch (e) {
        setError('Не удалось загрузить информацию об актере.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActorData();
  }, [actorId]);

  return { details, credits, isLoading, error };
};