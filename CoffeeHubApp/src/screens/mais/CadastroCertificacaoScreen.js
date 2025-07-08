import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const tiposCertificacao = [
  'Orgânico',
  'Fair Trade',
  'Rainforest Alliance',
  'UTZ',
  'C.A.F.E. Practices',
  'Bird Friendly',
  'Shade Grown',
  'Outros'
];

const entidadesCertificadoras = [
  'IBD Certificações',
  'FLO-CERT',
  'Rainforest Alliance',
  'UTZ Certified',
  'SCS Global Services',
  'Control Union',
  'ECOCERT',
  'Outros'
];

export default function CadastroCertificacaoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { certificacao, isEdit } = route.params || {};

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    dataEmissao: certificacao?.dataEmissao || '',
    validade: certificacao?.validade || '',
    tipo: certificacao?.tipo || '',
    entidade: certificacao?.entidade || '',
    codigo: certificacao?.codigo || '',
    requisitos: certificacao?.requisitos || '',
    observacoes: certificacao?.observacoes || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.dataEmissao || !formData.validade || !formData.tipo || !formData.entidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você faria a chamada para a API para salvar os dados
    const action = isEdit ? 'atualizada' : 'cadastrada';
    Alert.alert(
      'Sucesso',
      `Certificação ${action} com sucesso!`,
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
      'Tem certeza que deseja excluir esta certificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Certificação excluída com sucesso!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  const renderInput = (label, field, placeholder, required = false, multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
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
          {isEdit ? 'Editar Certificação' : 'Cadastrar Certificação'}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.certificacaoIcon}>
            <Icon name="verified" size={60} color={COLORS.primary} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Certificação</Text>
          {renderInput('Data de Emissão', 'dataEmissao', 'DD/MM/AAAA', true)}
          {renderInput('Data de Validade', 'validade', 'DD/MM/AAAA', true)}
          {renderPicker('Tipo de Certificação', 'tipo', tiposCertificacao, true)}
          {renderPicker('Entidade Certificadora', 'entidade', entidadesCertificadoras, true)}
          {renderInput('Código da Certificação', 'codigo', 'Ex: ORG-2024-001')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes Adicionais</Text>
          {renderInput('Requisitos', 'requisitos', 'Principais requisitos da certificação', false, true)}
          {renderInput('Observações', 'observacoes', 'Informações adicionais', false, true)}
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  certificacaoIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
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
  textArea: {
    minHeight: 100,
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

