import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar navegadores
import AuthNavigator from './AuthNavigator';
import PropriedadesNavigator from './PropriedadesNavigator';
import RelatoriosNavigator from './RelatoriosNavigator';
import MaisNavigator from './MaisNavigator';

// Importar telas
import SplashScreen from '../screens/SplashScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AtividadesScreen from '../screens/atividades/AtividadesScreen';

// Importar constantes de tema
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal com Bottom Tabs
function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { 
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.background,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Propriedades') {
            iconName = 'landscape';
          } else if (route.name === 'Atividades') {
            iconName = 'work';
          } else if (route.name === 'Relatórios') {
            iconName = 'bar-chart';
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
      <Tab.Screen name="Relatórios" component={RelatoriosNavigator} />
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
        drawerStyle: {
          backgroundColor: COLORS.surface,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={MainTabsNavigator} 
        options={{ 
          title: 'CoffeeHub',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
}

// Navegador principal da aplicação
export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se existe um token de autenticação armazenado
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          // Usuário não está logado - mostrar telas de autenticação
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          // Usuário está logado - mostrar aplicação principal
          <Stack.Screen name="MainTabs" component={MainDrawerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

