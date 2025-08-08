# Sistema de Reserva de Salas - Banana Ltda

## 📋 Visão Geral do Projeto

Sistema completo de gerenciamento de reservas de salas de reunião desenvolvido para a empresa Banana Ltda. O projeto consiste em uma API RESTful em Python/Flask e uma interface web moderna em React, atendendo a todos os requisitos do teste técnico para Desenvolvedor FullStack.

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA COMPLETO                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    HTTP/JSON    ┌─────────────────┐   │
│  │                 │    Requests     │                 │   │
│  │   FRONTEND      │◄──────────────► │    BACKEND      │   │
│  │   (React)       │                 │    (Flask)      │   │
│  │                 │                 │                 │   │
│  │ • Interface UI  │                 │ • API RESTful   │   │
│  │ • Validações    │                 │ • Validações    │   │
│  │ • Responsivo    │                 │ • Banco Dados   │   │
│  └─────────────────┘                 └─────────────────┘   │
│                                              │               │
│                                              ▼               │
│                                      ┌─────────────────┐   │
│                                      │                 │   │
│                                      │   DATABASE      │   │
│                                      │   (SQLite)      │   │
│                                      │                 │   │
│                                      │ • Reservas      │   │
│                                      │ • Usuários      │   │
│                                      └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura dos Projetos

```
projeto-reserva-salas/
├── banana-reservas-backend/     # API Flask
│   ├── src/
│   │   ├── models/             # Modelos de dados
│   │   ├── routes/             # Rotas da API
│   │   ├── database/           # Banco de dados
│   │   └── main.py            # Aplicação principal
│   ├── venv/                  # Ambiente virtual
│   ├── requirements.txt       # Dependências Python
│   └── README.md             # Documentação do backend
│
├── banana-reservas-frontend/   # Interface React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── assets/           # Recursos estáticos
│   │   ├── App.jsx           # Componente principal
│   │   └── main.jsx          # Ponto de entrada
│   ├── package.json          # Dependências Node.js
│   └── README.md            # Documentação do frontend
│
└── PROJETO_COMPLETO.md       # Esta documentação
```

## 🚀 Guia de Execução Completa

### Pré-requisitos

- **Python 3.11+** com pip
- **Node.js 18+** com pnpm/npm
- **Git** para controle de versão

### 1. Configuração do Backend (Flask)

```bash
# Navegar para o diretório do backend
cd banana-reservas-backend

# Ativar ambiente virtual
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Executar servidor (porta 5001)
python src/main.py
```

**✅ Backend rodando em:** `http://localhost:5001`

### 2. Configuração do Frontend (React)

```bash
# Em um novo terminal, navegar para o frontend
cd banana-reservas-frontend

# Instalar dependências
pnpm install  # ou npm install

# Executar servidor de desenvolvimento (porta 5173)
pnpm run dev --host  # ou npm run dev -- --host
```

**✅ Frontend rodando em:** `http://localhost:5173`

### 3. Testando o Sistema

1. **Acesse** `http://localhost:5173` no navegador
2. **Teste as funcionalidades:**
   - Visualizar reservas existentes
   - Criar nova reserva
   - Editar reserva existente
   - Excluir reserva (com confirmação)

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Funcionais Atendidos

1. **Sistema de Listagem**
   - ✅ Botão para cadastrar nova reserva
   - ✅ Listagem completa de reservas
   - ✅ Botões de edição e exclusão
   - ✅ Modal de confirmação para exclusão

2. **Cadastro e Edição**
   - ✅ Local/Filiais (obrigatório)
   - ✅ Sala (obrigatório)
   - ✅ Data e Hora de início/fim (obrigatório)
   - ✅ Responsável (obrigatório)
   - ✅ Opção de café com quantidade de pessoas
   - ✅ Descrição opcional

3. **Validações de Negócio**
   - ✅ Validação de choque de horários
   - ✅ Campos obrigatórios
   - ✅ Validação de datas
   - ✅ Regras de café + quantidade de pessoas

### ✅ Requisitos Não Funcionais Atendidos

1. **Tecnologias**
   - ✅ Sistema web
   - ✅ Backend: Python com Flask
   - ✅ Frontend: React com JavaScript
   - ✅ Banco de dados: SQLite
   - ✅ API RESTful
   - ✅ ORM: SQLAlchemy

2. **Qualidade de Código**
   - ✅ Código organizado e estruturado
   - ✅ Comentários quando necessário
   - ✅ Padrões de projeto aplicados
   - ✅ Separação de responsabilidades

3. **Documentação**
   - ✅ README detalhado para cada projeto
   - ✅ Instruções de instalação e execução
   - ✅ Documentação da API
   - ✅ Justificativas das tecnologias escolhidas

## 🛠️ Tecnologias e Justificativas

### Backend - Python/Flask

**Por que Flask?**
- ✅ **Simplicidade**: Framework minimalista, ideal para APIs
- ✅ **Flexibilidade**: Permite estruturação personalizada
- ✅ **Rapidez de desenvolvimento**: Menos boilerplate
- ✅ **Comunidade**: Vasta documentação e suporte
- ✅ **Escalabilidade**: Fácil de expandir conforme necessário

**Por que SQLAlchemy?**
- ✅ **ORM robusto**: Abstração eficiente do banco de dados
- ✅ **Flexibilidade**: Suporte a múltiplos SGBDs
- ✅ **Produtividade**: Reduz código SQL repetitivo
- ✅ **Segurança**: Proteção contra SQL injection

### Frontend - React

**Por que React?**
- ✅ **Componentização**: Reutilização e manutenibilidade
- ✅ **Ecossistema**: Vasta gama de bibliotecas
- ✅ **Performance**: Virtual DOM e otimizações
- ✅ **Comunidade**: Suporte ativo e documentação
- ✅ **Mercado**: Alta demanda profissional

**Por que Tailwind CSS + shadcn/ui?**
- ✅ **Produtividade**: Desenvolvimento rápido de interfaces
- ✅ **Consistência**: Design system padronizado
- ✅ **Acessibilidade**: Componentes com ARIA
- ✅ **Responsividade**: Mobile-first por padrão
- ✅ **Modernidade**: Tendências atuais de UI/UX

### Banco de Dados - SQLite

**Por que SQLite?**
- ✅ **Simplicidade**: Zero configuração para desenvolvimento
- ✅ **Portabilidade**: Arquivo único, fácil distribuição
- ✅ **Performance**: Adequado para aplicações pequenas/médias
- ✅ **Confiabilidade**: Amplamente testado e estável
- ✅ **Migração**: Fácil mudança para PostgreSQL/MySQL em produção

## 🔧 Configurações de Desenvolvimento

### Variáveis de Ambiente

**Backend (.env)**
```env
SECRET_KEY=sua-chave-secreta-aqui
DATABASE_URL=sqlite:///src/database/app.db
FLASK_ENV=development
```

**Frontend**
```javascript
// src/App.jsx
const API_BASE_URL = 'http://localhost:5001/api'
```

### CORS

O backend está configurado para aceitar requisições de qualquer origem durante desenvolvimento:

```python
# src/main.py
CORS(app, origins="*")
```

**⚠️ Produção**: Configure origens específicas para segurança.

## 🧪 Testes e Validação

### Testes Manuais Realizados

1. **API Backend**
   - ✅ GET /api/reservas - Listagem
   - ✅ POST /api/reservas - Criação
   - ✅ PUT /api/reservas/{id} - Atualização
   - ✅ DELETE /api/reservas/{id} - Exclusão
   - ✅ Validação de conflitos de horário
   - ✅ Tratamento de erros

2. **Interface Frontend**
   - ✅ Listagem responsiva de reservas
   - ✅ Formulário de criação/edição
   - ✅ Modal de confirmação de exclusão
   - ✅ Validações em tempo real
   - ✅ Feedback visual de operações
   - ✅ Responsividade mobile

### Cenários de Teste

```bash
# Teste de conflito de horário
curl -X POST http://localhost:5001/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "local": "Filial Centro",
    "sala": "Sala A",
    "data_inicio": "2025-08-05-18:30:00",
    "data_fim": "2025-08-10-14:30:00",
    "responsavel": "Teste"
  }'
# Deve retornar erro 409 se houver conflito
```

## 🚀 Deploy em Produção

### Backend (Flask)

```bash
# Instalar Gunicorn
pip install gunicorn

# Executar com Gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 src.main:app
```

### Frontend (React)

```bash
# Build para produção
pnpm run build

# Servir arquivos estáticos
# (usar nginx, Apache, ou serviço como Vercel/Netlify)
```

### Banco de Dados

Para produção, migrar para PostgreSQL:

```python
# Atualizar DATABASE_URL
DATABASE_URL = "postgresql://user:pass@localhost/dbname"
```

## 📊 Métricas do Projeto

- **Linhas de código Backend**: ~400 linhas
- **Linhas de código Frontend**: ~600 linhas
- **Componentes React**: 3 principais
- **Endpoints API**: 8 endpoints
- **Cobertura de requisitos**: 100%

## 🎯 Diferenciais Implementados

### Além dos Requisitos

1. **UX/UI Moderna**
   - Design system consistente
   - Animações e transições
   - Feedback visual em tempo real

2. **Validações Avançadas**
   - Validação de conflitos em tempo real
   - Mensagens de erro específicas
   - Prevenção de dados inválidos

3. **Arquitetura Escalável**
   - Código modular e reutilizável
   - Separação clara de responsabilidades
   - Padrões de projeto aplicados

4. **Documentação Completa**
   - READMEs detalhados
   - Documentação da API
   - Guias de instalação e uso

## 🔮 Próximos Passos

### Melhorias Futuras

1. **Autenticação e Autorização**
   - Login de usuários
   - Controle de permissões
   - JWT tokens

2. **Funcionalidades Avançadas**
   - Calendário visual
   - Notificações por email
   - Relatórios e dashboards
   - Filtros e busca avançada

3. **Otimizações**
   - Cache de dados
   - Paginação
   - Lazy loading
   - PWA (Progressive Web App)

4. **Testes Automatizados**
   - Testes unitários (Jest/Pytest)
   - Testes de integração
   - Testes E2E (Cypress)

Este projeto foi desenvolvido como parte do teste técnico para a posição de **Desenvolvedor FullStack**. 

### Informações Técnicas
- **Desenvolvedor**: Assis Daniel
- **Data**: Agosto 2025
- **Versão**: 1.0.0
- **Status**: Completo e funcional

### Repositórios
- **Backend**: (https://github.com/AssDan/Test_Desenvolvedor_FullStack.git)
- **Frontend**: (https://github.com/AssDan/Test_Desenvolvedor_FullStack.git)

---

**🎉 Projeto concluído com sucesso!** Todos os requisitos funcionais e não funcionais foram atendidos, com implementação de funcionalidades extras que demonstram conhecimento avançado em desenvolvimento web moderno.

