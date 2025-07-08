import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const tiposOperacao = ['Receita', 'Despesa'];
const categorias = ['Vendas', 'Insumos', 'Manutenção', 'Combustível', 'Mão de Obra', 'Equipamentos', 'Outros'];
const formasPagamento = ['Dinheiro', 'Cartão', 'Transferência', 'PIX', 'Cheque', 'Boleto'];

export default function RegistroOperacaoFinanceiraScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { operacao, isEdit } = route.params || {};

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    data: operacao?.data || '',
    tipo: operacao?.tipo || 'Receita',
    descricao: operacao?.descricao || '',
    valor: operacao?.valor?.toString() || '',
    categoria: operacao?.categoria || '',
    formaPagamento: operacao?.formaPagamento || '',
    documentoFiscal: operacao?.documentoFiscal || '',
    observacoes: operacao?.observacoes || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.data || !formData.descricao || !formData.valor || !formData.categoria) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar se o valor é um número válido
    const valorNumerico = parseFloat(formData.valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    // Aqui você faria a chamada para a API para salvar os dados
    const action = isEdit ? 'atualizada' : 'registrada';
    Alert.alert(
      'Sucesso',
      `Operação financeira ${action} com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta operação financeira?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Operação financeira excluída com sucesso!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  const renderInput = (label, field, placeholder, required = false, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={styles.input}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderPicker = (label, field, options, required = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.pickerContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.pickerOption,
              formData[field] === option && styles.pickerOptionSelected
            ]}
            onPress={() => handleInputChange(field, option)}
          >
            <Text style={[
              styles.pickerOptionText,
              formData[field] === option && styles.pickerOptionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Editar Operação' : 'Registrar Operação'}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          {renderInput('Data', 'data', 'DD/MM/AAAA', true)}
          {renderPicker('Tipo', 'tipo', tiposOperacao, true)}
          {renderInput('Descrição', 'descricao', 'Descreva a operação', true)}
          {renderInput('Valor', 'valor', 'R$ 0,00', true, 'numeric')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorização</Text>
          {renderPicker('Categoria', 'categoria', categorias, true)}
          {renderPicker('Forma de Pagamento', 'formaPagamento', formasPagamento)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentação</Text>
          {renderInput('Documento Fiscal', 'documentoFiscal', 'NF, Recibo, etc.')}
          {renderInput('Observações', 'observacoes', 'Informações adicionais')}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="save" size={24} color={COLORS.background} />
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          {isEdit && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Icon name="delete" size={24} color={COLORS.background} />
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  required: {
    color: COLORS.error || '#e74c3c',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    marginRight: 8,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pickerOptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  pickerOptionTextSelected: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.error || '#e74c3c',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

