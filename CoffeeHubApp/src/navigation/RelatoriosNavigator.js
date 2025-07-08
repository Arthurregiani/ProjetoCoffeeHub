import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RelatoriosScreen from '../screens/relatorios/RelatoriosScreen';
import VisualizacaoRelatorioScreen from '../screens/relatorios/VisualizacaoRelatorioScreen';
import DetalhesRastreabilidadeScreen from '../screens/relatorios/DetalhesRastreabilidadeScreen';

const Stack = createStackNavigator();

export default function RelatoriosNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RelatoriosPrincipal" component={RelatoriosScreen} />
      <Stack.Screen name="VisualizacaoRelatorio" component={VisualizacaoRelatorioScreen} />
      <Stack.Screen name="DetalhesRastreabilidade" component={DetalhesRastreabilidadeScreen} />
    </Stack.Navigator>
  );
}


