import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput, 
} from 'react-native';
import MovieCard from '../components/movie_card';
import { Spinner } from '../../../components/spinner';
import { useMovies } from '../hooks/use_movies';
import { useNavigation } from '@react-navigation/native';
import { MovieListNavigationProp } from '../../../navigation/navigation_types';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const MovieListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500); 

  const { movies, isLoading, isLoadingMore, error, loadMore, refresh } =
    useMovies(debouncedSearchQuery);
  
  const navigation = useNavigation<MovieListNavigationProp>();
  
  const renderEmptyComponent = () => {
    if (isLoading && movies.length === 0) return null;
    
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Попробовать снова" onPress={refresh} color="#007AFF" />
        </View>
      );
    }

    if (debouncedSearchQuery && movies.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.infoText}>По вашему запросу ничего не найдено.</Text>
        </View>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <Spinner />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск фильмов..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8e8e93"
        />
      </View>
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
        ListEmptyComponent={renderEmptyComponent} 
        onRefresh={refresh}
        refreshing={isLoading && movies.length > 0} 
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
  searchContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
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
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  infoText: {
    color: '#333',
    fontSize: 16,
  }
});

export default MovieListScreen;