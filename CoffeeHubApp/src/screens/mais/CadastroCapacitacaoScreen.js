import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const tiposCapacitacao = ['Curso', 'Workshop', 'Treinamento', 'Palestra', 'Seminário', 'Outros'];
const opcoesCertificado = ['Sim', 'Não'];

export default function CadastroCapacitacaoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { capacitacao, isEdit } = route.params || {};

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    tipo: capacitacao?.tipo || '',
    nome: capacitacao?.nome || '',
    dataInicio: capacitacao?.dataInicio || '',
    dataFim: capacitacao?.dataFim || '',
    descricao: capacitacao?.descricao || '',
    cargaHoraria: capacitacao?.cargaHoraria?.toString() || '',
    instrutor: capacitacao?.instrutor || '',
    entidadePromotora: capacitacao?.entidadePromotora || '',
    certificado: capacitacao?.certificado || 'Não',
    participante: capacitacao?.participante || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.tipo || !formData.nome || !formData.dataInicio || !formData.participante) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar carga horária se preenchida
    if (formData.cargaHoraria && (isNaN(formData.cargaHoraria) || parseInt(formData.cargaHoraria) <= 0)) {
      Alert.alert('Erro', 'Por favor, insira uma carga horária válida.');
      return;
    }

    // Aqui você faria a chamada para a API para salvar os dados
    const action = isEdit ? 'atualizada' : 'cadastrada';
    Alert.alert(
      'Sucesso',
      `Capacitação ${action} com sucesso!`,
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
      'Tem certeza que deseja excluir esta capacitação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Capacitação excluída com sucesso!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  const renderInput = (label, field, placeholder, required = false, keyboardType = 'default', multiline = false) => (
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
        keyboardType={keyboardType}
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
          {isEdit ? 'Editar Capacitação' : 'Cadastrar Capacitação'}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.capacitacaoIcon}>
            <Icon name="school" size={60} color={COLORS.primary} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Capacitação</Text>
          {renderPicker('Tipo', 'tipo', tiposCapacitacao, true)}
          {renderInput('Nome', 'nome', 'Nome da capacitação', true)}
          {renderInput('Data de Início', 'dataInicio', 'DD/MM/AAAA', true)}
          {renderInput('Data de Fim', 'dataFim', 'DD/MM/AAAA (se aplicável)')}
          {renderInput('Carga Horária', 'cargaHoraria', 'Horas', false, 'numeric')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes</Text>
          {renderInput('Descrição', 'descricao', 'Descrição da capacitação', false, 'default', true)}
          {renderInput('Instrutor', 'instrutor', 'Nome do instrutor')}
          {renderInput('Entidade Promotora', 'entidadePromotora', 'Ex: SEBRAE, SENAR')}
          {renderPicker('Certificado', 'certificado', opcoesCertificado)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participante</Text>
          {renderInput('Participante', 'participante', 'Nome do participante', true)}
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
  capacitacaoIcon: {
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

