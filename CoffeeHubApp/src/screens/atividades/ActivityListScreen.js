import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActivityCard = ({ activity, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{activity.type}</Text>
      <Text style={styles.cardDate}>{activity.date}</Text>
    </View>
    <Text style={styles.cardLocation}>{activity.location}</Text>
    <Text style={styles.cardDescription}>{activity.description}</Text>
    <View style={styles.cardFooter}>
      <Text style={[styles.cardStatus, { color: getStatusColor(activity.status) }]}>
        {activity.status}
      </Text>
      {activity.trackingCode && (
        <Text style={styles.cardTrackingCode}>#{activity.trackingCode}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'Concluído':
      return COLORS.success;
    case 'Em andamento':
      return COLORS.warning;
    case 'Pendente':
      return COLORS.error;
    case 'Agendado':
      return COLORS.info;
    default:
      return COLORS.gray;
  }
};

export default function ActivityListScreen({ route, navigation }) {
  const { category } = route.params;
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Dados de exemplo baseados na categoria
  const getActivitiesByCategory = (category) => {
    const allActivities = {
      'Monitoramento': [
        { id: '1', type: 'Monitoramento de Pragas', date: '15/01/2024', location: 'Talhão A1', description: 'Verificação de broca-do-café', status: 'Concluído', trackingCode: 'MON001' },
        { id: '2', type: 'Monitoramento Nutricional', date: '14/01/2024', location: 'Talhão B2', description: 'Análise foliar', status: 'Pendente', trackingCode: 'MON002' },
        { id: '3', type: 'Monitoramento de Doenças', date: '13/01/2024', location: 'Talhão C3', description: 'Verificação de ferrugem', status: 'Em andamento', trackingCode: 'MON003' },
      ],
      'Insumos': [
        { id: '4', type: 'Aplicação de Fertilizante', date: '13/01/2024', location: 'Talhão A1', description: 'NPK 20-05-20', status: 'Concluído', trackingCode: 'INS001' },
        { id: '5', type: 'Aplicação de Defensivo', date: '12/01/2024', location: 'Talhão C3', description: 'Fungicida preventivo', status: 'Concluído', trackingCode: 'INS002' },
        { id: '6', type: 'Aplicação de Herbicida', date: '11/01/2024', location: 'Talhão B2', description: 'Controle de plantas daninhas', status: 'Agendado', trackingCode: 'INS003' },
      ],
      'Produção': [
        { id: '7', type: 'Colheita', date: '10/01/2024', location: 'Talhão A1', description: 'Colheita manual seletiva', status: 'Em andamento', trackingCode: 'PRD001' },
        { id: '8', type: 'Processamento', date: '09/01/2024', location: 'Terreiro', description: 'Secagem natural', status: 'Concluído', trackingCode: 'PRD002' },
        { id: '9', type: 'Beneficiamento', date: '08/01/2024', location: 'Benefício', description: 'Descascamento e classificação', status: 'Concluído', trackingCode: 'PRD003' },
      ],
      'Qualidade': [
        { id: '10', type: 'Classificação', date: '08/01/2024', location: 'Armazém', description: 'Classificação por peneira', status: 'Concluído', trackingCode: 'QLD001' },
        { id: '11', type: 'Análise Sensorial', date: '07/01/2024', location: 'Laboratório', description: 'Cupping de qualidade', status: 'Pendente', trackingCode: 'QLD002' },
        { id: '12', type: 'Controle de Umidade', date: '06/01/2024', location: 'Armazém', description: 'Verificação de umidade dos grãos', status: 'Concluído', trackingCode: 'QLD003' },
      ],
      'Recursos': [
        { id: '13', type: 'Manutenção de Equipamento', date: '06/01/2024', location: 'Oficina', description: 'Revisão do trator', status: 'Concluído', trackingCode: 'REC001' },
        { id: '14', type: 'Treinamento', date: '05/01/2024', location: 'Sede', description: 'Capacitação em segurança', status: 'Agendado', trackingCode: 'REC002' },
        { id: '15', type: 'Gestão de Equipe', date: '04/01/2024', location: 'Campo', description: 'Organização de turmas de trabalho', status: 'Em andamento', trackingCode: 'REC003' },
      ],
      'Financeiro': [
        { id: '16', type: 'Compra de Insumos', date: '04/01/2024', location: 'Fornecedor A', description: 'Aquisição de fertilizantes', status: 'Concluído', trackingCode: 'FIN001' },
        { id: '17', type: 'Venda de Café', date: '03/01/2024', location: 'Cooperativa', description: 'Venda de 100 sacas', status: 'Processando', trackingCode: 'FIN002' },
        { id: '18', type: 'Pagamento de Funcionários', date: '02/01/2024', location: 'Escritório', description: 'Folha de pagamento mensal', status: 'Concluído', trackingCode: 'FIN003' },
      ],
    };
    return allActivities[category] || [];
  };

  const activities = getActivitiesByCategory(category);

  const filteredActivities = activities.filter(activity =>
    activity.type.toLowerCase().includes(searchText.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchText.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleActivityPress = (activity) => {
    console.log('Detalhes da atividade:', activity.type);
    // Navegar para tela de detalhes da atividade específica
  };

  const handleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchText('');
    }
  };

  const handleFilter = () => {
    console.log('Abrir filtros');
    // Implementar modal de filtros
  };

  const handleSort = () => {
    console.log('Abrir ordenação');
    // Implementar modal de ordenação
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category} - Atividades</Text>
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar atividades..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>
      )}

      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterSortButton} onPress={handleFilter}>
          <Icon name="filter-list" size={16} color={COLORS.white} />
          <Text style={styles.filterSortButtonText}>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterSortButton} onPress={handleSort}>
          <Icon name="sort" size={16} color={COLORS.white} />
          <Text style={styles.filterSortButtonText}>Ordenar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => handleActivityPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="work-off" size={64} color={COLORS.gray} />
            <Text style={styles.emptyText}>
              {searchText ? 'Nenhuma atividade encontrada' : `Nenhuma atividade de ${category}`}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchText ? 'Tente ajustar os termos de busca' : 'Adicione uma nova atividade para começar'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.background,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: COLORS.lightGray,
  },
  filterSortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    gap: 5,
  },
  filterSortButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  cardLocation: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTrackingCode: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'monospace',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

