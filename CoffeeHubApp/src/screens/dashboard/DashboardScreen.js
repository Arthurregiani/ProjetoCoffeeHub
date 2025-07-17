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
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, SIZES, SHADOWS, SPACING, ACCESSIBILITY, ANIMATIONS, LAYOUT, TYPOGRAPHY, RESPONSIVE } from '../../constants/theme';
import { Card, StatCard, InfoCard } from '../../components/common/Card';
import { Button } from '../../components/common';
import { useResponsive } from '../../hooks/useResponsive';
import { ResponsiveGrid, ResponsiveContainer } from '../../components/common/ResponsiveLayout';

const { width: screenWidth } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const responsive = useResponsive();
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
        navigation.navigate('Lotes');
        break;
      case 'operacao_financeira':
        navigation.navigate('OperacoesFinanceiras');
        break;
      case 'relatorios':
        navigation.navigate('Produção');
        break;
      case 'meu_perfil':
        navigation.navigate('MeuPerfil');
        break;
      case 'funcionarios':
        navigation.navigate('Funcionarios');
        break;
      case 'insumos':
        navigation.navigate('Insumos');
        break;
      case 'certificacoes':
        navigation.navigate('Certificacoes');
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

  // Renderizar cards de KPI com novo design
  const renderKPICard = (title, value, onPress, icon, trend) => (
    <Card
      onPress={onPress}
      style={styles.kpiCard}
      shadow="medium"
      accessibilityLabel={`${title}: ${value}`}
    >
      <View style={styles.kpiHeader}>
        <Text style={styles.kpiIcon}>{icon}</Text>
        {trend && (
          <View style={[styles.trendIndicator, { backgroundColor: trend > 0 ? COLORS.success : COLORS.error }]}>
            <Text style={styles.trendText}>{trend > 0 ? '↗' : '↘'}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.kpiTitle, { 
        fontSize: responsive.isSmallScreen ? RESPONSIVE.fontSize.small.caption : SIZES.caption,
        lineHeight: ACCESSIBILITY.text.lineHeight * (responsive.isSmallScreen ? RESPONSIVE.fontSize.small.caption : SIZES.caption),
      }]}>{title}</Text>
      <Text style={[styles.kpiValue, {
        fontSize: responsive.isSmallScreen ? RESPONSIVE.fontSize.small.h4 : SIZES.h4,
        lineHeight: ACCESSIBILITY.text.lineHeight * (responsive.isSmallScreen ? RESPONSIVE.fontSize.small.h4 : SIZES.h4),
      }]}>{value}</Text>
    </Card>
  );

  // Renderizar ações rápidas com melhor design
  const renderQuickAction = (title, action, icon, bgColor = COLORS.primary) => (
    <TouchableOpacity
      style={[styles.quickActionContainer, { backgroundColor: bgColor }]}
      onPress={() => handleQuickActionPress(action)}
      accessibilityLabel={`Ação rápida: ${title}`}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      <View style={styles.quickActionButton}>
        <Text style={styles.quickActionIcon}>{icon}</Text>
        <Text style={styles.quickActionText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  // Renderizar item de atividade melhorado
  const renderActivityItem = (activity) => (
    <Card
      key={activity.id}
      onPress={() => handleActivityPress(activity)}
      style={styles.activityCard}
      shadow="small"
      accessibilityLabel={`Atividade: ${activity.descricao}`}
    >
      <View style={styles.activityHeader}>
        <View style={styles.activityTypeContainer}>
          <Text style={styles.activityTypeIcon}>{getActivityIcon(activity.tipo)}</Text>
          <Text style={styles.activityType}>{activity.tipo}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(activity.status) }]}>
          <Text style={styles.statusText}>{activity.status}</Text>
        </View>
      </View>
      <Text style={styles.activityDescription}>{activity.descricao}</Text>
      <View style={styles.activityFooter}>
        <Text style={styles.activityDate}>{formatDate(activity.data)}</Text>
        <TouchableOpacity style={styles.activityAction}>
          <Text style={styles.activityActionText}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  // Funções auxiliares
  const getActivityIcon = (tipo) => {
    switch (tipo) {
      case 'Aplicação': return '🌱';
      case 'Monitoramento': return '📊';
      case 'Colheita': return '🌾';
      case 'Irrigação': return '💧';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Header com cor sólida */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>Olá, {userName}!</Text>
              <Text style={styles.subtitle}>Bem-vindo ao CoffeeHub</Text>
              <View style={styles.syncContainer}>
                <View style={[styles.syncIndicator, { backgroundColor: getSyncStatusColor() }]} />
                <Text style={styles.syncText}>{getSyncStatusText()}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton} 
              onPress={handleNotificationPress}
              accessibilityLabel="Notificações"
              accessibilityRole="button"
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              {kpiData.pendencias > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{kpiData.pendencias}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* KPI Cards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Resumo da Propriedade</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Relatórios')}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
        <ResponsiveGrid 
          numColumns={2}
          spacing={responsive.isSmallScreen ? SPACING.xs : SPACING.sm}
          style={styles.kpiGridSmallScreen}
          containerPadding={responsive.isSmallScreen ? SPACING.xs : SPACING.md}
        >
            {renderKPICard('Produção Total', kpiData.producaoTotal, () => handleKPIPress('produção'), '🌾', 5)}
            {renderKPICard('Talhões Ativos', kpiData.talhoesAtivos.toString(), () => handleKPIPress('talhões'), '🌱', 2)}
            {renderKPICard('Lotes Ativos', kpiData.lotesAtivos.toString(), () => handleKPIPress('lotes'), '📦', 3)}
            {renderKPICard('Pendências', kpiData.pendencias.toString(), () => handleKPIPress('pendências'), '⚠️', -1)}
          </ResponsiveGrid>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          </View>
          <ResponsiveGrid 
          numColumns={2}
          spacing={responsive.isSmallScreen ? SPACING.xs * 0.8 : responsive.spacing * 0.5}
          style={styles.quickActionsGridSmallScreen}
          containerPadding={responsive.isSmallScreen ? SPACING.xs : SPACING.md}
          >
            {renderQuickAction('Nova Atividade', 'nova_atividade', '➕', COLORS.primary)}
            {renderQuickAction('Ver Lotes', 'ver_lotes', '📦', COLORS.secondary)}
            {renderQuickAction('Monitoramento', 'monitoramento', '📊', COLORS.accent)}
            {renderQuickAction('Relatórios', 'relatorios', '📈', COLORS.success)}
          </ResponsiveGrid>
        </View>

        {/* Recent Activities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Atividades Recentes</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Atividades')}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesList}>
            {recentActivities.map(renderActivityItem)}
          </View>
        </View>

        {/* Footer spacing */}
        <View style={styles.footer} />
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
  // Header melhorado
  header: {
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.primary,
    ...SHADOWS.large,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: SIZES.h1,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h1,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.whiteOpacity,
    marginBottom: SPACING.sm,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  syncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  syncText: {
    fontSize: SIZES.caption,
    color: COLORS.whiteOpacity,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  notificationButton: {
    position: 'relative',
    padding: SPACING.sm,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.whiteOpacity,
    ...SHADOWS.small,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  notificationBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '700',
  },
  
  // Seções
  section: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    lineHeight: TYPOGRAPHY.lineHeights.tight * SIZES.h3,
  },
  seeAllButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  seeAllText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  
  // KPI Cards
  kpiGrid: {
    // ResponsiveGrid handles layout, no need for manual flexDirection/flexWrap
  },
  kpiGridSmallScreen: {
    // ResponsiveGrid handles layout, no need for manual flexDirection/flexWrap
  },
  kpiCard: {
    padding: SPACING.md,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  kpiIcon: {
    fontSize: 24,
  },
  trendIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '700',
  },
kpiTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  kpiValue: {
    fontSize: SIZES.h4,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h4,
  },
  
  // Quick Actions
  quickActionsGrid: {
    // ResponsiveGrid handles layout, no need for manual flexDirection/flexWrap
  },
  quickActionsGridSmallScreen: {
    // ResponsiveGrid handles layout, no need for manual flexDirection/flexWrap
  },
  quickActionContainer: {
    borderRadius: SIZES.radiusLarge,
    overflow: 'hidden',
    ...SHADOWS.medium,
    minHeight: 90,
  },
  quickActionButton: {
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  quickActionText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  
  // Activities
  activitiesList: {
    marginTop: SPACING.xs,
  },
  activityCard: {
    padding: SPACING.md,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityTypeIcon: {
    fontSize: 20,
    marginRight: SPACING.xs,
  },
  activityType: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.primary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radiusLarge,
  },
  statusText: {
    fontSize: SIZES.caption,
    fontWeight: '600',
    color: COLORS.white,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  activityDescription: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDate: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  activityAction: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  activityActionText: {
    fontSize: SIZES.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  
  // Footer
  footer: {
    height: SPACING.xl,
    backgroundColor: COLORS.background,
  },
});

