import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

export default function ProducaoScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [producaoData, setProducaoData] = useState({
    producaoMensal: '120 sacas',
    metaMensal: '150 sacas',
    lotesProcessando: 8,
    lotesArmazenados: 12,
    colheitasPendentes: 5,
    qualidadeMedia: 82.5,
    rendimentoMedio: '85%',
    custoProducao: 'R$ 285/saca',
  });

  const [atividadesRecentes, setAtividadesRecentes] = useState([
    {
      id: 1,
      tipo: 'Colheita',
      descricao: 'Colheita Talhão A1 - 25 sacas',
      data: '2024-01-15',
      status: 'Concluída',
      prioridade: 'normal',
    },
    {
      id: 2,
      tipo: 'Processamento',
      descricao: 'Lote L001 - Secagem',
      data: '2024-01-14',
      status: 'Em andamento',
      prioridade: 'alta',
    },
    {
      id: 3,
      tipo: 'Classificação',
      descricao: 'Lote L002 - Avaliação qualidade',
      data: '2024-01-13',
      status: 'Pendente',
      prioridade: 'média',
    },
  ]);

  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: 'warning',
      titulo: 'Umidade Alta',
      descricao: 'Lote L003 com umidade acima de 12%',
      urgencia: 'alta',
    },
    {
      id: 2,
      tipo: 'info',
      titulo: 'Colheita Programada',
      descricao: 'Talhão B2 pronto para colheita',
      urgencia: 'média',
    },
  ]);

  useEffect(() => {
    loadProducaoData();
  }, []);

  const loadProducaoData = async () => {
    try {
      // Simular carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Dados seriam carregados da API aqui
    } catch (error) {
      console.error('Erro ao carregar dados de produção:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducaoData();
    setRefreshing(false);
  };

  const handleActionPress = (action) => {
    switch (action) {
      case 'nova_colheita':
        navigation.navigate('RegistroColheita');
        break;
      case 'processar_lote':
        navigation.navigate('ProcessamentoCafe');
        break;
      case 'classificar_cafe':
        navigation.navigate('ClassificacaoCafe');
        break;
      case 'ver_lotes':
        navigation.navigate('Lotes');
        break;
      case 'rastreabilidade':
        navigation.navigate('Rastreabilidade');
        break;
      case 'relatorios':
        navigation.navigate('RelatoriosPrincipal');
        break;
      case 'monitoramento':
        navigation.navigate('Monitoramento');
        break;
      default:
        Alert.alert('Funcionalidade', `${action} em desenvolvimento`);
    }
  };

  const handleAtividadePress = (atividade) => {
    Alert.alert(
      'Atividade',
      `${atividade.tipo}: ${atividade.descricao}\nStatus: ${atividade.status}`,
      [
        { text: 'Fechar', style: 'cancel' },
        { text: 'Ver Detalhes', onPress: () => console.log('Ver detalhes:', atividade) },
      ]
    );
  };

  const handleAlertaPress = (alerta) => {
    Alert.alert(
      alerta.titulo,
      alerta.descricao,
      [
        { text: 'Ignorar', style: 'cancel' },
        { text: 'Resolver', onPress: () => console.log('Resolver:', alerta) },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluída': return COLORS.success;
      case 'Em andamento': return COLORS.warning;
      case 'Pendente': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getAlertIcon = (tipo) => {
    switch (tipo) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'notifications';
    }
  };

  const getAlertColor = (urgencia) => {
    switch (urgencia) {
      case 'alta': return COLORS.error;
      case 'média': return COLORS.warning;
      case 'baixa': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  const renderMetricCard = (title, value, subtitle, onPress) => (
    <TouchableOpacity style={styles.metricCard} onPress={onPress}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );

  const renderActionButton = (title, action, iconName, color = COLORS.primary) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: color }]}
      onPress={() => handleActionPress(action)}
    >
      <Icon name={iconName} size={24} color={COLORS.white} />
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Produção</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color={COLORS.white} />
            {alertas.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{alertas.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Métricas de Produção */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indicadores de Produção</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard(
              'Produção Mensal',
              producaoData.producaoMensal,
              `Meta: ${producaoData.metaMensal}`,
              () => handleActionPress('ver_producao')
            )}
            {renderMetricCard(
              'Lotes Processando',
              producaoData.lotesProcessando.toString(),
              'Em andamento',
              () => handleActionPress('ver_lotes')
            )}
            {renderMetricCard(
              'Qualidade Média',
              `${producaoData.qualidadeMedia} pts`,
              'Pontuação cupping',
              () => handleActionPress('ver_qualidade')
            )}
            {renderMetricCard(
              'Rendimento',
              producaoData.rendimentoMedio,
              'Processamento',
              () => handleActionPress('ver_rendimento')
            )}
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {renderActionButton('Nova Colheita', 'nova_colheita', 'agriculture', COLORS.success)}
            {renderActionButton('Processar Lote', 'processar_lote', 'build', COLORS.warning)}
            {renderActionButton('Classificar Café', 'classificar_cafe', 'grade', COLORS.primary)}
            {renderActionButton('Rastreabilidade', 'rastreabilidade', 'track-changes', COLORS.accent)}
          </View>
        </View>

        {/* Alertas */}
        {alertas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alertas</Text>
            <View style={styles.alertsList}>
              {alertas.map((alerta) => (
                <TouchableOpacity
                  key={alerta.id}
                  style={styles.alertItem}
                  onPress={() => handleAlertaPress(alerta)}
                >
                  <View style={styles.alertHeader}>
                    <Icon 
                      name={getAlertIcon(alerta.tipo)} 
                      size={20} 
                      color={getAlertColor(alerta.urgencia)} 
                    />
                    <Text style={styles.alertTitle}>{alerta.titulo}</Text>
                  </View>
                  <Text style={styles.alertDescription}>{alerta.descricao}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Atividades Recentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <View style={styles.activitiesList}>
            {atividadesRecentes.map((atividade) => (
              <TouchableOpacity
                key={atividade.id}
                style={styles.activityItem}
                onPress={() => handleAtividadePress(atividade)}
              >
                <View style={styles.activityHeader}>
                  <Text style={styles.activityType}>{atividade.tipo}</Text>
                  <Text style={styles.activityDate}>{atividade.data}</Text>
                </View>
                <Text style={styles.activityDescription}>{atividade.descricao}</Text>
                <Text style={[styles.activityStatus, { color: getStatusColor(atividade.status) }]}>
                  {atividade.status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => handleActionPress('nova_colheita')}
      >
        <Icon name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
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
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
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
    color: COLORS.white,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
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
  metricTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  metricSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 8,
  },
  alertsList: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
  },
  alertItem: {
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 8,
  },
  alertDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
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
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
