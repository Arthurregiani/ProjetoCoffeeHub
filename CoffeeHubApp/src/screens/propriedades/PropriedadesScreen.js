import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PropertyCard = ({ property, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{property.name}</Text>
    <Text style={styles.cardLocation}>{property.location}</Text>
    <Text style={styles.cardInfo}>Área Total: {property.area} ha</Text>
    <Text style={styles.cardInfo}>Talhões: {property.plots}</Text>
    <Text style={styles.cardInfo}>Produção: {property.production} sacas</Text>
    <Text style={styles.cardStatus}>Status: {property.status}</Text>
  </TouchableOpacity>
);

export default function PropriedadesScreen({ navigation }) {
  const properties = [
    { id: '1', name: 'Fazenda Café Imperial', location: 'Minas Gerais', area: 150, plots: 10, production: 5000, status: 'Ativa' },
    { id: '2', name: 'Sítio Recanto Verde', location: 'São Paulo', area: 50, plots: 3, production: 1200, status: 'Ativa' },
    { id: '3', name: 'Chácara do Vovô', location: 'Espírito Santo', area: 20, plots: 2, production: 400, status: 'Inativa' },
  ];

  const handleAddProperty = () => {
    // Navegar para a tela de cadastro de propriedade
    navigation.navigate('PropertyForm', { mode: 'create' });
  };

  const handlePropertyPress = (property) => {
    // Navegar para a tela de detalhes da propriedade
    navigation.navigate('PropertyDetails', { property });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Propriedades</Text>
        <TouchableOpacity onPress={() => console.log('Buscar')}>
          <Icon name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterSortButton} onPress={() => console.log('Filtrar')}>
          <Text style={styles.filterSortButtonText}>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterSortButton} onPress={() => console.log('Ordenar')}>
          <Text style={styles.filterSortButtonText}>Ordenar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PropertyCard property={item} onPress={() => handlePropertyPress(item)} />}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddProperty}>
        <Icon name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: COLORS.lightGray,
  },
  filterSortButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  filterSortButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: COLORS.text,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    elevation: 8,
  },
});
