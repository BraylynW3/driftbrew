import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useBrew } from '../context/BrewContext';
import uuid from 'react-native-uuid';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

type RootStackParamList = {
  Tabs: undefined;
  LogBrew: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function LogBrewScreen() {
  const { colors } = useTheme();
  const { addBrew } = useBrew();
  const [cafe, setCafe] = useState('');
  const [drink, setDrink] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);


  const handleSubmit = () => {
    if (!cafe || !drink || !rating) {
      Alert.alert('Missing Info', 'Please fill out café, drink, and rating.');
      return;
    }
  
    addBrew({
      id: uuid.v4().toString(),
      cafe,
      drink,
      notes,
      rating,
      tags,
      image: image ?? undefined,
      date: new Date().toLocaleDateString(),
    });
  
    Alert.alert('Success!', 'Your brew has been logged.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Tabs'),
      },
    ]);    
  };
  
  const navigation = useNavigation<NavigationProp>();
  
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Log a Brew</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Café Name"
        placeholderTextColor={colors.border}
        value={cafe}
        onChangeText={setCafe}
      />
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Drink Ordered"
        placeholderTextColor={colors.border}
        value={drink}
        onChangeText={setDrink}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>Add Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Notes"
        placeholderTextColor={colors.border}
        value={notes}
        onChangeText={setNotes}
      />
      <Text style={[styles.sectionLabel, { color: colors.text }]}>Rating</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Ionicons
              name={rating >= num ? 'star' : 'star-outline'}
              size={32}
              color="#f4c150"
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Tags (comma separated)"
        placeholderTextColor={colors.border}
        value={tags.join(', ')}
        onChangeText={(text) => setTags(text.split(',').map(tag => tag.trim()))}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { color: colors.text }]}>Submit Brew</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    fontFamily: 'Overthink' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 8 
  },
  button: { 
    backgroundColor: '#6f4e37', 
    padding: 16, 
    borderRadius: 10 
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontFamily: 'PTSerif' 
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: 'PTSerif',
    fontSize: 16,
    marginBottom: 10,
    color: '#6f4e37',
  },
  imageButton: {
    marginBottom: 10,
    backgroundColor: '#e8dcd2',
    padding: 12,
    borderRadius: 10,
  },
  imageButtonText: {
    fontFamily: 'PTSerif',
    color: '#6f4e37',
    textAlign: 'center',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  
});
