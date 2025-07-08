import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

export default function CadastroFuncionarioScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { funcionario, isEdit } = route.params || {};

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: funcionario?.nome || '',
    contato: funcionario?.contato || '',
    cargo: funcionario?.cargo || '',
    salario: funcionario?.salario || '',
    dataAdmissao: funcionario?.dataAdmissao || '',
    dataDemissao: funcionario?.dataDemissao || '',
    sexo: funcionario?.sexo || '',
    dataNascimento: funcionario?.dataNascimento || '',
    tipoContrato: funcionario?.tipoContrato || '',
    duracaoContrato: funcionario?.duracaoContrato || '',
    documentos: funcionario?.documentos || '',
    endereco: funcionario?.endereco || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.contato || !formData.cargo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios (Nome, Contato e Cargo).');
      return;
    }

    // Aqui você faria a chamada para a API para salvar os dados
    const action = isEdit ? 'atualizado' : 'cadastrado';
    Alert.alert(
      'Sucesso',
      `Funcionário ${action} com sucesso!`,
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
      'Tem certeza que deseja excluir este funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Funcionário excluído com sucesso!');
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Editar Funcionário' : 'Cadastrar Funcionário'}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="person" size={60} color={COLORS.textSecondary} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          {renderInput('Nome', 'nome', 'Digite o nome completo', true)}
          {renderInput('Contato', 'contato', '(11) 99999-9999', true, 'phone-pad')}
          {renderInput('Cargo', 'cargo', 'Digite o cargo', true)}
          {renderInput('Salário', 'salario', 'R$ 0,00', false, 'numeric')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datas</Text>
          {renderInput('Data de Admissão', 'dataAdmissao', 'DD/MM/AAAA')}
          {renderInput('Data de Demissão', 'dataDemissao', 'DD/MM/AAAA (se aplicável)')}
          {renderInput('Data de Nascimento', 'dataNascimento', 'DD/MM/AAAA')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {renderInput('Sexo', 'sexo', 'Masculino/Feminino/Outro')}
          {renderInput('Tipo de Contrato', 'tipoContrato', 'CLT/Temporário/Terceirizado')}
          {renderInput('Duração do Contrato', 'duracaoContrato', 'Ex: 12 meses')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentos e Endereço</Text>
          {renderInput('Documentos', 'documentos', 'RG, CPF, etc.')}
          {renderInput('Endereço', 'endereco', 'Endereço completo')}
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
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

