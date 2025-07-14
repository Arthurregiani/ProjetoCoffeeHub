import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InsumosScreen from '../screens/insumos/InsumosScreen';

const Stack = createStackNavigator();

const InsumosNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f8f9fa' },
      }}
    >
      <Stack.Screen 
        name="InsumosMain" 
        component={InsumosScreen}
        options={{
          title: 'Insumos',
        }}
      />
    </Stack.Navigator>
  );
};

export default InsumosNavigator;
