import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importar telas de monitoramento
import MonitoramentoScreen from '../screens/monitoramento/MonitoramentoScreen';

const Stack = createStackNavigator();

export default function MonitoramentoNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen 
        name="MonitoramentoPrincipal" 
        component={MonitoramentoScreen} 
        options={{ title: 'Monitoramento' }}
      />
      {/* Futuras telas de monitoramento podem ser adicionadas aqui */}
    </Stack.Navigator>
  );
}
