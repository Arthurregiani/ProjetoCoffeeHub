import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QualidadeScreen = ({ navigation, route }) => {
  const { lote } = route.params || {};
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);
  const [observacoes, setObservacoes] = useState('');

  const criteriosQualidade = [
    { id: 'aroma', nome: 'Aroma', nota: 8.5, icon: 'local-florist' },
    { id: 'sabor', nome: 'Sabor', nota: 9.0, icon: 'emoji-food-beverage' },
    { id: 'acidez', nome: 'Acidez', nota: 7.8, icon: 'science' },
    { id: 'corpo', nome: 'Corpo', nota: 8.2, icon: 'fitness-center' },
    { id: 'uniformidade', nome: 'Uniformidade', nota: 8.8, icon: 'view-module' },
    { id: 'balanceamento', nome: 'Balanceamento', nota: 8.6, icon: 'balance' },
  ];

  const defeitos = [
    { id: 'quebrados', nome: 'Grãos Quebrados', quantidade: 2, limite: 5 },
    { id: 'pretos', nome: 'Grãos Pretos', quantidade: 0, limite: 1 },
    { id: 'verdes', nome: 'Grãos Verdes', quantidade: 1, limite: 3 },
    { id: 'brocados', nome: 'Grãos Brocados', quantidade: 0, limite: 2 },
  ];

  const avaliacoes = [
    { id: 'especial', nome: 'Café Especial', nota: 85, cor: '#51cf66' },
    { id: 'superior', nome: 'Superior', nota: 80, cor: '#4dabf7' },
    { id: 'tradicional', nome: 'Tradicional', nota: 70, cor: '#ff6b35' },
    { id: 'industrial', nome: 'Industrial', nota: 60, cor: '#868e96' },
  ];

  const dadosLote = {
    nome: lote || 'Lote 001',
    variedade: 'Bourbon Amarelo',
    dataAvaliacao: new Date().toLocaleDateString(),
    responsavel: 'Maria Santos',
    notaFinal: 8.5,
    classificacao: 'Café Especial',
  };

  const calcularNotaFinal = () => {
    const soma = criteriosQualidade.reduce((acc, criterio) => acc + criterio.nota, 0);
    return (soma / criteriosQualidade.length).toFixed(1);
  };

  const obterClassificacao = (nota) => {
    if (nota >= 8.5) return { nome: 'Café Especial', cor: '#51cf66' };
    if (nota >= 8.0) return { nome: 'Superior', cor: '#4dabf7' };
    if (nota >= 7.0) return { nome: 'Tradicional', cor: '#ff6b35' };
    return { nome: 'Industrial', cor: '#868e96' };
  };

  const salvarAvaliacao = () => {
    Alert.alert(
      'Salvar Avaliação',
      'Deseja salvar a avaliação de qualidade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salvar', onPress: () => Alert.alert('Sucesso', 'Avaliação salva com sucesso!') },
      ]
    );
  };

  const renderizarEstrelas = (nota) => {
    const estrelas = [];
    const notaInteira = Math.floor(nota);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= notaInteira) {
        estrelas.push(
          <Icon key={i} name="star" size={16} color="#ffd43b" />
        );
      } else if (i === notaInteira + 1 && nota % 1 >= 0.5) {
        estrelas.push(
          <Icon key={i} name="star-half" size={16} color="#ffd43b" />
        );
      } else {
        estrelas.push(
          <Icon key={i} name="star-border" size={16} color="#adb5bd" />
        );
      }
    }
    
    return estrelas;
  };

  const classificacaoAtual = obterClassificacao(calcularNotaFinal());

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Controle de Qualidade</Text>
        <Text style={styles.subtitle}>{dadosLote.nome}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações da Avaliação</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Variedade:</Text>
          <Text style={styles.infoValue}>{dadosLote.variedade}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data:</Text>
          <Text style={styles.infoValue}>{dadosLote.dataAvaliacao}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Responsável:</Text>
          <Text style={styles.infoValue}>{dadosLote.responsavel}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Critérios de Qualidade</Text>
        {criteriosQualidade.map((criterio) => (
          <View key={criterio.id} style={styles.criterioItem}>
            <View style={styles.criterioInfo}>
              <Icon name={criterio.icon} size={24} color="#6b46c1" />
              <Text style={styles.criterioNome}>{criterio.nome}</Text>
            </View>
            <View style={styles.criterioNota}>
              <View style={styles.estrelas}>
                {renderizarEstrelas(criterio.nota / 2)}
              </View>
              <Text style={styles.notaValue}>{criterio.nota.toFixed(1)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Análise de Defeitos</Text>
        {defeitos.map((defeito) => (
          <View key={defeito.id} style={styles.defeitoItem}>
            <View style={styles.defeitoInfo}>
              <Text style={styles.defeitoNome}>{defeito.nome}</Text>
              <Text style={styles.defeitoLimite}>Limite: {defeito.limite}</Text>
            </View>
            <View style={styles.defeitoQuantidade}>
              <Text style={[
                styles.quantidadeValue,
                defeito.quantidade > defeito.limite && styles.quantidadeExcedida
              ]}>
                {defeito.quantidade}
              </Text>
              {defeito.quantidade <= defeito.limite ? (
                <Icon name="check-circle" size={20} color="#51cf66" />
              ) : (
                <Icon name="error" size={20} color="#ff6b35" />
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nota Final</Text>
        <View style={styles.notaFinalContainer}>
          <View style={styles.notaFinalInfo}>
            <Text style={styles.notaFinalValue}>{calcularNotaFinal()}</Text>
            <Text style={styles.notaFinalLabel}>/ 10.0</Text>
          </View>
          <View style={[styles.classificacao, { backgroundColor: classificacaoAtual.cor }]}>
            <Text style={styles.classificacaoText}>{classificacaoAtual.nome}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Observações</Text>
        <TextInput
          style={styles.observacoesInput}
          multiline
          numberOfLines={4}
          placeholder="Adicione observações sobre a qualidade do café..."
          value={observacoes}
          onChangeText={setObservacoes}
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={salvarAvaliacao}>
          <Icon name="save" size={20} color="#fff" />
          <Text style={styles.buttonText}>Salvar Avaliação</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('DetalhesProcessamento', { lote: dadosLote.nome })}
        >
          <Icon name="arrow-back" size={20} color="#6b46c1" />
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Voltar ao Processamento
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  infoLabel: {
    fontSize: 14,
    color: '#636e72',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '600',
  },
  criterioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  criterioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criterioNome: {
    fontSize: 16,
    color: '#2d3436',
    marginLeft: 12,
  },
  criterioNota: {
    alignItems: 'flex-end',
  },
  estrelas: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  notaValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  defeitoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  defeitoInfo: {
    flex: 1,
  },
  defeitoNome: {
    fontSize: 16,
    color: '#2d3436',
    marginBottom: 2,
  },
  defeitoLimite: {
    fontSize: 12,
    color: '#636e72',
  },
  defeitoQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantidadeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  quantidadeExcedida: {
    color: '#ff6b35',
  },
  notaFinalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notaFinalInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  notaFinalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  notaFinalLabel: {
    fontSize: 18,
    color: '#636e72',
    marginLeft: 4,
  },
  classificacao: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  classificacaoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  observacoesInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2d3436',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6b46c1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6b46c1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#6b46c1',
  },
});

export default QualidadeScreen;
