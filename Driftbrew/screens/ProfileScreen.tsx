import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import { useBrew } from '../context/BrewContext';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '@react-navigation/native';


export default function ProfileScreen() {
  const { brews, clearBrews } = useBrew();
  const { displayName, setDisplayName, darkMode, toggleDarkMode } = useSettings();
    const { colors } = useTheme();
  

  const handleReset = () => {
    Alert.alert(
      'Clear Journal?',
      'This will permanently delete all brew entries.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: clearBrews,
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

      <Text style={[styles.label, { color: colors.text }]}>Your Display Name</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter your name"
        placeholderTextColor={colors.border} 
      />

      <Text style={[styles.subheader, { color: colors.text }]}>You've logged</Text>
      <Text style={styles.count}>{brews.length}</Text>
      <Text style={[styles.subheader, { color: colors.text }]}>coffee moments ☕</Text>

      <View style={styles.setting}>
        <Text style={[styles.settingLabel, {color: colors.text}]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          thumbColor={darkMode ? '#6f4e37' : '#ccc'}
          trackColor={{ true: '#d7ccc8', false: '#eee' }}
        />
      </View>

      

      <TouchableOpacity
        style={[styles.resetButton, { backgroundColor: colors.card }]}
        onPress={handleReset}
      >
        <Text style={[styles.resetText, { color: colors.text }]}>Reset Journal</Text>
      </TouchableOpacity>
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
  label: {
    fontFamily: 'PTSerif',
    fontSize: 14,
    color: '#4a3a2e',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd0c8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: 'PTSerif',
    marginBottom: 50,
  },
  subheader: {
    fontSize: 16,
    fontFamily: 'PTSerif',
    color: '#4a3a2e',
    textAlign: 'center',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    fontFamily: 'Overthink',
    color: '#f4c150',
    textAlign: 'center',
    marginVertical: 4,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  settingLabel: {
    fontFamily: 'PTSerif',
    fontSize: 16,
    color: '#6f4e37',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#e8dcd2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  resetText: {
    fontSize: 14,
    fontFamily: 'PTSerif',
    color: '#6f4e37',
  },
});
