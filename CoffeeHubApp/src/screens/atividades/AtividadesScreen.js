import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, SafeAreaView, StatusBar, Animated, Dimensions } from 'react-native';
import { COLORS, SIZES, SHADOWS, SPACING, ACCESSIBILITY, RESPONSIVE } from '../../constants/theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useResponsive } from '../../hooks/useResponsive';
import { ResponsiveGrid, ResponsiveContainer } from '../../components/common/ResponsiveLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

const ActivityCard = ({ activity, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return COLORS.success;
      case 'Em andamento': return COLORS.warning;
      case 'Pendente': return COLORS.error;
      case 'Agendado': return COLORS.info;
      default: return COLORS.textSecondary;
    }
  };

  const getActivityIcon = (type) => {
    if (type.includes('Monitoramento')) return '📊';
    if (type.includes('Aplicação')) return '🌱';
    if (type.includes('Colheita')) return '🌾';
    if (type.includes('Irrigação')) return '💧';
    if (type.includes('Processamento')) return '⚙️';
    if (type.includes('Classificação')) return '📋';
    if (type.includes('Manutenção')) return '🔧';
    if (type.includes('Treinamento')) return '🎓';
    if (type.includes('Compra') || type.includes('Venda')) return '💰';
    return '📝';
  };

  return (
    <Card
      onPress={onPress}
      style={styles.activityCard}
      shadow="medium"
      accessibilityLabel={`Atividade: ${activity.type}`}
      accessibilityHint={`Toque para ver detalhes da atividade`}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardIcon}>{getActivityIcon(activity.type)}</Text>
          <View style={styles.cardTitleInfo}>
            <Text style={styles.cardTitle}>{activity.type}</Text>
            <Text style={styles.cardLocation}>{activity.location}</Text>
          </View>
        </View>
        <View style={styles.cardDateContainer}>
          <Text style={styles.cardDate}>{activity.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(activity.status) }]}>
            <Text style={styles.statusText}>{activity.status}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.cardDescription}>{activity.description}</Text>
      <View style={styles.cardFooter}>
        {activity.trackingCode && (
          <View style={styles.trackingCodeContainer}>
            <Icon name="qr-code" size={16} color={COLORS.textSecondary} />
            <Text style={styles.cardTrackingCode}>#{activity.trackingCode}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.cardAction}>
          <Text style={styles.cardActionText}>Ver detalhes</Text>
          <Icon name="arrow-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const ActivityTypeModal = ({ visible, onClose, onSelectType }) => {
  const responsive = useResponsive();
  const activityTypes = [
    { id: 'monitoring', name: 'Monitoramento', icon: 'visibility', emoji: '📊', color: COLORS.info },
    { id: 'application', name: 'Aplicação', icon: 'spray', emoji: '🌱', color: COLORS.success },
    { id: 'harvest', name: 'Colheita', icon: 'agriculture', emoji: '🌾', color: COLORS.warning },
    { id: 'irrigation', name: 'Irrigação', icon: 'water-drop', emoji: '💧', color: COLORS.info },
    { id: 'management', name: 'Manejo', icon: 'build', emoji: '🔧', color: COLORS.secondary },
    { id: 'financial', name: 'Operação Financeira', icon: 'attach-money', emoji: '💰', color: COLORS.accent },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nova Atividade</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.modalCloseButton}
              accessibilityLabel="Fechar modal"
              accessibilityRole="button"
            >
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>Selecione o tipo de atividade que deseja criar</Text>
          <ResponsiveGrid
            numColumns={responsive.isSmallScreen ? 1 : 2}
            spacing={responsive.spacing * 0.5}
            style={styles.modalGrid}
          >
            {activityTypes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.modalItem, { borderLeftColor: item.color }]}
                onPress={() => onSelectType(item)}
                accessibilityLabel={`Criar atividade de ${item.name}`}
                accessibilityRole="button"
              >
                <View style={[styles.modalItemIcon, { backgroundColor: item.color + '20' }]}>
                  <Text style={styles.modalItemEmoji}>{item.emoji}</Text>
                </View>
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ResponsiveGrid>
        </View>
      </View>
    </Modal>
  );
};

export default function AtividadesScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Monitoramento');
  const [modalVisible, setModalVisible] = useState(false);
  
  // Verificar se há parâmetros de lote pré-selecionado
  const preSelectedLote = route?.params?.preSelectedLote;
  const shouldOpenModal = route?.params?.shouldOpenModal;

  // Abrir modal automaticamente se necessário
  React.useEffect(() => {
    if (shouldOpenModal) {
      setModalVisible(true);
      // Limpar os parâmetros para evitar abrir novamente
      navigation.setParams({ shouldOpenModal: false });
    }
  }, [shouldOpenModal, navigation]);

  const tabs = ['Monitoramento', 'Insumos', 'Produção', 'Qualidade', 'Recursos', 'Financeiro'];

  // Dados de exemplo para diferentes categorias
  const activitiesData = {
    'Monitoramento': [
      { id: '1', type: 'Monitoramento de Pragas', date: '15/01/2024', location: 'Talhão A1', description: 'Verificação de broca-do-café', status: 'Concluído', trackingCode: 'MON001' },
      { id: '2', type: 'Monitoramento Nutricional', date: '14/01/2024', location: 'Talhão B2', description: 'Análise foliar', status: 'Pendente', trackingCode: 'MON002' },
    ],
    'Insumos': [
      { id: '3', type: 'Aplicação de Fertilizante', date: '13/01/2024', location: 'Talhão A1', description: 'NPK 20-05-20', status: 'Concluído', trackingCode: 'INS001' },
      { id: '4', type: 'Aplicação de Defensivo', date: '12/01/2024', location: 'Talhão C3', description: 'Fungicida preventivo', status: 'Concluído', trackingCode: 'INS002' },
    ],
    'Produção': [
      { id: '5', type: 'Colheita', date: '10/01/2024', location: 'Talhão A1', description: 'Colheita manual seletiva', status: 'Em andamento', trackingCode: 'PRD001' },
      { id: '6', type: 'Processamento', date: '09/01/2024', location: 'Terreiro', description: 'Secagem natural', status: 'Concluído', trackingCode: 'PRD002' },
    ],
    'Qualidade': [
      { id: '7', type: 'Classificação', date: '08/01/2024', location: 'Armazém', description: 'Classificação por peneira', status: 'Concluído', trackingCode: 'QLD001' },
      { id: '8', type: 'Análise Sensorial', date: '07/01/2024', location: 'Laboratório', description: 'Cupping de qualidade', status: 'Pendente', trackingCode: 'QLD002' },
    ],
    'Recursos': [
      { id: '9', type: 'Manutenção de Equipamento', date: '06/01/2024', location: 'Oficina', description: 'Revisão do trator', status: 'Concluído', trackingCode: 'REC001' },
      { id: '10', type: 'Treinamento', date: '05/01/2024', location: 'Sede', description: 'Capacitação em segurança', status: 'Agendado', trackingCode: 'REC002' },
    ],
    'Financeiro': [
      { id: '11', type: 'Compra de Insumos', date: '04/01/2024', location: 'Fornecedor A', description: 'Aquisição de fertilizantes', status: 'Concluído', trackingCode: 'FIN001' },
      { id: '12', type: 'Venda de Café', date: '03/01/2024', location: 'Cooperativa', description: 'Venda de 100 sacas', status: 'Processando', trackingCode: 'FIN002' },
    ],
  };

  const currentActivities = activitiesData[activeTab] || [];

  const handleActivityPress = (activity) => {
    // Navegar para tela de detalhes da atividade com navegação contextual
    navigation.navigate('ActivityDetails', {
      activity: activity,
      relatedItems: {
        talhao: activity.location,
        lote: activity.loteId || null,
        propriedade: activity.propriedadeId || null
      }
    });
  };

  const handleAddActivity = () => {
    setModalVisible(true);
  };

  const handleSelectActivityType = (activityType) => {
    setModalVisible(false);
    
    // Navegar para a tela específica baseada no tipo de atividade
    let targetScreen;
    switch (activityType.id) {
      case 'harvest':
        targetScreen = 'ColheitaActivity';
        break;
      case 'application':
        targetScreen = 'AplicacaoActivity';
        break;
      case 'irrigation':
        targetScreen = 'IrrigacaoActivity';
        break;
      case 'monitoring':
        targetScreen = 'MonitoramentoActivity';
        break;
      default:
        targetScreen = 'CreateActivity';
    }
    
    navigation.navigate(targetScreen, {
      activityType: activityType,
      preSelectedLote: preSelectedLote
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atividades</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('ActivityList')}
            accessibilityLabel="Ver todas as atividades"
          >
            <Icon name="list" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('ActivityCalendar')}
            accessibilityLabel="Ver calendário de atividades"
          >
            <Icon name="calendar-today" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tabsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === item && styles.activeTab
              ]}
              onPress={() => setActiveTab(item)}
              accessibilityLabel={`Filtrar por ${item}`}
              accessibilityRole="button"
            >
              <Text style={[
                styles.tabText,
                activeTab === item && styles.activeTabText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Activities List */}
      <FlatList
        data={currentActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => handleActivityPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Icon name="work-off" size={64} color={COLORS.textSecondary} />
            </View>
            <Text style={styles.emptyText}>Nenhuma atividade encontrada</Text>
            <Text style={styles.emptySubtext}>Toque no botão + para adicionar uma nova atividade</Text>
            <Button
              title="Adicionar Atividade"
              onPress={handleAddActivity}
              style={styles.emptyButton}
              size="small"
            />
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleAddActivity}
        accessibilityLabel="Adicionar nova atividade"
        accessibilityRole="button"
      >
        <Icon name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>

      {/* Activity Type Modal */}
      <ActivityTypeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectType={handleSelectActivityType}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  headerButton: {
    padding: SPACING.sm,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.primaryOpacity,
    ...SHADOWS.small,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Tabs
  tabsContainer: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.xs,
  },
  tabsList: {
    paddingHorizontal: SPACING.sm,
  },
  tab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: SIZES.radiusLarge,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primaryOpacity,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  // Content
  listContent: {
    padding: SPACING.md,
    flexGrow: 1,
  },
  // Activity Card
  activityCard: {
    marginBottom: SPACING.md,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  cardTitleInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  cardLocation: {
    fontSize: SIZES.caption,
    color: COLORS.primary,
    marginTop: SPACING.xs,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  cardDateContainer: {
    alignItems: 'flex-end',
  },
  cardDate: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
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
  cardDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTrackingCode: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
    fontFamily: 'monospace',
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  cardActionText: {
    fontSize: SIZES.caption,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: SPACING.xs,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  // FAB
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: SPACING.lg,
    bottom: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    ...SHADOWS.large,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h3,
  },
  emptySubtext: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  emptyButton: {
    marginTop: SPACING.md,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.blackOpacity,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    maxHeight: '80%',
    paddingBottom: SPACING.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: SIZES.h3,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h3,
  },
  modalCloseButton: {
    padding: SPACING.sm,
    borderRadius: SIZES.radiusLarge,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  modalGrid: {
    paddingHorizontal: SPACING.md,
  },
  modalItem: {
    flex: 1,
    margin: SPACING.xs,
    padding: SPACING.md,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    borderLeftWidth: 4,
    minHeight: 100,
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  modalItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  modalItemEmoji: {
    fontSize: 24,
  },
  modalItemText: {
    fontSize: SIZES.caption,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
});
