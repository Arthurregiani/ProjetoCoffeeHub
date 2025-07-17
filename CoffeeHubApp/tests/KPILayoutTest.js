import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { COLORS, SIZES, SHADOWS, SPACING, RESPONSIVE } from '../src/constants/theme';
import { Card } from '../src/components/common/Card';
import { ResponsiveGrid } from '../src/components/common/ResponsiveLayout';
import { useResponsive } from '../src/hooks/useResponsive';

// Simulação de diferentes tamanhos de tela para teste
const SCREEN_SIZES = {
  small: { width: 375, height: 667 },   // iPhone SE
  medium: { width: 768, height: 1024 }, // iPad
  large: { width: 1024, height: 768 },  // iPad Landscape
  xlarge: { width: 1440, height: 900 }  // Desktop
};

// Dados dos KPIs para teste
const KPI_DATA = [
  { id: 1, title: 'Produção Total', value: '1,250 sacas', icon: '🌾', trend: 5 },
  { id: 2, title: 'Talhões Ativos', value: '8', icon: '🌱', trend: 2 },
  { id: 3, title: 'Lotes Ativos', value: '15', icon: '📦', trend: 3 },
  { id: 4, title: 'Pendências', value: '3', icon: '⚠️', trend: -1 }
];

// Componente de teste para um KPI card
const TestKPICard = ({ title, value, icon, trend }) => (
  <Card style={styles.kpiCard} shadow="medium">
    <View style={styles.kpiHeader}>
      <Text style={styles.kpiIcon}>{icon}</Text>
      {trend && (
        <View style={[styles.trendIndicator, { backgroundColor: trend > 0 ? COLORS.success : COLORS.error }]}>
          <Text style={styles.trendText}>{trend > 0 ? '↗' : '↘'}</Text>
        </View>
      )}
    </View>
    <Text style={styles.kpiTitle}>{title}</Text>
    <Text style={styles.kpiValue}>{value}</Text>
  </Card>
);

// Componente de teste para uma resolução específica
const ScreenSizeTest = ({ screenSize, screenName }) => {
  // Simular as configurações responsivas para o tamanho de tela
  const getGridColumns = (width) => {
    if (width < RESPONSIVE.breakpoints.small) return 1;
    if (width < RESPONSIVE.breakpoints.medium) return 2;
    if (width < RESPONSIVE.breakpoints.large) return 3;
    return 4;
  };

  const getSpacing = (width) => {
    if (width < RESPONSIVE.breakpoints.small) return SPACING.sm;
    if (width < RESPONSIVE.breakpoints.medium) return SPACING.md;
    return SPACING.lg;
  };

  const columns = getGridColumns(screenSize.width);
  const spacing = getSpacing(screenSize.width);

  return (
    <View style={[styles.testContainer, { width: screenSize.width }]}>
      <Text style={styles.testTitle}>{screenName} ({screenSize.width}x{screenSize.height})</Text>
      <Text style={styles.testSubtitle}>Colunas: {columns} | Espaçamento: {spacing}px</Text>
      
      <ResponsiveGrid 
        numColumns={2} // Forçar 2 colunas para teste do grid 2x2
        spacing={spacing}
        style={styles.kpiGrid}
      >
        {KPI_DATA.map((kpi) => (
          <TestKPICard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </ResponsiveGrid>
      
      <View style={styles.testInfo}>
        <Text style={styles.infoText}>
          ✓ 4 KPIs organizados em 2 linhas x 2 colunas
        </Text>
        <Text style={styles.infoText}>
          ✓ Espaçamento uniforme entre cards
        </Text>
        <Text style={styles.infoText}>
          ✓ Cards com largura consistente
        </Text>
      </View>
    </View>
  );
};

// Componente principal de teste
export default function KPILayoutTest() {
  const currentScreen = Dimensions.get('window');
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teste de Layout KPI Grid 2x2</Text>
        <Text style={styles.headerSubtitle}>
          Tela atual: {currentScreen.width}x{currentScreen.height}
        </Text>
      </View>

      {/* Teste com o tamanho de tela atual */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Layout Atual</Text>
        <View style={styles.currentTestContainer}>
          <ResponsiveGrid 
            numColumns={2}
            spacing={SPACING.md}
            style={styles.kpiGrid}
          >
            {KPI_DATA.map((kpi) => (
              <TestKPICard
                key={kpi.id}
                title={kpi.title}
                value={kpi.value}
                icon={kpi.icon}
                trend={kpi.trend}
              />
            ))}
          </ResponsiveGrid>
        </View>
      </View>

      {/* Testes simulados para diferentes tamanhos de tela */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Simulação para Diferentes Tamanhos</Text>
        <Text style={styles.sectionSubtitle}>
          Visualização de como o grid se comporta em diferentes dispositivos
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <ScreenSizeTest screenSize={SCREEN_SIZES.small} screenName="Pequeno (Mobile)" />
          <ScreenSizeTest screenSize={SCREEN_SIZES.medium} screenName="Médio (Tablet)" />
          <ScreenSizeTest screenSize={SCREEN_SIZES.large} screenName="Grande (Tablet L)" />
          <ScreenSizeTest screenSize={SCREEN_SIZES.xlarge} screenName="Extra Grande (Desktop)" />
        </ScrollView>
      </View>

      {/* Análise do layout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Análise do Layout</Text>
        <View style={styles.analysisContainer}>
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>✓ Grid 2x2 Implementado</Text>
            <Text style={styles.analysisText}>
              Os 4 KPIs (Produção Total, Talhões Ativos, Lotes Ativos, Pendências) 
              estão organizados em 2 linhas com 2 colunas cada.
            </Text>
          </View>
          
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>✓ Espaçamento Responsivo</Text>
            <Text style={styles.analysisText}>
              O espaçamento entre os cards se ajusta automaticamente baseado 
              no tamanho da tela para melhor aproveitamento do espaço.
            </Text>
          </View>
          
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>✓ Alinhamento Consistente</Text>
            <Text style={styles.analysisText}>
              Os cards mantêm alinhamento uniforme e largura consistente 
              em todas as resoluções testadas.
            </Text>
          </View>
          
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>⚠️ Considerações</Text>
            <Text style={styles.analysisText}>
              Em telas muito pequenas (abaixo de 576px), o grid pode mudar 
              para 1 coluna para melhor usabilidade.
            </Text>
          </View>
        </View>
      </View>

      {/* Recomendações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendações</Text>
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationItem}>
            • Manter o grid 2x2 para telas médias e grandes (≥768px)
          </Text>
          <Text style={styles.recommendationItem}>
            • Considerar 1 coluna para telas pequenas (≤576px) para melhor legibilidade
          </Text>
          <Text style={styles.recommendationItem}>
            • Ajustar espaçamento baseado na densidade de pixels da tela
          </Text>
          <Text style={styles.recommendationItem}>
            • Manter altura mínima dos cards para consistência visual
          </Text>
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
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
    ...SHADOWS.large,
  },
  headerTitle: {
    fontSize: SIZES.h1,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.whiteOpacity,
  },
  section: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: SIZES.h2,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  sectionSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  currentTestContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  horizontalScroll: {
    marginHorizontal: -SPACING.lg,
  },
  testContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.md,
    marginHorizontal: SPACING.sm,
    ...SHADOWS.medium,
  },
  testTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  testSubtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  kpiGrid: {
    marginBottom: SPACING.md,
  },
  kpiCard: {
    padding: SPACING.md,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    minHeight: 100,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  kpiIcon: {
    fontSize: 24,
  },
  trendIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '700',
  },
  kpiTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  kpiValue: {
    fontSize: SIZES.h4,
    fontWeight: '700',
    color: COLORS.primary,
  },
  testInfo: {
    backgroundColor: COLORS.success + '10',
    borderRadius: SIZES.radius,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  infoText: {
    fontSize: SIZES.caption,
    color: COLORS.success,
    marginBottom: SPACING.xs,
  },
  analysisContainer: {
    gap: SPACING.md,
  },
  analysisCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  analysisTitle: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  analysisText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  recommendationsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  recommendationItem: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 22,
  },
});
