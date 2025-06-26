import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { IMAGE_BASE_URL } from '../../../config/api_config';
import { Person } from '../../../shared/types/person';


type ActorCardProps = {
  actor: Person;
  onPress: () => void;
};

const ActorCard = ({ actor, onPress }: ActorCardProps) => {
  const imageUrl = actor.profile_path
    ? `${IMAGE_BASE_URL}${actor.profile_path}`
    : 'https://via.placeholder.com/150x225.png?text=No+Poster';

  const knownForTitles = actor.known_for
    .map(item => item.title || item.name)
    .slice(0, 2)
    .join(', ');

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{actor.name}</Text>
        {knownForTitles.length > 0 && <Text style={styles.knownFor} numberOfLines={2}>{knownForTitles}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  knownFor: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  }
});

export default ActorCard;