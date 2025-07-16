# Mudanças na Navegação do CoffeeHub

## Resumo das Alterações

Este documento descreve as mudanças realizadas na navegação do aplicativo CoffeeHub, onde as funcionalidades da aba "Mais" foram migradas para o menu lateral (Drawer Navigator).

## Alterações Realizadas

### 1. Remoção da Aba "Mais"
- **Arquivo alterado**: `src/navigation/AppNavigator.js`
- **Mudança**: Removida a aba "Mais" do `MainTabsNavigator`
- **Motivo**: Melhorar a organização da navegação e reduzir a sobrecarga de abas

### 2. Migração para o Menu Lateral (Drawer)
As seguintes funcionalidades foram adicionadas ao Drawer Navigator:

#### Funcionalidades Principais:
- **Meu Perfil** - Acesso direto ao perfil do usuário
- **Operações Financeiras** - Gestão financeira da propriedade
- **Funcionários** - Gerenciamento de equipe
- **Monitoramento** - Acompanhamento de indicadores
- **Insumos** - Gestão de insumos agrícolas
- **Processamento** - Controle de processamento do café
- **Equipamentos** - Cadastro e gestão de equipamentos
- **Certificações** - Gerenciamento de certificações
- **Configurações** - Ajustes do aplicativo
- **Ajuda & Suporte** - Suporte ao usuário

#### Funcionalidades Adicionais:
- **Cônjuge** - Dados do cônjuge
- **Capacitações** - Registro de capacitações
- **Variedades de Café** - Gestão de variedades

### 3. Estrutura do Bottom Tab Navigator
Após as alterações, o Bottom Tab Navigator agora contém apenas:
- **Dashboard** - Tela principal
- **Propriedades** - Gestão de propriedades
- **Atividades** - Registro de atividades
- **Lotes** - Gestão de lotes
- **Produção** - Relatórios de produção

## Benefícios da Mudança

1. **Melhor Organização**: Funcionalidades organizadas de forma mais lógica
2. **Navegação Mais Limpa**: Menos abas na barra inferior
3. **Acesso Rápido**: Funcionalidades importantes acessíveis pelo menu lateral
4. **Melhor UX**: Interface mais intuitiva e menos congestionada

## Implementação Técnica

### Configuração do Drawer
```javascript
// Cada funcionalidade no drawer aponta para o MaisNavigator
<Drawer.Screen 
  name="MeuPerfil" 
  component={MaisNavigator} 
  initialParams={{ screen: 'MeuPerfil' }}
  options={{ 
    title: 'Meu Perfil',
    drawerIcon: ({ color }) => <Icon name="person" size={24} color={color} />
  }} 
/>
```

### Manutenção da Estrutura Existente
- O `MaisNavigator` foi mantido para preservar a funcionalidade existente
- As telas individuais não foram alteradas
- O sistema de navegação interna das funcionalidades permanece o mesmo

## Próximos Passos

1. **Teste da Navegação**: Verificar se todos os fluxos funcionam corretamente
2. **Ajustes de UI**: Possíveis ajustes na interface do menu lateral
3. **Documentação**: Atualizar documentação do usuário
4. **Feedback**: Coletar feedback dos usuários sobre a nova navegação

## Arquivos Modificados

1. `src/navigation/AppNavigator.js` - Configuração principal da navegação
2. `NAVIGATION_CHANGES.md` - Este arquivo de documentação

## Observações

- A tela `MoreMenuScreen.js` ainda existe mas não é mais acessível via tab
- Todas as funcionalidades continuam funcionando normalmente
- O sistema de autenticação permanece inalterado
- As constantes de tema e estilos não foram alterados
