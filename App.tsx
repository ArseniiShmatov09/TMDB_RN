import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import MovieListScreen from './src/modules/movie_list/screens/movie_list_screen';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
     <MovieListScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
