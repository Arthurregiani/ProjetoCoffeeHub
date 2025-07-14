import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens relacionadas ao processamento de café
import ProcessamentoCafeScreen from '../screens/processamento/ProcessamentoCafeScreen';
import DetalhesProcessamentoScreen from '../screens/processamento/DetalhesProcessamentoScreen';
import QualidadeScreen from '../screens/processamento/QualidadeScreen';
import ControleSecagemScreen from '../screens/processamento/ControleSecagemScreen';

const Stack = createStackNavigator();

export default function ProcessamentoNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProcessamentoPrincipal" component={ProcessamentoCafeScreen} />
      <Stack.Screen name="DetalhesProcessamento" component={DetalhesProcessamentoScreen} />
      <Stack.Screen name="QualidadeProcessamento" component={QualidadeScreen} />
      <Stack.Screen name="ControleSecagem" component={ControleSecagemScreen} />
    </Stack.Navigator>
  );
}
