import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
};

export type FavoritesStackParamList = {
  FavoriteMovieList: undefined;
  MovieDetail: { movieId: number }; 
};

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type MovieListNavigationProp = StackNavigationProp<HomeStackParamList, 'MovieList'>;

export type MovieDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'MovieDetail'>,
  BottomTabNavigationProp<RootTabParamList>
>;

export type MovieDetailScreenRouteProp = RouteProp<HomeStackParamList | FavoritesStackParamList, 'MovieDetail'>;

export type MovieDetailScreenProps = {
  navigation: MovieDetailScreenNavigationProp;
  route: MovieDetailScreenRouteProp;
};