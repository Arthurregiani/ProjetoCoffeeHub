import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView 
} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export default function RegistroColheitaScreen({ navigation }) {
  const [colheita, setColheita] = useState({
    data: '',
    quantidade: '',
    metodo: '',
    talhao: '',
    equipamento: '',
    funcionario: '',
    maturacao: '',
    condicoesClimaticas: '',
    percentualImpurezas: '',
    observacoes: ''
  });

  const handleInputChange = (field, value) => {
    setColheita(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validarCampos = () => {
    if (!colheita.data || !colheita.quantidade || !colheita.talhao) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios: Data, Quantidade e Talhão');
      return false;
    }
    return true;
  };

  const handleRegistrarColheita = () => {
    if (!validarCampos()) return;

    // RF-023: Registrar Colheita vinculada a talhão, operação, equipamento e funcionário
    const colheitaData = {
      ...colheita,
      codigoRastreio: `COL${Date.now()}`,
      dataRegistro: new Date().toISOString()
    };

    // RF-024: Gerar Lote a partir de colheita
    const novoLote = {
      id: Date.now().toString(),
      codigo: `LOTE${Date.now()}`,
      codigoQR: `QR${Date.now()}`,
      dataCriacao: new Date().toISOString().split('T')[0],
      status: 'Criado',
      descricao: `Lote gerado da colheita em ${colheita.talhao}`,
      colheitas: [colheitaData],
      composicao: { origem: [], destino: [] }
    };

    Alert.alert(
      'Sucesso', 
      `Colheita registrada e lote ${novoLote.codigo} gerado com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    console.log('Colheita registrada:', colheitaData);
    console.log('Lote gerado:', novoLote);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Colheita</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Data da Colheita *</Text>
        <TextInput
          style={styles.input}
          value={colheita.data}
          onChangeText={(value) => handleInputChange('data', value)}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Quantidade (sacas) *</Text>
        <TextInput
          style={styles.input}
          value={colheita.quantidade}
          onChangeText={(value) => handleInputChange('quantidade', value)}
          placeholder="Ex: 100"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Método de Colheita</Text>
        <TextInput
          style={styles.input}
          value={colheita.metodo}
          onChangeText={(value) => handleInputChange('metodo', value)}
          placeholder="Manual, Mecânico, Seletivo"
        />

        <Text style={styles.label}>Talhão *</Text>
        <TextInput
          style={styles.input}
          value={colheita.talhao}
          onChangeText={(value) => handleInputChange('talhao', value)}
          placeholder="Ex: Talhão A1"
        />

        <Text style={styles.label}>Equipamento</Text>
        <TextInput
          style={styles.input}
          value={colheita.equipamento}
          onChangeText={(value) => handleInputChange('equipamento', value)}
          placeholder="Ex: Colheitadeira XYZ"
        />

        <Text style={styles.label}>Funcionário Responsável</Text>
        <TextInput
          style={styles.input}
          value={colheita.funcionario}
          onChangeText={(value) => handleInputChange('funcionario', value)}
          placeholder="Nome do funcionário"
        />

        <Text style={styles.label}>Maturação</Text>
        <TextInput
          style={styles.input}
          value={colheita.maturacao}
          onChangeText={(value) => handleInputChange('maturacao', value)}
          placeholder="Verde, Cereja, Passa"
        />

        <Text style={styles.label}>Condições Climáticas</Text>
        <TextInput
          style={styles.input}
          value={colheita.condicoesClimaticas}
          onChangeText={(value) => handleInputChange('condicoesClimaticas', value)}
          placeholder="Ex: Ensolarado, 25°C"
        />

        <Text style={styles.label}>% de Impurezas</Text>
        <TextInput
          style={styles.input}
          value={colheita.percentualImpurezas}
          onChangeText={(value) => handleInputChange('percentualImpurezas', value)}
          placeholder="Ex: 5"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={colheita.observacoes}
          onChangeText={(value) => handleInputChange('observacoes', value)}
          placeholder="Observações adicionais"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegistrarColheita}
        >
          <Text style={styles.buttonText}>Registrar Colheita e Gerar Lote</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: SIZES.margin,
  },
  form: {
    padding: SIZES.padding,
  },
  label: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: 12,
    fontSize: SIZES.body,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontWeight: 'bold',
  },
});
