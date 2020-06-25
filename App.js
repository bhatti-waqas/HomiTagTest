import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesList from './src/modules/MoviesList'
import GenreList from './src/modules/GenreList'
import MovieDetails from './src/modules/MovieDetails'
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen
          name="Genre List"
          component={GenreList}
          options={{title: 'Genres'}}
        />
        <Stack.Screen
          name="MoviesList"
          component={MoviesList}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={({ route }) => ({ title: route.params.name })}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
