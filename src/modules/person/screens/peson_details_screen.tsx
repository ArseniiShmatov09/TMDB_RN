import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, StatusBar, ImageBackground } from 'react-native';
import MovieCarousel from '../components/movie_carousel';
import { useActorDetails } from '../hooks/use_person_details';
import { IMAGE_BASE_URL } from '../../../config/api_config';
import { ActorDetailScreenProps } from '../../../navigation/navigation_types';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ActorDetailScreen = ({ route }: ActorDetailScreenProps) => {
  const { actorId } = route.params;
  const { details, credits, isLoading, error } = useActorDetails(actorId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle-outline" size={60} color="red" />
        <Text style={styles.errorText}>{error || 'Произошла ошибка'}</Text>
      </View>
    );
  }

  const imageUrl = details.profile_path
    ? `${IMAGE_BASE_URL}${details.profile_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.headerImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <Text style={styles.name}>{details.name}</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.contentArea}>
        <View style={styles.infoBox}>
          {details.birthday && (
            <View style={styles.infoItem}>
              <Icon name="calendar-outline" size={20} color="#888" />
              <Text style={styles.meta}>{details.birthday}</Text>
            </View>
          )}
          {details.place_of_birth && (
            <View style={styles.infoItem}>
              <Icon name="location-outline" size={20} color="#888" />
              <Text style={styles.meta}>{details.place_of_birth}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Биография</Text>
          <Text style={styles.biography}>{details.biography || 'Биография недоступна.'}</Text>
        </View>

        <MovieCarousel title="Известен по фильмам" movies={credits} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 18,
    textAlign: 'center'
  },
  headerImage: {
    width: '100%',
    height: 450,
    justifyContent: 'flex-end',
  },
  gradient: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  contentArea: {
    backgroundColor: '#f0f2f5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    paddingTop: 10,
  },
  infoBox: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  meta: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
    flexShrink: 1,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  biography: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
  },
});

export default ActorDetailScreen;