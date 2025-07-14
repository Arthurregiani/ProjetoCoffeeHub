import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

export default function LoteDetalhesScreen({ route, navigation }) {
  const { lote } = route.params;
  const [expandedSection, setExpandedSection] = useState(null);

  // Dados simulados de atividades relacionadas ao lote
  const atividadesRelacionadas = [
    {
      id: 1,
      tipo: 'Colheita',
      descricao: 'Colheita manual seletiva',
      data: '2024-01-15',
      status: 'Concluída',
      funcionario: 'João Silva',
      observacoes: 'Qualidade excelente'
    },
    {
      id: 2,
      tipo: 'Secagem',
      descricao: 'Secagem em terreiro',
      data: '2024-01-16',
      status: 'Em andamento',
      funcionario: 'Maria Santos',
      observacoes: 'Tempo estimado: 10 dias'
    },
    {
      id: 3,
      tipo: 'Processamento',
      descricao: 'Descascamento e classificação',
      data: '2024-01-20',
      status: 'Pendente',
      funcionario: 'Carlos Lima',
      observacoes: 'Aguardando término da secagem'
    }
  ];

  const handleAddActivity = () => {
    // Navegar para tela de adicionar atividade com lote pré-selecionado
    navigation.navigate('Atividades', { 
      preSelectedLote: lote,
      shouldOpenModal: true 
    });
  };

  const handleEditActivity = (atividade) => {
    Alert.alert(
      'Editar Atividade',
      `Deseja editar a atividade "${atividade.descricao}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Editar', onPress: () => {
          // Navegar para tela de edição da atividade
          console.log('Editando atividade:', atividade);
        }}
      ]
    );
  };

  const handleActivityPress = (atividade) => {
    Alert.alert(
      'Detalhes da Atividade',
      `Tipo: ${atividade.tipo}\nDescrição: ${atividade.descricao}\nData: ${atividade.data}\nStatus: ${atividade.status}\nFuncionário: ${atividade.funcionario}\nObservações: ${atividade.observacoes}`,
      [
        { text: 'Fechar', style: 'cancel' },
        { text: 'Editar', onPress: () => handleEditActivity(atividade) }
      ]
    );
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluída': return COLORS.success;
      case 'Em andamento': return COLORS.warning;
      case 'Pendente': return COLORS.error;
      case 'Processando': return COLORS.warning;
      case 'Armazenado': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  const renderExpandableSection = (title, content, sectionKey) => (
    <View style={styles.sectionContainer}>
      <TouchableOpacity 
        style={styles.sectionHeader} 
        onPress={() => toggleSection(sectionKey)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon 
          name={expandedSection === sectionKey ? 'expand-less' : 'expand-more'} 
          size={24} 
          color={COLORS.primary} 
        />
      </TouchableOpacity>
      {expandedSection === sectionKey && (
        <View style={styles.sectionContent}>
          {content}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho com informações principais */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Text style={styles.loteCode}>{lote.codigo}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(lote.status) }]}>
              <Text style={styles.statusText}>{lote.status}</Text>
            </View>
          </View>
          <Text style={styles.headerDetail}>Data de Geração: {lote.dataCriacao}</Text>
          <Text style={styles.headerDetail}>Identificador: {lote.id}</Text>
        </View>

        {/* Informações detalhadas do lote */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Informações do Lote</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Origem:</Text>
            <Text style={styles.detailValue}>Propriedade São João - Talhão A1</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantidade:</Text>
            <Text style={styles.detailValue}>250 sacas (15,000 kg)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo de Café:</Text>
            <Text style={styles.detailValue}>Arábica - Bourbon Amarelo</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Qualidade:</Text>
            <Text style={styles.detailValue}>83 pontos (Cupping) - Umidade: 12%</Text>
          </View>
        </View>

        {/* Colheitas */}
        {renderExpandableSection(
          'Colheitas',
          lote.colheitas && lote.colheitas.map((colheita, index) => (
            <View key={index} style={styles.colheitaContainer}>
              <Text style={styles.colheita}>Data: {colheita.data}</Text>
              <Text style={styles.colheita}>Quantidade: {colheita.quantidade} sacas</Text>
              <Text style={styles.colheita}>Método: {colheita.metodo}</Text>
              <Text style={styles.colheita}>Talhão: {colheita.talhao}</Text>
              <Text style={styles.colheita}>Equipamento: {colheita.equipamento}</Text>
              <Text style={styles.colheita}>Funcionário: {colheita.funcionario}</Text>
            </View>
          )),
          'colheitas'
        )}

        {/* Composição */}
        {renderExpandableSection(
          'Composição',
          lote.composicao && (
            <View>
              <Text style={styles.composition}>Origem: {lote.composicao.origem.join(', ') || 'Nenhuma'}</Text>
              <Text style={styles.composition}>Destino: {lote.composicao.destino.join(', ') || 'Nenhum'}</Text>
            </View>
          ),
          'composicao'
        )}

        {/* Histórico de Atividades */}
        {renderExpandableSection(
          `Histórico de Atividades (${atividadesRelacionadas.length})`,
          <View>
            {atividadesRelacionadas.map((atividade) => (
              <TouchableOpacity 
                key={atividade.id} 
                style={styles.activityCard}
                onPress={() => handleActivityPress(atividade)}
              >
                <View style={styles.activityHeader}>
                  <Text style={styles.activityType}>{atividade.tipo}</Text>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditActivity(atividade)}
                  >
                    <Icon name="edit" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.activityDescription}>{atividade.descricao}</Text>
                <View style={styles.activityFooter}>
                  <Text style={styles.activityDate}>{atividade.data}</Text>
                  <Text style={[styles.activityStatus, { color: getStatusColor(atividade.status) }]}>
                    {atividade.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>,
          'atividades'
        )}

        {/* Observações */}
        {renderExpandableSection(
          'Observações',
          <View>
            <Text style={styles.observacoes}>Lote de alta qualidade, colheita realizada no ponto ideal de maturação. Recomenda-se armazenamento em local seco e arejado.</Text>
          </View>,
          'observacoes'
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddActivity}>
        <Icon name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
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
  headerCard: {
    backgroundColor: COLORS.surface,
    margin: SIZES.margin,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin / 2,
  },
  loteCode: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerDetail: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    margin: SIZES.margin,
    marginTop: 0,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SIZES.margin / 2,
  },
  detailLabel: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    width: 100,
  },
  detailValue: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    flex: 1,
  },
  sectionContainer: {
    backgroundColor: COLORS.surface,
    margin: SIZES.margin,
    marginTop: 0,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionContent: {
    padding: SIZES.padding,
  },
  colheitaContainer: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.margin / 2,
  },
  colheita: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 2,
  },
  composition: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin / 4,
  },
  activityCard: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.margin / 2,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
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
    color: COLORS.text,
  },
  editButton: {
    padding: 4,
  },
  activityDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDate: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  activityStatus: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  observacoes: {
    fontSize: SIZES.body,
    color: COLORS.text,
    lineHeight: 20,
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

