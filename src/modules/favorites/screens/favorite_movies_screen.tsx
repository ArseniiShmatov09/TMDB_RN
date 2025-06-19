import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FavoritesStackParamList } from '../../../navigation/navigation_types';
import MovieCard from '../../movie_list/components/movie_card';
import { Spinner } from '../../../components/spinner';
import { useFavoritesList } from '../hooks/use_favorites_list';

type NavigationProp = StackNavigationProp<
  FavoritesStackParamList,
  'FavoriteMovieList'
>;

const FavoriteMoviesScreen = () => {
  const { movies, isLoading, isLoadingMore, error, loadMore, refresh } =
    useFavoritesList();
  const navigation = useNavigation<NavigationProp>();

  if (isLoading && movies.length === 0) return <Spinner />;

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Попробовать снова" onPress={refresh} />
      </View>
    );
  }

  if (isLoading && movies.length === 0) return <Spinner />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        onRefresh={refresh}
        refreshing={isLoading}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { alignItems: 'center', paddingBottom: 20 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 20 },
});

export default FavoriteMoviesScreen;