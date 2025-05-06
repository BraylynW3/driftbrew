import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Linking, TouchableOpacity, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const mockCafes = [
  {
    id: '1',
    name: 'Knowledge Perk Coffee Company',
    address: '4036 Suite B5, River Oaks Dr, Myrtle Beach, SC 29579',
    coords: { latitude: 33.75487041322411, longitude: -78.86511841112933 },
    url: 'https://knowledgeperk.com/',
    tags: ['quiet', 'wifi', 'seasonal drinks'],
    rating: 4.5,
  review: 'Calm, peaceful atmosphere. Try the oat latte!',
  },
  {
    id: '2',
    name: 'Birchin Lane Coffee Company',
    address: '9620 N Kings Hwy E4, Myrtle Beach, SC 29572',
    coords: { latitude: 33.77661793207398, longitude: -78.79308550670376 },
    url: 'http://birchinlanecoffee.com/',
    tags: ['aesthetic', 'wifi', 'seasonal drinks'],
    rating: 4.5,
  review: 'Calm, peaceful atmosphere. Try the oat latte!'
  },
  {
    id: '3',
    name: '7 Brew Coffee',
    address: '961 Hwy 17 N, North Myrtle Beach, SC 29582',
    coords: { latitude: 33.83734616082688, longitude: -78.66959285965441 },
    url: 'https://7brew.com/location/south-carolina-north-myrtle-beach-000127',
    tags: ['custom drinks', 'drive thru only'],
    rating: 4.5,
  review: 'Calm, peaceful atmosphere. Try the oat latte!'
  },
];

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredCafes = selectedTag
    ? mockCafes.filter((cafe) => cafe.tags.includes(selectedTag))
    : mockCafes;


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location Access Denied', 'Enable location to find nearby cafés.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Discover Cafés</Text>

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          
          {mockCafes.map((cafe) => (
            <Marker
              key={cafe.id}
              coordinate={cafe.coords}
              title={cafe.name}
              description={cafe.address}
            />
          ))}
        </MapView>
      )}
      <View style={[styles.tagBar, { backgroundColor: colors.card }]}>
        {['quiet', 'wifi', 'plant-based', 'aesthetic', 'latte art'].map((tag) => (
          <TouchableOpacity
            key={tag}
            onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
            style={[
              styles.filterTag,
              { backgroundColor: selectedTag === tag ? colors.primary : colors.card },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: selectedTag === tag ? colors.background : colors.text },
              ]}
            >
              #{tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCafes}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.cafeCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.cafeName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.review, { color: colors.text }]}>
              ⭐ {item.rating} — {item.review}
            </Text>
            <Text style={[styles.cafeAddress, { color: colors.text }]}>{item.address}</Text>
            <View style={styles.tagContainer}>
              {item.tags.map((tag) => (
                <Text key={tag} style={styles.tag}>
                  #{tag}
                </Text>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(item.url)}
              style={styles.linkButton}
            >
              <Ionicons name="link-outline" size={18} color={colors.primary} />
              <Text style={[styles.linkText, { color: colors.primary }]}>
                Visit Website
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffdfc', paddingTop: 50,},
  title: {
    fontSize: 30,
    fontFamily: 'Overthink',
    color: '#6f4e37',
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  map: {
    width: width - 40,
    height: 200,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 20,
  },
  cafeCard: {
    backgroundColor: '#f3e5dc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  cafeName: {
    fontSize: 18,
    fontFamily: 'Overthink',
    color: '#4a3a2e',
  },
  cafeAddress: {
    fontSize: 14,
    fontFamily: 'PTSerif',
    color: '#7a6e66',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'PTSerif',
    color: '#6f4e37',
    marginLeft: 6,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 6,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'PTSerif',
    color: '#6f4e37',
    backgroundColor: '#e9dcd4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginTop: 4,
  },
  tagBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginBottom: 10,
    gap: 8,
  },
  
  filterTag: {
    backgroundColor: '#f3e5dc',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  
  filterText: {
    fontFamily: 'PTSerif',
    fontSize: 14,
    color: '#6f4e37',
  },
  
  activeFilter: {
    backgroundColor: '#6f4e37',
  },
  
  activeFilterText: {
    color: '#fffdfc',
  },
  
  review: {
    fontSize: 13,
    fontFamily: 'PTSerif',
    color: '#5f5147',
    marginTop: 8,
  },
  
});
