import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importar as telas de lotes
import LotesScreen from '../screens/lot/LotesScreen';
import LoteDetalhesScreen from '../screens/lot/LoteDetalhesScreen';
import RegistroColheitaScreen from '../screens/lot/RegistroColheitaScreen';

const Stack = createStackNavigator();

export default function LotesNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen 
        name="LotesList" 
        component={LotesScreen} 
        options={{ title: 'Lotes' }}
      />
      <Stack.Screen 
        name="LoteDetalhes" 
        component={LoteDetalhesScreen} 
        options={{ title: 'Detalhes do Lote' }}
      />
      <Stack.Screen 
        name="RegistroColheita" 
        component={RegistroColheitaScreen} 
        options={{ title: 'Registro de Colheita' }}
      />
    </Stack.Navigator>
  );
}
