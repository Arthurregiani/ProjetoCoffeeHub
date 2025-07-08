import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importar todas as telas da seção 'Mais'
import MoreMenuScreen from '../screens/mais/MoreMenuScreen';
import MeuPerfilScreen from '../screens/mais/MeuPerfilScreen';
import EdicaoPerfilScreen from '../screens/mais/EdicaoPerfilScreen';
import ConjugeScreen from '../screens/mais/ConjugeScreen';
import CadastroConjugeScreen from '../screens/mais/CadastroConjugeScreen';
import FuncionariosScreen from '../screens/mais/FuncionariosScreen';
import CadastroFuncionarioScreen from '../screens/mais/CadastroFuncionarioScreen';
import CertificacoesScreen from '../screens/mais/CertificacoesScreen';
import CadastroCertificacaoScreen from '../screens/mais/CadastroCertificacaoScreen';
import OperacoesFinanceirasScreen from '../screens/mais/OperacoesFinanceirasScreen';
import RegistroOperacaoFinanceiraScreen from '../screens/mais/RegistroOperacaoFinanceiraScreen';
import CapacitacoesScreen from '../screens/mais/CapacitacoesScreen';
import CadastroCapacitacaoScreen from '../screens/mais/CadastroCapacitacaoScreen';
import ConfiguracoesScreen from '../screens/mais/ConfiguracoesScreen';
import AjudaSuporteScreen from '../screens/mais/AjudaSuporteScreen';

// Placeholder screens para as funcionalidades que ainda serão implementadas
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createStackNavigator();

export default function MaisNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MaisPrincipal" component={MoreMenuScreen} />
      
      {/* Telas de Perfil */}
      <Stack.Screen name="MeuPerfil" component={MeuPerfilScreen} />
      <Stack.Screen name="EdicaoPerfil" component={EdicaoPerfilScreen} />
      
      {/* Telas de Cônjuge */}
      <Stack.Screen name="Conjuge" component={ConjugeScreen} />
      <Stack.Screen name="CadastroConjuge" component={CadastroConjugeScreen} />
      
      {/* Telas de Funcionários */}
      <Stack.Screen name="Funcionarios" component={FuncionariosScreen} />
      <Stack.Screen name="CadastroFuncionario" component={CadastroFuncionarioScreen} />
      
      {/* Telas de Certificações */}
      <Stack.Screen name="Certificacoes" component={CertificacoesScreen} />
      <Stack.Screen name="CadastroCertificacao" component={CadastroCertificacaoScreen} />
      
      {/* Telas de Operações Financeiras */}
      <Stack.Screen name="OperacoesFinanceiras" component={OperacoesFinanceirasScreen} />
      <Stack.Screen name="RegistroOperacaoFinanceira" component={RegistroOperacaoFinanceiraScreen} />
      
      {/* Telas de Capacitações */}
      <Stack.Screen name="Capacitacoes" component={CapacitacoesScreen} />
      <Stack.Screen name="CadastroCapacitacao" component={CadastroCapacitacaoScreen} />
      
      {/* Telas de Configurações e Suporte */}
      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
      <Stack.Screen name="AjudaSuporte" component={AjudaSuporteScreen} />
      
      {/* Placeholder screens para funcionalidades futuras */}
      <Stack.Screen 
        name="EquipesMaoObra" 
        component={PlaceholderScreen} 
        initialParams={{ title: 'Equipes de Mão de Obra', message: 'Tela em desenvolvimento' }}
      />
      <Stack.Screen 
        name="Equipamentos" 
        component={PlaceholderScreen} 
        initialParams={{ title: 'Equipamentos', message: 'Tela em desenvolvimento' }}
      />
      <Stack.Screen 
        name="Insumos" 
        component={PlaceholderScreen} 
        initialParams={{ title: 'Insumos', message: 'Tela em desenvolvimento' }}
      />
      <Stack.Screen 
        name="EstoqueInsumos" 
        component={PlaceholderScreen} 
        initialParams={{ title: 'Estoque de Insumos', message: 'Tela em desenvolvimento' }}
      />
      <Stack.Screen 
        name="VariedadesCafe" 
        component={PlaceholderScreen} 
        initialParams={{ title: 'Variedades de Café', message: 'Tela em desenvolvimento' }}
      />
      <Stack.Screen 
        name="IndicadoresDesempenho" 
        component={PlaceholderScreen} 
        initialParams={{ title: 'Indicadores de Desempenho', message: 'Tela em desenvolvimento' }}
      />
    </Stack.Navigator>
  );
}

