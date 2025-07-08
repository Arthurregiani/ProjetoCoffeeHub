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
import PropriedadesScreen from '../screens/propriedades/PropriedadesScreen';
import AtividadesScreen from '../screens/atividades/AtividadesScreen';
import RelatoriosScreen from '../screens/relatorios/RelatoriosScreen';
import MoreMenuScreen from '../screens/mais/MoreMenuScreen';

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
      <Tab.Screen name="Propriedades" component={PropriedadesScreen} />
      <Tab.Screen name="Atividades" component={AtividadesScreen} />
      <Tab.Screen name="Relatórios" component={RelatoriosScreen} />
      <Tab.Screen name="Mais" component={MoreMenuScreen} />
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
      }}
    >
      <Drawer.Screen name="Home" component={MainTabsNavigator} options={{ title: 'CoffeeHub' }} />
      {/* Adicione outras telas que podem ser acessadas diretamente pelo Drawer aqui, se necessário */}
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

