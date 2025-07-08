import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PropertyFormScreen({ route, navigation }) {
  const { property, mode } = route.params || {};
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    name: property?.name || '',
    location: property?.location || '',
    area: property?.area?.toString() || '',
    plots: property?.plots?.toString() || '',
    production: property?.production?.toString() || '',
    status: property?.status || 'Ativa',
    address: property?.address || '',
    altitude: property?.altitude?.toString() || '',
    inscricaoEstadual: property?.inscricaoEstadual || '',
    numeroCCIR: property?.numeroCCIR || '',
    moduloFiscal: property?.moduloFiscal?.toString() || '',
    condicaoUso: property?.condicaoUso || '',
    dataAquisicao: property?.dataAquisicao || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.name || !formData.location || !formData.area) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios: Nome, Localização e Área.');
      return;
    }

    // Aqui você implementaria a lógica para salvar a propriedade
    console.log('Salvando propriedade:', formData);
    
    Alert.alert(
      'Sucesso',
      `Propriedade ${isEdit ? 'atualizada' : 'cadastrada'} com sucesso!`,
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
      'Tem certeza que deseja excluir esta propriedade?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            console.log('Excluindo propriedade:', property.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Editar Propriedade' : 'Cadastrar Propriedade'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome da Propriedade *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Digite o nome da propriedade"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Localização *</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              placeholder="Digite a localização"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Digite o endereço completo"
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Área Total (hectares) *</Text>
            <TextInput
              style={styles.input}
              value={formData.area}
              onChangeText={(value) => handleInputChange('area', value)}
              placeholder="Digite a área em hectares"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altitude Média (metros)</Text>
            <TextInput
              style={styles.input}
              value={formData.altitude}
              onChangeText={(value) => handleInputChange('altitude', value)}
              placeholder="Digite a altitude média"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Legais</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Inscrição Estadual</Text>
            <TextInput
              style={styles.input}
              value={formData.inscricaoEstadual}
              onChangeText={(value) => handleInputChange('inscricaoEstadual', value)}
              placeholder="Digite a inscrição estadual"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número CCIR</Text>
            <TextInput
              style={styles.input}
              value={formData.numeroCCIR}
              onChangeText={(value) => handleInputChange('numeroCCIR', value)}
              placeholder="Digite o número CCIR"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tamanho do Módulo Fiscal</Text>
            <TextInput
              style={styles.input}
              value={formData.moduloFiscal}
              onChangeText={(value) => handleInputChange('moduloFiscal', value)}
              placeholder="Digite o tamanho do módulo fiscal"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Condição de Uso da Terra</Text>
            <TextInput
              style={styles.input}
              value={formData.condicaoUso}
              onChangeText={(value) => handleInputChange('condicaoUso', value)}
              placeholder="Digite a condição de uso"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data de Aquisição</Text>
            <TextInput
              style={styles.input}
              value={formData.dataAquisicao}
              onChangeText={(value) => handleInputChange('dataAquisicao', value)}
              placeholder="DD/MM/AAAA"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                formData.status === 'Ativa' && styles.statusButtonActive
              ]}
              onPress={() => handleInputChange('status', 'Ativa')}
            >
              <Text style={[
                styles.statusButtonText,
                formData.status === 'Ativa' && styles.statusButtonTextActive
              ]}>
                Ativa
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.statusButton,
                formData.status === 'Inativa' && styles.statusButtonActive
              ]}
              onPress={() => handleInputChange('status', 'Inativa')}
            >
              <Text style={[
                styles.statusButtonText,
                formData.status === 'Inativa' && styles.statusButtonTextActive
              ]}>
                Inativa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          {isEdit && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusButtonText: {
    fontSize: 16,
    color: COLORS.text,
  },
  statusButtonTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 16,
    gap: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

