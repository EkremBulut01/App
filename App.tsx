import { View, Text } from 'react-native'
import React from 'react'
import Page1 from './Page1'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Page1} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}