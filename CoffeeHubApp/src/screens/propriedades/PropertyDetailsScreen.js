import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PropertyDetailsScreen({ route, navigation }) {
  const { property } = route.params;

  const handleEdit = () => {
    navigation.navigate('PropertyForm', { property, mode: 'edit' });
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
        <Text style={styles.headerTitle}>{property.name}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="edit" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.image || 'https://via.placeholder.com/300x200' }}
            style={styles.propertyImage}
          />
        </View>

        <View style={styles.tabsContainer}>
          <Text style={styles.tabTitle}>Visão Geral</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nome:</Text>
            <Text style={styles.infoValue}>{property.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Localização:</Text>
            <Text style={styles.infoValue}>{property.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Área Total:</Text>
            <Text style={styles.infoValue}>{property.area} hectares</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número de Talhões:</Text>
            <Text style={styles.infoValue}>{property.plots}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Produção Total:</Text>
            <Text style={styles.infoValue}>{property.production} sacas</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, { color: property.status === 'Ativa' ? COLORS.success : COLORS.error }]}>
              {property.status}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Talhões</Text>
          <View style={styles.talhoesContainer}>
            {property.talhoes?.map((talhao, index) => (
              <View key={index} style={styles.talhaoCard}>
                <Text style={styles.talhaoTitle}>{talhao.identificador}</Text>
                <Text style={styles.talhaoInfo}>Área: {talhao.area} ha</Text>
                <Text style={styles.talhaoInfo}>Variedade: {talhao.variedade}</Text>
                <Text style={styles.talhaoInfo}>Data de Plantio: {talhao.dataPlantio}</Text>
              </View>
            )) || (
              <Text style={styles.emptyText}>Nenhum talhão cadastrado</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Áreas de Preservação</Text>
          <View style={styles.preservationContainer}>
            {property.areasPreservacao?.map((area, index) => (
              <View key={index} style={styles.preservationCard}>
                <Text style={styles.preservationTitle}>{area.tipo}</Text>
                <Text style={styles.preservationInfo}>Tamanho: {area.tamanho} ha</Text>
                <Text style={styles.preservationInfo}>Status: {area.status}</Text>
              </View>
            )) || (
              <Text style={styles.emptyText}>Nenhuma área de preservação cadastrada</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CAR</Text>
          <View style={styles.carContainer}>
            {property.car ? (
              <View style={styles.carCard}>
                <Text style={styles.carInfo}>Número: {property.car.numero}</Text>
                <Text style={styles.carInfo}>Data de Cadastro: {property.car.dataCadastro}</Text>
                <Text style={styles.carInfo}>Data de Validade: {property.car.dataValidade}</Text>
                {property.car.urlMapa && (
                  <TouchableOpacity style={styles.mapButton}>
                    <Text style={styles.mapButtonText}>Ver Mapa</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Text style={styles.emptyText}>CAR não cadastrado</Text>
            )}
          </View>
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
  imageContainer: {
    height: 200,
    backgroundColor: COLORS.lightGray,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tabsContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    textAlign: 'right',
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
    marginBottom: 12,
  },
  talhoesContainer: {
    gap: 10,
  },
  talhaoCard: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  talhaoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  talhaoInfo: {
    fontSize: 14,
    color: COLORS.gray,
  },
  preservationContainer: {
    gap: 10,
  },
  preservationCard: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  preservationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  preservationInfo: {
    fontSize: 14,
    color: COLORS.gray,
  },
  carContainer: {
    gap: 10,
  },
  carCard: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  carInfo: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  mapButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
});

