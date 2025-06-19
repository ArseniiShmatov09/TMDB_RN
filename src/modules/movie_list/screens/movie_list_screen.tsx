import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import MovieCard from '../components/movie_card';
import { Spinner } from '../../../components/spinner';
import { useMovies } from '../hooks/use_movies';
import { useNavigation } from '@react-navigation/native';
import { MovieListNavigationProp } from '../../../navigation/navigation_types';


const MovieListScreen = () => {
  const { movies, isLoading, isLoadingMore, error, loadMore, refresh } =
    useMovies();
  const navigation = useNavigation<MovieListNavigationProp>();
  
  if (isLoading) {
    return <Spinner />;
  }

  if (error && movies.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Попробовать снова" onPress={refresh} color="#007AFF" />
      </View>
    );
  }

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <Spinner />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        onRefresh={refresh}
        refreshing={isLoading}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default MovieListScreen;