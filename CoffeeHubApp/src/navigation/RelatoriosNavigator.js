import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens relacionadas à produção e lotes
import RelatoriosScreen from '../screens/relatorios/RelatoriosScreen';
import VisualizacaoRelatorioScreen from '../screens/relatorios/VisualizacaoRelatorioScreen';
import DetalhesRastreabilidadeScreen from '../screens/relatorios/DetalhesRastreabilidadeScreen';
import ProducaoScreen from '../screens/producao/ProducaoScreen';

// Telas de Lotes
import LotesScreen from '../screens/lot/LotesScreen';
import LoteDetalhesScreen from '../screens/lot/LoteDetalhesScreen';
import RegistroColheitaScreen from '../screens/lot/RegistroColheitaScreen';

// Telas de Monitoramento
import MonitoramentoScreen from '../screens/monitoramento/MonitoramentoScreen';

const Stack = createStackNavigator();

// Agora focado em produção, lotes e rastreabilidade
export default function ProducaoNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProducaoPrincipal" component={ProducaoScreen} />
      <Stack.Screen name="RelatoriosPrincipal" component={RelatoriosScreen} />
      <Stack.Screen name="VisualizacaoRelatorio" component={VisualizacaoRelatorioScreen} />
      <Stack.Screen name="DetalhesRastreabilidade" component={DetalhesRastreabilidadeScreen} />
      
      {/* Telas de Lotes */}
      <Stack.Screen name="Lotes" component={LotesScreen} />
      <Stack.Screen name="LoteDetalhes" component={LoteDetalhesScreen} />
      <Stack.Screen name="RegistroColheita" component={RegistroColheitaScreen} />
    </Stack.Navigator>
  );
}


