import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '@react-navigation/native';

type RootStackParamList = {
  Tabs: undefined;
  LogBrew: undefined;
};

const recentBrews = [
  {
    id: '1',
    name: 'Lavender Latte',
    cafe: 'Brew & Bloom',
    date: 'April 17',
    image: require('../assets/lavenderlatte.jpg'),
  },
  {
    id: '2',
    name: 'Iced Chai',
    cafe: 'Bean Scene',
    date: 'April 15',
    image: require('../assets/icedchai.jpg'),
  },
  {
    id: '3',
    name: 'Matcha Green Tea',
    cafe: 'Tea Time',
    date: 'April 14',
    image: require('../assets/matchagreen.jpg'),
  },
];

function HomeContent() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { displayName } = useSettings();
  const { colors, dark } = useTheme();

  const gradientColors: [string, string, ...string[]] = dark
    ? ['#000000', '#5A5A5A', '#000000']
    : ['#FEFAE0', '#D4A373', '#6f4e37'];

  const logoSource = dark
    ? require('../assets/driftbrewLogoWhite.png') // White logo for dark mode
    : require('../assets/driftbrewLogo.png'); // Default logo for light mode

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={gradientColors}
        style={styles.header}
      >
        <Text style={[styles.greeting, { color: colors.text }]}>Welcome back, {displayName} ☕</Text>
        <Image source={logoSource} style={styles.logo} />
        <Text style={[styles.subheading, {color: colors.text }]}>Favorite Brews</Text>

        <View style={styles.flatList}>
          <FlatList
            data={recentBrews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.brewCard, { backgroundColor: colors.card }]}>
                <Image source={item.image} style={styles.brewImage} />
                <View>
                  <Text style={[styles.brewName, { color: colors.text }]}>{item.name}</Text>
                  <Text style={[styles.brewCafe, { color: colors.text }]}>{item.cafe}</Text>
                  <Text style={styles.brewDate}>{item.date}</Text>
                </View>
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.logButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('LogBrew')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={[styles.logButtonText, { color: colors.text }]}>Log a New Brew</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  try {
    return <HomeContent />;
  } catch (error) {
    console.warn('⚠️ SettingsProvider not available yet');
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Welcome back, friend ☕</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f4e37',
  },
  header: {
    padding: 25,
    paddingTop: 50,
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Overthink',
    fontSize: 35,
    color: '#000000',
    paddingTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontFamily: 'PTSerif',
    fontSize: 27,
    color: '#000000',
    paddingBottom: 20,
    alignSelf: 'center',
  },
  flatList: {
    maxHeight: 260,
  },
  brewCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f3ef',
    borderRadius: 16,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  brewImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  brewName: {
    fontFamily: 'PTSerif',
    fontSize: 16,
    color: '#4a3a2e',
  },
  brewCafe: {
    fontFamily: 'PTSerif',
    fontSize: 14,
    color: '#7a6e66',
  },
  brewDate: {
    fontSize: 12,
    color: '#a99a8e',
  },
  logButton: {
    marginTop: 20,
    backgroundColor: '#D4A373',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'PTSerif',
  },
});
