import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, SIZES, SHADOWS, SPACING, ACCESSIBILITY } from '../../constants/theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PropertyCard = ({ property, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativa': return COLORS.success;
      case 'Inativa': return COLORS.error;
      case 'Manutenção': return COLORS.warning;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <Card
      onPress={onPress}
      style={styles.propertyCard}
      shadow="medium"
      accessibilityLabel={`Propriedade: ${property.name}`}
      accessibilityHint={`Toque para ver detalhes da propriedade`}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardIcon}>🏡</Text>
          <View style={styles.cardTitleInfo}>
            <Text style={styles.cardTitle}>{property.name}</Text>
            <Text style={styles.cardLocation}>{property.location}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(property.status) }]}>
          <Text style={styles.statusText}>{property.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardStats}>
        <View style={styles.statItem}>
          <Icon name="landscape" size={20} color={COLORS.primary} />
          <Text style={styles.statValue}>{property.area} ha</Text>
          <Text style={styles.statLabel}>Área Total</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="grid-view" size={20} color={COLORS.secondary} />
          <Text style={styles.statValue}>{property.plots}</Text>
          <Text style={styles.statLabel}>Talhões</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="inventory" size={20} color={COLORS.accent} />
          <Text style={styles.statValue}>{property.production}</Text>
          <Text style={styles.statLabel}>Sacas</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.cardAction}>
          <Text style={styles.cardActionText}>Ver detalhes</Text>
          <Icon name="arrow-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Propriedades</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => console.log('Buscar')} 
            accessibilityLabel="Buscar propriedades"
          >
            <Icon name="search" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => console.log('Filtrar')} 
            accessibilityLabel="Filtrar propriedades"
          >
            <Icon name="filter-list" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{properties.length}</Text>
          <Text style={styles.statText}>Propriedades</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{properties.filter(p => p.status === 'Ativa').length}</Text>
          <Text style={styles.statText}>Ativas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{properties.reduce((sum, p) => sum + p.area, 0)}</Text>
          <Text style={styles.statText}>Hectares</Text>
        </View>
      </View>

      {/* Properties List */}
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PropertyCard property={item} onPress={() => handlePropertyPress(item)} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Icon name="domain" size={64} color={COLORS.textSecondary} />
            </View>
            <Text style={styles.emptyText}>Nenhuma propriedade cadastrada</Text>
            <Text style={styles.emptySubtext}>Adicione sua primeira propriedade para começar</Text>
            <Button
              title="Adicionar Propriedade"
              onPress={handleAddProperty}
              style={styles.emptyButton}
              size="small"
            />
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleAddProperty} 
        accessibilityLabel="Adicionar nova propriedade"
        accessibilityRole="button"
      >
        <Icon name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.h1,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  
  // Quick Stats Styles
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statNumber: {
    fontSize: SIZES.h2,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  
  // List Styles
  listContent: {
    padding: SPACING.md,
    paddingBottom: 100, // Space for FAB
  },
  
  // Property Card Styles
  propertyCard: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: SPACING.sm,
  },
  cardTitleInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  cardLocation: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius / 2,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: SIZES.caption,
    color: COLORS.white,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Card Stats Styles
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statValue: {
    fontSize: SIZES.h4,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Card Footer Styles
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  cardActionText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.md,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 24,
  },
  emptyButton: {
    minWidth: 200,
  },
  
  // Floating Action Button
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: SPACING.md,
    bottom: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    ...SHADOWS.large,
  },
});
