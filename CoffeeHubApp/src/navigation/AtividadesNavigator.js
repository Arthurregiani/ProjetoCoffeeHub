import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importar telas de atividades
import AtividadesScreen from '../screens/atividades/AtividadesScreen';
import CreateActivityScreen from '../screens/atividades/CreateActivityScreen';
import ActivityListScreen from '../screens/atividades/ActivityListScreen';
import AplicacaoScreen from '../screens/atividades/AplicacaoScreen';
import ColheitaScreen from '../screens/atividades/ColheitaScreen';
import IrrigacaoScreen from '../screens/atividades/IrrigacaoScreen';
import MonitoramentoScreen from '../screens/atividades/MonitoramentoScreen';

const Stack = createStackNavigator();

export default function AtividadesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AtividadesPrincipal" component={AtividadesScreen} />
      <Stack.Screen name="CreateActivity" component={CreateActivityScreen} />
      <Stack.Screen name="ActivityList" component={ActivityListScreen} />
      <Stack.Screen name="AplicacaoActivity" component={AplicacaoScreen} />
      <Stack.Screen name="ColheitaActivity" component={ColheitaScreen} />
      <Stack.Screen name="IrrigacaoActivity" component={IrrigacaoScreen} />
      <Stack.Screen name="MonitoramentoActivity" component={MonitoramentoScreen} />
    </Stack.Navigator>
  );
}
