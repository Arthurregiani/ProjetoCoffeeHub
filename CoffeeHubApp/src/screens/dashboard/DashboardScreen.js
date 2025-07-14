import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function DashboardScreen({ navigation }) {
  const [userName, setUserName] = useState('João Silva');
  const [refreshing, setRefreshing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced', 'syncing', 'offline'

  // Dados simulados dos KPIs
  const [kpiData, setKpiData] = useState({
    producaoTotal: '1,250 sacas',
    talhoesAtivos: 8,
    lotesAtivos: 15,
    pendencias: 3,
    climaAtual: '24°C - Ensolarado',
    equipamentosOperacionais: 12,
  });

  // Dados simulados das atividades recentes
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      tipo: 'Aplicação',
      descricao: 'Aplicação de fertilizante no Talhão A1',
      data: '2024-01-07',
      status: 'Concluída',
    },
    {
      id: 2,
      tipo: 'Monitoramento',
      descricao: 'Monitoramento de pragas no Talhão B2',
      data: '2024-01-06',
      status: 'Pendente',
    },
    {
      id: 3,
      tipo: 'Colheita',
      descricao: 'Colheita parcial no Talhão C1',
      data: '2024-01-05',
      status: 'Em andamento',
    },
  ]);

  useEffect(() => {
    // Simular carregamento de dados
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setSyncStatus('syncing');
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncStatus('synced');
    } catch (error) {
      setSyncStatus('offline');
      console.error('Erro ao carregar dados:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleKPIPress = (kpiType) => {
    switch (kpiType) {
      case 'lotes':
        navigation.navigate('Lotes'); // Navegar para a tela de lotes
        break;
      case 'equipamentos':
        navigation.navigate('Equipamentos'); // Navegar diretamente via drawer
        break;
      case 'talhões':
        navigation.navigate('Propriedades', { screen: 'PropriedadesList' });
        break;
      case 'pendências':
        navigation.navigate('Atividades');
        break;
      case 'produção':
        navigation.navigate('Produção');
        break;
      case 'clima':
        Alert.alert('Clima', 'Funcionalidade de clima em desenvolvimento');
        break;
      case 'monitoramento':
        navigation.navigate('Monitoramento');
        break;
      default:
        Alert.alert('KPI', `Navegando para relatório de ${kpiType}`);
    }
  };

  const handleQuickActionPress = (action) => {
    switch (action) {
      case 'nova_atividade':
        navigation.navigate('Atividades');
        break;
      case 'ver_lotes':
        navigation.navigate('Lotes'); // Futura tela de lotes
        break;
      case 'operacao_financeira':
        navigation.navigate('Mais', { screen: 'OperacoesFinanceiras' });
        break;
      case 'relatorios':
        navigation.navigate('Produção');
        break;
      default:
        Alert.alert('Em desenvolvimento', `Funcionalidade ${action} em desenvolvimento`);
    }
  };

  const handleActivityPress = (activity) => {
    Alert.alert('Atividade', `Detalhes da atividade: ${activity.descricao}`);
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'synced': return COLORS.success;
      case 'syncing': return COLORS.warning;
      case 'offline': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'synced': return 'Sincronizado';
      case 'syncing': return 'Sincronizando...';
      case 'offline': return 'Offline';
      default: return 'Desconhecido';
    }
  };

  const renderKPICard = (title, value, onPress) => (
    <TouchableOpacity style={styles.kpiCard} onPress={onPress}>
      <Text style={styles.kpiTitle}>{title}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
    </TouchableOpacity>
  );

  const renderQuickActionButton = (title, action) => (
    <TouchableOpacity
      style={styles.quickActionButton}
      onPress={() => handleQuickActionPress(action)}
    >
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderActivityItem = (activity) => (
    <TouchableOpacity
      key={activity.id}
      style={styles.activityItem}
      onPress={() => handleActivityPress(activity)}
    >
      <View style={styles.activityHeader}>
        <Text style={styles.activityType}>{activity.tipo}</Text>
        <Text style={styles.activityDate}>{activity.data}</Text>
      </View>
      <Text style={styles.activityDescription}>{activity.descricao}</Text>
      <Text style={[styles.activityStatus, { color: getStatusColor(activity.status) }]}>
        {activity.status}
      </Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluída': return COLORS.success;
      case 'Em andamento': return COLORS.warning;
      case 'Pendente': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {userName}!</Text>
            <View style={styles.syncContainer}>
              <View style={[styles.syncIndicator, { backgroundColor: getSyncStatusColor() }]} />
              <Text style={styles.syncText}>{getSyncStatusText()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* KPI Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <View style={styles.kpiGrid}>
            {renderKPICard('Produção Total', kpiData.producaoTotal, () => handleKPIPress('produção'))}
            {renderKPICard('Talhões Ativos', kpiData.talhoesAtivos.toString(), () => handleKPIPress('talhões'))}
            {renderKPICard('Lotes Ativos', kpiData.lotesAtivos.toString(), () => handleKPIPress('lotes'))}
            {renderKPICard('Pendências', kpiData.pendencias.toString(), () => handleKPIPress('pendências'))}
            {renderKPICard('Clima Atual', kpiData.climaAtual, () => handleKPIPress('clima'))}
            {renderKPICard('Equipamentos OK', kpiData.equipamentosOperacionais.toString(), () => handleKPIPress('equipamentos'))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {renderQuickActionButton('Nova Atividade', 'nova_atividade')}
            {renderQuickActionButton('Ver Lotes', 'ver_lotes')}
            {renderQuickActionButton('Operação Financeira', 'operacao_financeira')}
            {renderQuickActionButton('Relatórios', 'relatorios')}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <View style={styles.activitiesList}>
            {recentActivities.map(renderActivityItem)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 4,
  },
  syncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  syncText: {
    fontSize: SIZES.caption,
    color: COLORS.background,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
    color: COLORS.background,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: COLORS.background,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  section: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  kpiCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kpiTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: COLORS.primaryLight,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  quickActionText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.background,
    textAlign: 'center',
  },
  activitiesList: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
  },
  activityItem: {
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityType: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  activityDate: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  activityDescription: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 4,
  },
  activityStatus: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
  },
});

