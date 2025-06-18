import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../../../shared/types/movie';
import { IMAGE_BASE_URL } from '../../../config/api_config';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const imageUrl = movie.poster_path
  ? `${IMAGE_BASE_URL}${movie.poster_path}` :
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNGGjrfSqqv8UjL18xS4YypbK-q7po_8oVQ&s'


  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
      <Text style={styles.rating}>Рейтинг: {movie.vote_average.toFixed(1)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: 150, margin: 10 },
  poster: { width: 150, height: 225, borderRadius: 8 },
  title: { fontWeight: 'bold', marginTop: 5 },
  rating: { color: 'gray' },
});

export default MovieCard;