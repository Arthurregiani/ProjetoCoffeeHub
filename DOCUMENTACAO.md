# CoffeeHub - Documentação do Projeto

## Visão Geral

O CoffeeHub é um sistema para gestão de produtores, propriedades, talhões, atividades agrícolas, insumos, estoques, monitoramento e produção. O backend foi desenvolvido em Django e Django REST Framework, estruturado em múltiplos apps para facilitar a organização e manutenção do código.

---

## Estrutura do Projeto

- **produtores/**: Gerencia produtores rurais, propriedades e talhões.
- **atividades/**: Gerencia atividades agrícolas e colheitas realizadas nos talhões.
- **insumos/**: Gerencia insumos agrícolas, fertilizantes, agroquímicos e o estoque de insumos nas propriedades.
- **monitoramento/**: Gerencia dados de monitoramento agrícola (ex: sensores, clima, pragas, etc.).
- **producao/**: Gerencia informações sobre a produção agrícola (ex: safras, produtividade, etc.).

Cada app possui os seguintes arquivos principais:

- `models.py`: Define os modelos de dados (tabelas do banco).
- `views.py`: Define as views e endpoints da API.
- `serializers.py`: Define como os dados são convertidos entre Python e JSON.
- `admin.py`: Configura os modelos para o painel administrativo do Django.
- `apps.py`: Configuração do app para o Django.
- `urls.py`: Define as rotas/endpoints do app.
- `tests.py`: Testes automatizados para o app.
- `migrations/`: Arquivos de migração do banco de dados.
- `__init__.py`: Arquivo de inicialização do pacote.

Arquivos gerais do projeto:
- `manage.py`: Utilitário de gerenciamento do Django.
- `requirements.txt`: Dependências do projeto.
- `docker-compose.yml` e `Dockerfile`: Arquivos para containerização e orquestração do projeto.
- `db.sqlite3`: Banco de dados SQLite utilizado no desenvolvimento.

---

## App: produtores

### Arquivos
- `models.py`: Modelos Produtor, Propriedade e Talhao.
- `views.py`: ViewSets para Produtor, Propriedade e Talhao.
- `serializers.py`: Serializadores para os modelos.
- `admin.py`: Registro dos modelos no admin.
- `apps.py`: Configuração do app.
- `urls.py`: Rotas dos endpoints do app.
- `tests.py`: Testes automatizados dos modelos e views.
- `migrations/`: Migrações do banco de dados.
- `__init__.py`: Inicialização do app.

### Modelos
- **Produtor**: Representa um produtor rural, com informações pessoais, contato e status.
- **Propriedade**: Propriedade rural vinculada a um produtor, com dados de localização e área.
- **Talhao**: Área específica dentro de uma propriedade.

### Views
- `ProdutorViewSet`, `PropriedadeViewSet`, `TalhaoViewSet`: CRUD completo para cada modelo.

### Serializers
- Serializadores para cada modelo, convertendo dados entre JSON e objetos Python.

---

## App: atividades

### Arquivos
- `models.py`: Modelos Atividade e Colheita.
- `views.py`: ViewSets para Atividade e Colheita.
- `serializers.py`: Serializadores para os modelos.
- `admin.py`: Registro dos modelos no admin.
- `apps.py`: Configuração do app.
- `urls.py`: Rotas dos endpoints do app.
- `tests.py`: Testes automatizados dos modelos e views.
- `migrations/`: Migrações do banco de dados.
- `__init__.py`: Inicialização do app.

### Modelos
- **Atividade**: Representa uma atividade agrícola (plantio, colheita, adubação, etc.) realizada em um talhão.
- **Colheita**: Detalha informações específicas sobre colheitas.

### Views
- `AtividadeViewSet`, `ColheitaViewSet`: CRUD para atividades e colheitas.

### Serializers
- Serializadores para Atividade e Colheita.

---

## App: insumos

### Arquivos
- `models.py`: Modelos Insumo, Fertilizante, Agroquimico e EstoqueInsumo.
- `views.py`: ViewSets para Insumo, Fertilizante, Agroquimico e EstoqueInsumo.
- `serializers.py`: Serializadores para os modelos.
- `admin.py`: Registro dos modelos no admin.
- `apps.py`: Configuração do app.
- `urls.py`: Rotas dos endpoints do app.
- `tests.py`: Testes automatizados dos modelos e views.
- `migrations/`: Migrações do banco de dados.
- `__init__.py`: Inicialização do app.

### Modelos
- **Insumo**: Insumo agrícola genérico (fertilizante, agroquímico, etc.).
- **Fertilizante**: Detalhes específicos de fertilizantes.
- **Agroquimico**: Detalhes específicos de agroquímicos.
- **EstoqueInsumo**: Controle de estoque de insumos em cada propriedade.

### Views
- `InsumoViewSet`, `FertilizanteViewSet`, `AgroquimicoViewSet`, `EstoqueInsumoViewSet`: CRUD e busca para cada modelo.

### Serializers
- Serializadores para todos os modelos acima.

---

## App: monitoramento

### Arquivos
- `models.py`: Modelos de monitoramento agrícola (ex: sensores, clima, pragas, etc.).
- `views.py`: ViewSets para monitoramento.
- `serializers.py`: Serializadores para os modelos.
- `admin.py`: Registro dos modelos no admin.
- `apps.py`: Configuração do app.
- `urls.py`: Rotas dos endpoints do app.
- `tests.py`: Testes automatizados dos modelos e views.
- `migrations/`: Migrações do banco de dados.
- `__init__.py`: Inicialização do app.

### Modelos
- Modelos para monitoramento de dados agrícolas, como sensores ambientais, pragas, doenças, clima, etc.

### Views
- ViewSets para CRUD e consulta dos dados de monitoramento.

### Serializers
- Serializadores para os modelos de monitoramento.

---

## App: producao

### Arquivos
- `models.py`: Modelos de produção agrícola (ex: safras, produtividade, etc.).
- `views.py`: ViewSets para produção.
- `serializers.py`: Serializadores para os modelos.
- `admin.py`: Registro dos modelos no admin.
- `apps.py`: Configuração do app.
- `urls.py`: Rotas dos endpoints do app.
- `tests.py`: Testes automatizados dos modelos e views.
- `migrations/`: Migrações do banco de dados.
- `__init__.py`: Inicialização do app.

### Modelos
- Modelos para produção agrícola, como safras, produtividade, histórico de produção, etc.

### Views
- ViewSets para CRUD e consulta dos dados de produção.

### Serializers
- Serializadores para os modelos de produção.

---

## Endpoints REST

Cada ViewSet expõe endpoints RESTful padrão para listagem, criação, atualização, deleção e busca (quando aplicável) dos recursos.

Exemplo de endpoints:
- `/produtores/` - Lista e cria produtores
- `/propriedades/` - Lista e cria propriedades
- `/talhoes/` - Lista e cria talhões
- `/atividades/` - Lista e cria atividades
- `/colheitas/` - Lista e cria colheitas
- `/insumos/` - Lista e cria insumos
- `/fertilizantes/` - Lista e cria fertilizantes
- `/agroquimicos/` - Lista e cria agroquímicos
- `/estoques-insumo/` - Lista e cria estoques de insumo
- `/monitoramento/` - Lista e cria dados de monitoramento
- `/producao/` - Lista e cria dados de produção

---

## Observações

- Todos os modelos possuem campos de data de cadastro/atualização para controle de histórico.
- Os filtros de busca estão disponíveis em alguns endpoints (ex: busca por nome de insumo, tipo, etc.).
- O projeto utiliza Django REST Framework para facilitar a criação de APIs RESTful.

---

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Minha nova feature'`
4. Faça push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## Contato

Dúvidas ou sugestões? Entre em contato com o responsável pelo projeto.
