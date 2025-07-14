import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para simular autenticação
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importe suas telas aqui
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import PropriedadesNavigator from './PropriedadesNavigator';
import AtividadesScreen from '../screens/atividades/AtividadesScreen';
import LotesNavigator from './LotesNavigator';
import MonitoramentoNavigator from './MonitoramentoNavigator';
import ProducaoNavigator from './RelatoriosNavigator'; // Renomeado para ProducaoNavigator
import MaisNavigator from './MaisNavigator';
import InsumosNavigator from './InsumosNavigator';
import ProcessamentoNavigator from './ProcessamentoNavigator';

// Importe as constantes de tema
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal com Bottom Tabs
function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // O Drawer Navigator já terá um header
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.surface },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Propriedades') {
            iconName = 'landscape';
          } else if (route.name === 'Atividades') {
            iconName = 'work';
          } else if (route.name === 'Lotes') {
            iconName = 'inventory';
          } else if (route.name === 'Produção') {
            iconName = 'agriculture';
          } else if (route.name === 'Mais') {
            iconName = 'more-horiz';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Propriedades" component={PropriedadesNavigator} />
      <Tab.Screen name="Atividades" component={AtividadesScreen} />
      <Tab.Screen name="Lotes" component={LotesNavigator} />
      <Tab.Screen name="Produção" component={ProducaoNavigator} options={{ title: 'Produção' }} />
      <Tab.Screen name="Mais" component={MaisNavigator} />
    </Tab.Navigator>
  );
}

// Navegação principal com Drawer (menu lateral)
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.background,
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={MainTabsNavigator} 
        options={{ 
          title: 'CoffeeHub',
          drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="MeuPerfil" 
        component={MaisNavigator} 
        initialParams={{ screen: 'MeuPerfil' }}
        options={{ 
          title: 'Meu Perfil',
          drawerIcon: ({ color }) => <Icon name="person" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="OperacoesFinanceiras" 
        component={MaisNavigator} 
        initialParams={{ screen: 'OperacoesFinanceiras' }}
        options={{ 
          title: 'Operações Financeiras',
          drawerIcon: ({ color }) => <Icon name="attach-money" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Funcionarios" 
        component={MaisNavigator} 
        initialParams={{ screen: 'Funcionarios' }}
        options={{ 
          title: 'Funcionários',
          drawerIcon: ({ color }) => <Icon name="people" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Monitoramento" 
        component={MonitoramentoNavigator} 
        options={{ 
          title: 'Monitoramento',
          drawerIcon: ({ color }) => <Icon name="visibility" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Insumos" 
        component={InsumosNavigator} 
        options={{ 
          title: 'Insumos',
          drawerIcon: ({ color }) => <Icon name="inventory-2" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Processamento" 
        component={ProcessamentoNavigator} 
        options={{ 
          title: 'Processamento',
          drawerIcon: ({ color }) => <Icon name="local-cafe" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Equipamentos" 
        component={MaisNavigator} 
        initialParams={{ screen: 'Equipamentos' }}
        options={{ 
          title: 'Equipamentos',
          drawerIcon: ({ color }) => <Icon name="build" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Certificacoes" 
        component={MaisNavigator} 
        initialParams={{ screen: 'Certificacoes' }}
        options={{ 
          title: 'Certificações',
          drawerIcon: ({ color }) => <Icon name="verified" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Configuracoes" 
        component={MaisNavigator} 
        initialParams={{ screen: 'Configuracoes' }}
        options={{ 
          title: 'Configurações',
          drawerIcon: ({ color }) => <Icon name="settings" size={24} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="AjudaSuporte" 
        component={MaisNavigator} 
        initialParams={{ screen: 'AjudaSuporte' }}
        options={{ 
          title: 'Ajuda & Suporte',
          drawerIcon: ({ color }) => <Icon name="help" size={24} color={color} />
        }} 
      />
    </Drawer.Navigator>
  );
}

// Navegação de Autenticação
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

// Navegador principal da aplicação
export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simula a verificação de um token JWT armazenado
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {userToken == null ? <AuthStack /> : <MainDrawerNavigator />}
    </NavigationContainer>
  );
}


