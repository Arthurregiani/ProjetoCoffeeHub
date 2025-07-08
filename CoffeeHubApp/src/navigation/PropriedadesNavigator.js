import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PropriedadesScreen from '../screens/propriedades/PropriedadesScreen';
import PropertyDetailsScreen from '../screens/propriedades/PropertyDetailsScreen';
import PropertyFormScreen from '../screens/propriedades/PropertyFormScreen';

const Stack = createStackNavigator();

export default function PropriedadesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PropriedadesList" component={PropriedadesScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="PropertyForm" component={PropertyFormScreen} />
    </Stack.Navigator>
  );
}

