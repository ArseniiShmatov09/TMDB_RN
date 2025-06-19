import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootTabParamList, HomeStackParamList, FavoritesStackParamList } from './navigation_types';

import MovieListScreen from '../modules/movie_list/screens/movie_list_screen';
import MovieDetailScreen from '../modules/movie_details/screens/movie_details_screen';
import FavoriteMoviesScreen from '../modules/favorites/screens/favorite_movies_screen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const FavoritesStack = createStackNavigator<FavoritesStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="MovieList" component={MovieListScreen} options={{ title: 'Популярные фильмы' }} />
    <HomeStack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: '', headerBackTitle: '', headerTransparent: true }} />
  </HomeStack.Navigator>
);

const FavoritesStackNavigator = () => (
  <FavoritesStack.Navigator>
    <FavoritesStack.Screen name="FavoriteMovieList" component={FavoriteMoviesScreen} options={{ title: 'Избранное' }} />
    <FavoritesStack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: '', headerBackTitle: '', headerTransparent: true }} />
  </FavoritesStack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, 

        
         tabBarStyle: {
      backgroundColor: '#BABABA', 
    },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: 'Главная' }} />
      <Tab.Screen name="Favorites" component={FavoritesStackNavigator} options={{ title: 'Избранное' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;