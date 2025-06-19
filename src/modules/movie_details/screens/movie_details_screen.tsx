// /src/features/movie-discovery/screens/MovieDetailScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useMovieDetail } from '../hooks/use_movie_details';
import { Spinner } from '../../../components/spinner';
import { IMAGE_BASE_URL } from '../../../config/api_config';
import Icon from 'react-native-vector-icons/Ionicons';
import { MovieDetailScreenProps } from '../../../navigation/navigation_types'; 

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route }) => {
      const { movieId } = route.params;
  const { movie, isLoading, error, refresh, isFavorite, toggleFavorite } = useMovieDetail(movieId);

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Попробовать снова" onPress={refresh} color="#007AFF" />
      </View>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : 'https://via.placeholder.com/400x225.png?text=No+Backdrop';

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/150x225.png?text=No+Poster';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
      <View style={styles.headerContainer}>
        <Image source={{ uri: posterUrl }} style={styles.poster} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          {movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : null}
        </View>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Icon 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={32} 
            color={isFavorite ? 'tomato' : '#fff'} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>⭐ {movie.vote_average.toFixed(1)}</Text>
          <Text style={styles.infoText}>🗓️ {movie.release_date}</Text>
          <Text style={styles.infoText}>⏱️ {movie.runtime} мин.</Text>
        </View>
        <View style={styles.genreContainer}>
          {movie.genres.map(genre => (
            <View key={genre.id} style={styles.genreBadge}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.overviewHeader}>Описание</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backdrop: { width: '100%', height: 225 },
  headerContainer: { flexDirection: 'row', padding: 15, marginTop: -70 },
  poster: { width: 120, height: 180, borderRadius: 8, borderWidth: 2, borderColor: '#fff' },
  titleContainer: { flex: 1, marginLeft: 15, justifyContent: 'flex-end' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  tagline: { fontSize: 14, fontStyle: 'italic', color: '#000', marginTop: 4 },
  detailsContainer: { paddingHorizontal: 15, paddingBottom: 30 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  infoText: { fontSize: 16 },
  genreContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  genreBadge: { backgroundColor: '#e0e0e0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15, marginRight: 5, marginBottom: 5 },
  genreText: { fontSize: 12, color: '#333' },
  overviewHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  overview: { fontSize: 16, lineHeight: 24, color: '#444' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 20, fontSize: 16 },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 25,
  },
});

export default MovieDetailScreen;