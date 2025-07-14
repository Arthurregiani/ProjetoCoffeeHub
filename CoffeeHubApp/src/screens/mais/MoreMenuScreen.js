import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';

// Organizando o menu em categorias mais lógicas
const menuSections = [
  {
    title: 'Perfil e Pessoas',
    items: [
      { id: '1', title: 'Meu Perfil', icon: 'person', screen: 'MeuPerfil' },
      { id: '2', title: 'Cônjuge', icon: 'favorite', screen: 'Conjuge' },
      { id: '3', title: 'Funcionários', icon: 'group', screen: 'Funcionarios' },
    ]
  },
  {
    title: 'Recursos e Gestão',
    items: [
      { id: '4', title: 'Equipamentos', icon: 'build', screen: 'Equipamentos' },
      { id: '5', title: 'Insumos', icon: 'inventory-2', screen: 'Insumos' },
      { id: '6', title: 'Operações Financeiras', icon: 'account-balance-wallet', screen: 'OperacoesFinanceiras' },
    ]
  },
  {
    title: 'Certificações e Qualidade',
    items: [
      { id: '7', title: 'Certificações', icon: 'verified', screen: 'Certificacoes' },
      { id: '8', title: 'Capacitações', icon: 'school', screen: 'Capacitacoes' },
      { id: '9', title: 'Variedades de Café', icon: 'local-cafe', screen: 'VariedadesCafe' },
    ]
  },
  {
    title: 'Suporte e Configurações',
    items: [
      { id: '10', title: 'Configurações', icon: 'settings', screen: 'Configuracoes' },
      { id: '11', title: 'Ajuda e Suporte', icon: 'help', screen: 'AjudaSuporte' },
      { id: '12', title: 'Sobre o App', icon: 'info', screen: 'SobreApp' },
    ]
  },
];

export default function MoreMenuScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair do aplicativo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              // A navegação será automaticamente atualizada pelo AppNavigator
              // que monitora o estado de autenticação
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  const handleMenuItemPress = (screen) => {
    if (screen === 'SobreApp') {
      Alert.alert(
        'Sobre o CoffeeHub',
        'CoffeeHub v1.0.0\n\nAplicativo para gestão de propriedades cafeeiras.\n\nDesenvolvido para produtores de café.',
        [{ text: 'OK' }]
      );
    } else {
      navigation.navigate(screen);
    }
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(item.screen)}
    >
      <Icon name={item.icon} size={24} color={COLORS.primary} />
      <Text style={styles.menuItemText}>{item.title}</Text>
      <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  const renderSection = (section) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.items.map(renderMenuItem)}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mais</Text>
        <Text style={styles.headerSubtitle}>Configurações e recursos adicionais</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuSections.map(renderSection)}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="exit-to-app" size={24} color={COLORS.background} />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.background,
    opacity: 0.8,
    marginTop: 4,
  },
  menuContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.error || '#e74c3c',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

