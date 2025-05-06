import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { View, Text } from 'react-native';
import { BrewProvider } from './context/BrewContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';

import AppNavigator from './navigation';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

function ThemedNavigator() {
  const { darkMode } = useSettings();

  const lightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fffdfc',
      card: '#f3e5dc',
      text: '#6f4e37',
      border: '#ddd0c8',
      primary: '#f4c150',
      notification: '#f4c150',
    },
  };

  const darkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#2A2A2A',
      card: '#3A3A3A',
      text: '#E9E4DC',
      border: '#555',
      primary: '#F4C150',
      notification: '#F4C150',
    },
  };

  return (
    <NavigationContainer theme={darkMode ? darkTheme : lightTheme}>
      <AppNavigator /> 
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Overthink: require('./assets/fonts/Overthink.otf'),
    PTSerif: require('./assets/fonts/PTSerif-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SettingsProvider> 
        <BrewProvider>
          <StatusBar style="auto" />
          <ThemedNavigator /> 
        </BrewProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
