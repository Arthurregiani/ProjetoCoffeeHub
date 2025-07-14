# Especificação do Sistema Integrado de Rastreabilidade e Gestão para Cafeicultura
# Índice

1. [Introdução](#1-introdução)  
   1.1 [Objetivo](#objetivo)  

2. [Escopo](#2-escopo)  

3. [Definições](#3-definições)  
   3.1 [Cadastro e Estrutura](#31-cadastro-e-estrutura)  
   3.2 [Ciclo e Monitoramento](#32-ciclo-e-monitoramento)  
   3.3 [Recursos](#33-recursos)  
   3.4 [Insumos e Aplicações](#34-insumos-e-aplicações)  
   3.5 [Produção e Processamento](#35-produção-e-processamento)  
   3.6 [Qualidade e Comercialização](#36-qualidade-e-comercialização)  
   3.7 [Controle e Certificações](#37-controle-e-certificações)  
   3.8 [Financeiro e RH](#38-financeiro-e-rh)  

4. [Requisitos Funcionais](#4-requisitos-funcionais)  
   4.1 [Cadastro e Estrutura](#41-cadastro-e-estrutura)  
   4.2 [Ciclo e Monitoramento](#42-ciclo-e-monitoramento)  
   4.3 [Recursos](#43-recursos)  
   4.4 [Insumos e Aplicações](#44-insumos-e-aplicações)  
   4.5 [Produção e Processamento](#45-produção-e-processamento)  
   4.6 [Qualidade e Comercialização](#46-qualidade-e-comercialização)  
   4.7 [Controle e Certificações](#47-controle-e-certificações)  
   4.8 [Financeiro e RH](#48-financeiro-e-rh)  
   4.9 [Relatórios e Rastreabilidade](#49-relatórios-e-rastreabilidade)  

5. [Requisitos Não-Funcionais](#5-requisitos-não-funcionais)  

6. [Integrações](#6-integrações)  

---

## 1. Introdução

### Objetivo
Documentar de forma clara e padronizada os requisitos do Sistema Integrado de Rastreabilidade e Gestão para Cafeicultura, definindo o que o sistema deve oferecer em termos de funcionalidades e restrições.

---

## 2. Escopo

O sistema dará suporte a todo o ciclo da cafeicultura, desde o cadastro de produtores, propriedades e talhões, até a comercialização do café, incluindo:

- **Rastreabilidade completa e multinível (talhão, lote, propriedade)**;
- **Monitoramento fenológico, climático e de insumos**;
- **Controle de produção, processamento e qualidade**;
- **Gestão financeira, de recursos humanos e equipamentos**;
- **Controle de estoque de insumos**;
- **Registro histórico de alterações em talhões**;
- **Rastreabilidade de misturas e divisões de lotes**;
- **Gestão de indicadores de desempenho (KPIs)**;
- **Geração de relatórios e dashboards para tomada de decisão**.

---

## 3. Definições

### 3.1 Cadastro e Estrutura
- **Produtor**: Pessoa física ou jurídica responsável pela produção de café.
- **Cônjuge**: Parceiro(a) do produtor, com dados cadastrais próprios.
- **Propriedade**: Unidade produtiva pertencente a um produtor.
- **Talhão**: Subdivisão da propriedade destinada ao plantio de café.
- **HistoricoTalhao**: Registro de alterações realizadas em um talhão ao longo do tempo.
- **VariedadeCafe**: Tipo específico de café plantado em um talhão.
- **AreaPreservacao**: Área de preservação ambiental dentro da propriedade.
- **CAR**: Cadastro Ambiental Rural, registro público eletrônico obrigatório para imóveis rurais.
- **ProducaoTalhao**: Registro de produção anual por talhão.

### 3.2 Ciclo e Monitoramento
- **CicloFenologico**: Estágios de desenvolvimento da planta de café.
- **Monitoramento**: Registro de observações e medições em campo.
- **Clima**: Registro de condições climáticas.
- **Irrigacao**: Registro de eventos de irrigação.
- **Manejo**: Registro de atividades de manejo da lavoura.

### 3.3 Recursos
- **Equipamento**: Máquinas e implementos utilizados nas operações.
- **EquipeMaoObra**: Grupo de trabalho formado para execução de tarefas.
- **MembroEquipe**: Funcionário participante de uma equipe de trabalho.

### 3.4 Insumos e Aplicações
- **Insumo**: Material utilizado na produção (fertilizantes, agroquímicos, etc.).
- **EstoqueInsumo**: Controle de entrada, saída e saldo de insumos.
- **Aplicacao**: Registro de aplicação de insumos.
- **Fertilizante**: Tipo específico de insumo para nutrição das plantas.
- **Agroquimico**: Tipo específico de insumo para controle de pragas e doenças.

### 3.5 Produção e Processamento
- **Colheita**: Registro da coleta de café.
- **Lote**: Unidade de rastreabilidade do café colhido.
- **RecebimentoMoega**: Registro da chegada do café na unidade de processamento.
- **ProcessamentoCafe**: Registro do processamento do café.
- **EtapaPreparoCafe**: Registro da etapa inicial de preparo do café.
- **EtapaSecagem**: Registro da etapa de secagem do café.
- **EtapaBeneficiamento**: Registro da etapa de beneficiamento do café.
- **Armazenamento**: Registro do armazenamento do café processado.
- **LoteComposicao**: Registro de misturas ou divisões de lotes.

### 3.6 Qualidade e Comercialização
- **ClassificacaoCafe**: Avaliação física do café.
- **PerfilSensorial**: Avaliação sensorial do café.
- **MovimentacaoLote**: Registro de transporte e movimentação de lotes.
- **Comercializacao**: Registro de venda do café.

### 3.7 Controle e Certificações
- **Certificacao**: Registro de certificações obtidas.
- **RastreabilidadeQR**: Código QR para acesso às informações de rastreabilidade.
- **EventoRastreabilidade**: Registro centralizado de eventos de rastreabilidade.
- **EntregaEmbalagens**: Registro de devolução de embalagens de agroquímicos.

### 3.8 Financeiro e RH
- **Operacao**: Registro financeiro de atividades.
- **Funcionario**: Pessoa contratada para trabalhar na produção.
- **Capacitacao**: Registro de treinamentos e capacitações.
- **IndicadorDesempenho**: Definição de métricas e metas de desempenho.
- **MedicaoIndicador**: Registro de medições periódicas dos indicadores.

---

## 4. Requisitos Funcionais

Cada requisito funcional recebe um identificador único (RF-XXX).

### 4.1 Cadastro e Estrutura
- **RF-001**: Cadastrar/editar/excluir Produtor (usuário) (atributos: nome, código, data do cadastro, data de nascimento, telefone, email, identificação (CPF, CNPJ), sexo, endereço estruturado, município, status).
- **RF-002**: Cadastrar/editar/excluir Cônjuge vinculado a um produtor (nome, telefone, CPF, data de nascimento).
- **RF-003**: Cadastrar/editar/excluir Propriedade vinculada a um produtor (nome, localização, geolocalização, altitude média, endereço estruturado, área total, inscrição estadual, número CCIR, tamanho do módulo fiscal, condição de uso da terra, status, data de aquisição).
- **RF-004**: Cadastrar/editar/excluir Talhão vinculado a uma propriedade (identificador, área, altitude, exposição solar, declividade, variedade, finalidade, data de plantio, espaçamento, número de plantas, observações, status).
- **RF-005**: Registrar HistoricoTalhao para manter registro de alterações (data, tipo de alteração, descrição, valores anteriores).
- **RF-006**: Cadastrar/editar/excluir VariedadeCafe (nome, espécie, características, resistência a pragas, origem genética, potencial produtivo).
- **RF-007**: Cadastrar/editar/excluir AreaPreservacao de cada propriedade (tipo, descrição, tamanho, status, indicador de recuperação, data de início de recuperação).
- **RF-008**: Cadastrar/editar/excluir CAR da propriedade (número, data de cadastro, data de validade, áreas específicas, URL do mapa).
- **RF-009**: Registrar ProducaoTalhao anual (ano safra, produção em litros, produtividade em sacas/hectare, produção total anual, observações).

### 4.2 Ciclo e Monitoramento
- **RF-010**: Registrar estágios fenológicos (CicloFenologico) por talhão (data início/fim, ano safra, estágio, observações).
- **RF-011**: Registrar Monitoramento em campo (data, tipo, descrição, código de rastreio), associando a talhão, operação financeira e funcionário responsável.
- **RF-012**: Registrar leituras de Clima (data, temperatura, umidade, precipitação, velocidade e direção do vento, radiação solar) para talhão e/ou propriedade.
- **RF-013**: Registrar eventos de Irrigacao (data, volume, modo, duração, código de rastreio) e associar à operação, equipamento e funcionário.
- **RF-014**: Registrar ações de Manejo (data, tipo, descrição, código de rastreio) e associar à operação, equipamento e funcionário.

### 4.3 Recursos
- **RF-015**: Cadastrar/editar/excluir Equipamento (tipo, identificação, marca, modelo, ano, status, data de aquisição, valor, potência, capacidade, observações).
- **RF-016**: Cadastrar/editar/excluir EquipeMaoObra (nome, descrição, data de formação, líder).
- **RF-017**: Registrar MembroEquipe (data de início, data de fim, função) vinculado a uma equipe e a um funcionário.

### 4.4 Insumos e Aplicações
- **RF-018**: Cadastrar/editar/excluir Insumo (nome, categoria, custo unitário, unidade de medida, código de rastreio, fabricante, datas de fabricação e validade, observações).
- **RF-019**: Registrar EstoqueInsumo (data, quantidade de entrada, quantidade de saída, saldo, lote do fabricante, nota fiscal) vinculado a um insumo e propriedade.
- **RF-020**: Especializar insumo em Fertilizante (tipo, formulação, dosagens, composição NPK, micronutrientes).
- **RF-021**: Especializar insumo em Agroquimico (tipo, descrição, dosagens, carência, princípio ativo, classe toxicológica, registro MAPA).
- **RF-022**: Registrar Aplicacao de insumos (data, quantidade, código de rastreio, condições climáticas, eficácia, observações) vinculada a insumo, talhão/propriedade, operação, equipamento, funcionário e/ou equipe.

### 4.5 Produção e Processamento
- **RF-023**: Registrar Colheita (data, quantidade, método, maturação, código de rastreio, condições climáticas, percentual de impurezas, observações) vinculada a talhão, operação, equipamento e/ou equipe.
- **RF-024**: Gerar Lote a partir de colheita (código, código QR, data de criação, status, descrição).
- **RF-025**: Registrar RecebimentoMoega (data de chegada, quantidade, código de rastreio, observações) vinculado a lote, equipamento e funcionário.
- **RF-026**: Registrar ProcessamentoCafe (data de início, data de fim, tipo de processamento, status, código de rastreio) vinculado a lote, operação e funcionário responsável.
- **RF-027**: Registrar EtapaPreparoCafe (tipo de preparo, datas, percentuais de verde/cereja/boia, tempo de fermentação, temperatura, observações) vinculada a um processamento.
- **RF-028**: Registrar EtapaSecagem (método, datas, umidade inicial/final, temperatura média, tempo em horas, observações) vinculada a um processamento.
- **RF-029**: Registrar EtapaBeneficiamento (datas, umidade, total de sacas, rendimento, observações) vinculada a um processamento.
- **RF-030**: Registrar Armazenamento de lote (data de início, local, quantidade, data final, temperatura, umidade, código de rastreio, observações) vinculado a lote e operação.
- **RF-031**: Registrar LoteComposicao (data, tipo de operação, quantidade, percentual, observações) vinculando lotes de origem e destino.

### 4.6 Qualidade e Comercialização
- **RF-032**: Registrar ClassificacaoCafe de cada lote (data, tipo, peneira, cor, aspecto, umidade, defeitos, observações) vinculada a lote, operação e classificador.
- **RF-033**: Registrar PerfilSensorial (data, metodologia, notas de aroma, sabor, acidez, corpo, etc., pontuação final, notas sensoriais) vinculado a lote, operação e degustador.
- **RF-034**: Registrar MovimentacaoLote (data, origem, destino, transportador, documento, código de rastreio, observações) vinculada a lote e operação.
- **RF-035**: Registrar Comercializacao de lote (data de venda, quantidade, valor unitário, comprador, nota fiscal, código de rastreio, tipo de café, certificações exigidas, observações) vinculada a lote e operação.

### 4.7 Controle e Certificações
- **RF-036**: Cadastrar Certificacao (data de emissão, validade, tipo, entidade, código, requisitos, observações) vinculada a produtor e/ou propriedade.
- **RF-037**: Gerar e consultar RastreabilidadeQR para diferentes níveis (lote, talhão, propriedade) com diferentes níveis de detalhe.
- **RF-038**: Registrar EventoRastreabilidade (data, tipo, código de rastreio, descrição, entidade de origem/destino, IDs) para centralizar eventos de rastreabilidade.
- **RF-039**: Registrar EntregaEmbalagens (data, tipo, quantidade, comprovante, observações) vinculada a produtor.

### 4.8 Financeiro e RH
- **RF-040**: Registrar Operacao financeira (data, tipo, descrição, valor, categoria, forma de pagamento, documento fiscal, observações) para todas as atividades.
- **RF-041**: Cadastrar Funcionario (nome, contato, cargo, salário, data de admissão/demissão, sexo, data de nascimento, tipo e duração de contrato, documentos, endereço) vinculado a produtor.
- **RF-042**: Registrar Capacitacao (tipo, nome, data de início/fim, descrição, carga horária, instrutor, entidade promotora, certificado) vinculada a produtor, funcionário e operação.
- **RF-043**: Cadastrar IndicadorDesempenho (nome, categoria, unidade de medida, descrição, fórmula de cálculo, meta, periodicidade).
- **RF-044**: Registrar MedicaoIndicador (data, período de referência, valor, observações) vinculada a indicador, propriedade e/ou talhão.

### 4.9 Relatórios e Rastreabilidade
- **RF-045**: Gerar relatório de rastreabilidade completo para cada lote, incluindo todas as operações e registros associados (colheita, processamento, classificação, movimentações).
- **RF-046**: Gerar relatório de rastreabilidade para talhões, mostrando histórico completo de produção, manejos e insumos aplicados.
- **RF-047**: Gerar relatório de rastreabilidade para propriedades, incluindo informações ambientais e certificações.
- **RF-048**: Gerar relatório de composição de lotes, mostrando origem e destino em operações de mistura ou divisão.
- **RF-049**: Dashboards gerenciais com indicadores de produção, custos, desempenho sensorial, certificações e KPIs.
- **RF-050**: Gerar relatórios de estoque de insumos com alertas para níveis baixos e produtos próximos do vencimento.

---

## 5. Requisitos Não-Funcionais
- **RNF-001**: Interface responsiva para desktop e mobile, com suporte a operações offline em áreas rurais com sincronização posterior.
- **RNF-002**: Disponibilidade de 99,5% (uptime mensal).
- **RNF-003**: Tempo máximo de resposta de 2s para consultas de rastreio por lote.
- **RNF-004**: Autenticação e controle de acesso (papéis: administrador, produtor, analista, operador, cliente).
- **RNF-005**: Audit trail (todas as alterações devem gravar usuário, data e hora).
- **RNF-006**: Backup automático diário e criptografia de dados sensíveis.
- **RNF-007**: Suporte multilíngue (português e inglês).
- **RNF-008**: Validação de campos e tratamento de erros claros ao usuário.
- **RNF-009**: Escalabilidade para suportar até 10.000 produtores e 100.000 lotes simultaneamente.
- **RNF-010**: Geração de códigos QR para acesso rápido às informações de rastreabilidade.

---

## 6. Integrações

- **INT-001**: Integração com sistemas meteorológicos para obtenção automática de dados climáticos.
- **INT-00**: Integração com sistemas de geolocalização para mapeamento de propriedades e talhões.






