import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Movie } from '../../../shared/types/movie';
import MovieCard from '../../movie_list/components/movie_card';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActorsStackParamList } from '../../../navigation/navigation_types';

type MovieCarouselProps = {
  title: string;
  movies: Movie[];
};

type NavigationProp = StackNavigationProp<ActorsStackParamList>;

const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const navigation = useNavigation<NavigationProp>();

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <MovieCard 
              movie={item}
              onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  cardContainer: {
    width: 150,
    marginRight: 12,
  },
  listContent: {
    paddingHorizontal: 16,
  }
});

export default MovieCarousel;