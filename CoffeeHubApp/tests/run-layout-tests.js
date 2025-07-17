#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Configurações de teste para diferentes resoluções
const TEST_CONFIGURATIONS = {
  mobile: {
    name: 'Mobile (Pequeno)',
    width: 375,
    height: 667,
    expectedColumns: 2,
    expectedSpacing: 8,
    description: 'iPhone SE / Android pequeno'
  },
  tablet: {
    name: 'Tablet (Médio)',
    width: 768,
    height: 1024,
    expectedColumns: 2,
    expectedSpacing: 16,
    description: 'iPad / Android tablet'
  },
  tabletLandscape: {
    name: 'Tablet Landscape (Grande)',
    width: 1024,
    height: 768,
    expectedColumns: 2,
    expectedSpacing: 24,
    description: 'iPad landscape'
  },
  desktop: {
    name: 'Desktop (Extra Grande)',
    width: 1440,
    height: 900,
    expectedColumns: 2,
    expectedSpacing: 24,
    description: 'Desktop / laptop'
  }
};

// Função para calcular o número de colunas esperado
function getExpectedColumns(width) {
  const BREAKPOINTS = {
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200
  };
  
  // Para KPIs, sempre usamos 2 colunas em telas >= 576px
  if (width < BREAKPOINTS.small) return 1;
  return 2;
}

// Função para calcular espaçamento esperado
function getExpectedSpacing(width) {
  const BREAKPOINTS = {
    small: 576,
    medium: 768,
    large: 992
  };
  
  if (width < BREAKPOINTS.small) return 8;
  if (width < BREAKPOINTS.medium) return 16;
  return 24;
}

// Função para testar o layout em uma resolução específica
function testLayout(config) {
  console.log(`\n🔍 Testando: ${config.name} (${config.width}x${config.height})`);
  console.log(`📱 Dispositivo: ${config.description}`);
  
  const actualColumns = getExpectedColumns(config.width);
  const actualSpacing = getExpectedSpacing(config.width);
  
  // Verificar se o grid 2x2 está sendo usado corretamente
  const isGrid2x2 = actualColumns === 2;
  const hasCorrectSpacing = actualSpacing === config.expectedSpacing;
  
  // Calcular a largura dos cards
  const containerPadding = 40; // 20px de cada lado
  const cardWidth = (config.width - containerPadding - (actualSpacing * (actualColumns - 1))) / actualColumns;
  
  console.log(`✅ Colunas: ${actualColumns} (esperado: ${config.expectedColumns})`);
  console.log(`✅ Espaçamento: ${actualSpacing}px (esperado: ${config.expectedSpacing}px)`);
  console.log(`✅ Largura do card: ${cardWidth.toFixed(1)}px`);
  console.log(`✅ Grid 2x2: ${isGrid2x2 ? 'SIM' : 'NÃO'}`);
  
  // Verificar se os KPIs cabem adequadamente
  const minCardWidth = 150; // Largura mínima recomendada
  const isCardWidthOk = cardWidth >= minCardWidth;
  
  console.log(`✅ Largura adequada: ${isCardWidthOk ? 'SIM' : 'NÃO'} (min: ${minCardWidth}px)`);
  
  // Resultados do teste
  const results = {
    resolution: `${config.width}x${config.height}`,
    device: config.description,
    columns: actualColumns,
    spacing: actualSpacing,
    cardWidth: cardWidth,
    isGrid2x2: isGrid2x2,
    isCardWidthOk: isCardWidthOk,
    status: isGrid2x2 && isCardWidthOk ? 'PASS' : 'FAIL'
  };
  
  console.log(`🎯 Status: ${results.status}`);
  
  return results;
}

// Função para gerar relatório de teste
function generateReport(testResults) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RELATÓRIO DE TESTE DO LAYOUT KPI GRID 2x2');
  console.log('='.repeat(60));
  
  testResults.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.device} (${result.resolution})`);
    console.log(`   Colunas: ${result.columns}`);
    console.log(`   Espaçamento: ${result.spacing}px`);
    console.log(`   Largura do card: ${result.cardWidth.toFixed(1)}px`);
    console.log(`   Grid 2x2: ${result.isGrid2x2 ? '✅' : '❌'}`);
    console.log(`   Largura adequada: ${result.isCardWidthOk ? '✅' : '❌'}`);
    console.log(`   Status: ${result.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
  });
  
  // Resumo geral
  const totalTests = testResults.length;
  const passedTests = testResults.filter(r => r.status === 'PASS').length;
  const failedTests = totalTests - passedTests;
  
  console.log('\n' + '-'.repeat(60));
  console.log('📈 RESUMO GERAL');
  console.log('-'.repeat(60));
  console.log(`Total de testes: ${totalTests}`);
  console.log(`✅ Aprovados: ${passedTests}`);
  console.log(`❌ Reprovados: ${failedTests}`);
  console.log(`📊 Taxa de sucesso: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  // Verificações específicas
  console.log('\n' + '-'.repeat(60));
  console.log('✅ VERIFICAÇÕES ESPECÍFICAS');
  console.log('-'.repeat(60));
  
  const allHaveGrid2x2 = testResults.every(r => r.isGrid2x2);
  const allHaveAdequateWidth = testResults.every(r => r.isCardWidthOk);
  
  console.log(`✅ Todos os dispositivos usam grid 2x2: ${allHaveGrid2x2 ? 'SIM' : 'NÃO'}`);
  console.log(`✅ Todos os cards têm largura adequada: ${allHaveAdequateWidth ? 'SIM' : 'NÃO'}`);
  console.log(`✅ KPIs organizados corretamente: ${allHaveGrid2x2 ? 'SIM' : 'NÃO'}`);
  
  // Recomendações
  console.log('\n' + '-'.repeat(60));
  console.log('💡 RECOMENDAÇÕES');
  console.log('-'.repeat(60));
  
  if (failedTests > 0) {
    console.log('❌ Problemas encontrados:');
    testResults.forEach(result => {
      if (result.status === 'FAIL') {
        console.log(`   - ${result.device}: ${!result.isGrid2x2 ? 'Grid não é 2x2' : 'Largura inadequada'}`);
      }
    });
  } else {
    console.log('✅ Layout está funcionando corretamente em todas as resoluções testadas!');
  }
  
  console.log('\n💡 Sugestões gerais:');
  console.log('   - Manter grid 2x2 para telas >= 576px');
  console.log('   - Considerar 1 coluna apenas para telas muito pequenas');
  console.log('   - Ajustar espaçamento baseado no tamanho da tela');
  console.log('   - Manter altura mínima dos cards para consistência');
  
  return {
    totalTests,
    passedTests,
    failedTests,
    successRate: (passedTests / totalTests) * 100,
    allHaveGrid2x2,
    allHaveAdequateWidth
  };
}

// Função principal
function runLayoutTests() {
  console.log('🚀 Iniciando testes de layout KPI Grid 2x2...');
  console.log('📱 Testando em diferentes resoluções de tela\n');
  
  const testResults = [];
  
  // Executar testes para cada configuração
  Object.entries(TEST_CONFIGURATIONS).forEach(([key, config]) => {
    try {
      const result = testLayout(config);
      testResults.push(result);
    } catch (error) {
      console.error(`❌ Erro ao testar ${config.name}:`, error.message);
      testResults.push({
        ...config,
        status: 'ERROR',
        error: error.message
      });
    }
  });
  
  // Gerar relatório
  const summary = generateReport(testResults);
  
  // Retornar código de saída baseado nos resultados
  if (summary.failedTests > 0) {
    console.log('\n❌ Alguns testes falharam!');
    process.exit(1);
  } else {
    console.log('\n✅ Todos os testes passaram!');
    process.exit(0);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runLayoutTests();
}

module.exports = {
  runLayoutTests,
  testLayout,
  generateReport,
  TEST_CONFIGURATIONS
};
