import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBrew } from '../context/BrewContext';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function JournalScreen() {
  const { brews } = useBrew();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>My Brew Journal</Text>
      <FlatList
        data={brews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.card_title, { color: colors.text }]}>{item.drink} @ {item.cafe}</Text>
            <Text style={[styles.date, { color: colors.text }]}>{item.date}</Text>
        
            <View style={styles.rating}>
              {[...Array(item.rating)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="#f4c150" />
              ))}
            </View>
        
            {item.notes ? <Text style={[styles.notes, { color: colors.text }]}>{item.notes}</Text> : null}
        
            <View style={styles.tags}>
              {item.tags.map((tag) => (
                <Text key={tag} style={[styles.tag, { backgroundColor: colors.primary, color: colors.background }]}>
                  #{tag}
                </Text>
              ))}
            </View>
          </View>
        )}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fffdfc', 
    paddingTop: 30,
    margin: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Overthink',
    color: '#6f4e37',
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  card: { 
    backgroundColor: '#f3e5dc', 
    padding: 16, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  cafe: { 
    fontSize: 18, 
    fontFamily: 'Overthink', 
    color: '#6f4e37' 
  },
  drink: { 
    fontSize: 14, 
    fontFamily: 'PTSerif', 
    color: '#4a3a2e' 
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  card_title: {
    fontSize: 18,
    fontFamily: 'Overthink',
    color: '#6f4e37',
  },
  date: {
    fontSize: 12,
    color: '#a99a8e',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  notes: {
    fontFamily: 'PTSerif',
    fontSize: 14,
    color: '#4a3a2e',
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    fontSize: 12,
    color: '#6f4e37',
    backgroundColor: '#e8dcd2',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  
});
