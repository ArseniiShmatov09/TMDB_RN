import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button
} from 'react-native';
import { Spinner } from '../../../components/spinner';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActorsStackParamList } from '../../../navigation/navigation_types';
import { useActors } from '../hooks/use_person';
import ActorCard from '../components/person_card';

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

type ActorListNavigationProp = StackNavigationProp<ActorsStackParamList, 'ActorList'>;

const ActorListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { actors, isLoading, isLoadingMore, error, loadMore, refresh } =
    useActors(debouncedSearchQuery);
    
  const navigation = useNavigation<ActorListNavigationProp>();

  const renderEmptyComponent = () => {
    if (isLoading && actors.length === 0) return null;
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Попробовать снова" onPress={refresh} color="#007AFF" />
        </View>
      );
    }
    if (debouncedSearchQuery && actors.length === 0) {
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
          placeholder="Поиск актеров..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8e8e93"
        />
      </View>
      <FlatList
        data={actors}
        renderItem={({ item }) => (
          <ActorCard
            actor={item}
            onPress={() => navigation.navigate('ActorDetail', { actorId: item.id })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        onRefresh={refresh}
        refreshing={isLoading && actors.length > 0}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#e9e9e9',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 8,
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

export default ActorListScreen;