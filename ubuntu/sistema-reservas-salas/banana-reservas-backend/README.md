# Sistema de Reserva de Salas - Backend

API RESTful desenvolvida em Python com Flask para gerenciamento de reservas de salas de reunião da empresa Banana Ltda.

## 📋 Sobre o Projeto

Este é o backend do sistema de reserva de salas, desenvolvido como parte de um teste técnico para a posição de Desenvolvedor FullStack. O sistema permite o gerenciamento completo de reservas de salas de reunião, incluindo validação de conflitos de horário e controle de recursos como café.

## 🚀 Tecnologias Utilizadas

- **Python 3.11** - Linguagem de programação
- **Flask 3.1.1** - Framework web minimalista
- **SQLAlchemy** - ORM para manipulação do banco de dados
- **Flask-CORS** - Habilitação de CORS para integração com frontend
- **SQLite** - Banco de dados (desenvolvimento)

## 📁 Estrutura do Projeto

```
banana-reservas-backend/
├── src/
│   ├── models/
│   │   ├── user.py          # Modelo de usuário (template)
│   │   └── reserva.py       # Modelo de reserva
│   ├── routes/
│   │   ├── user.py          # Rotas de usuário (template)
│   │   └── reserva.py       # Rotas de reserva
│   ├── database/
│   │   └── app.db          # Banco de dados SQLite
│   └── main.py             # Ponto de entrada da aplicação
├── venv/                   # Ambiente virtual Python
├── requirements.txt        # Dependências do projeto
└── README.md              # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Python 3.11 ou superior
- pip (gerenciador de pacotes Python)

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd banana-reservas-backend
   ```

2. **Ative o ambiente virtual**
   ```bash
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate     # Windows
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute a aplicação**
   ```bash
   python src/main.py
   ```

A API estará disponível em `http://localhost:5001`

## 📚 Documentação da API

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### 1. Listar Reservas
- **GET** `/reservas`
- **Descrição**: Retorna todas as reservas ordenadas por data de início
- **Resposta**: Array de objetos reserva

#### 2. Criar Reserva
- **POST** `/reservas`
- **Descrição**: Cria uma nova reserva
- **Body**:
  ```json
  {
    "local": "Filial Centro",
    "sala": "Sala de Reunião A",
    "data_inicio": "2025-08-08T09:00:00",
    "data_fim": "2025-08-08T10:00:00",
    "responsavel": "João Silva",
    "cafe": true,
    "quantidade_pessoas": 5,
    "descricao": "Reunião de planejamento"
  }
  ```
- **Validações**:
  - Campos obrigatórios: local, sala, data_inicio, data_fim, responsavel
  - Data de início deve ser anterior à data de fim
  - Não pode haver conflito de horário na mesma sala/local
  - Se café = true, quantidade_pessoas é obrigatória

#### 3. Buscar Reserva
- **GET** `/reservas/{id}`
- **Descrição**: Retorna uma reserva específica
- **Parâmetros**: id (integer) - ID da reserva

#### 4. Atualizar Reserva
- **PUT** `/reservas/{id}`
- **Descrição**: Atualiza uma reserva existente
- **Body**: Mesmo formato do POST
- **Validações**: Mesmas do POST, excluindo a própria reserva da verificação de conflito

#### 5. Excluir Reserva
- **DELETE** `/reservas/{id}`
- **Descrição**: Exclui uma reserva
- **Parâmetros**: id (integer) - ID da reserva

#### 6. Verificar Conflitos
- **POST** `/reservas/conflitos`
- **Descrição**: Verifica conflitos de horário sem criar a reserva
- **Body**:
  ```json
  {
    "local": "Filial Centro",
    "sala": "Sala de Reunião A",
    "data_inicio": "2025-08-08T09:00:00",
    "data_fim": "2025-08-08T10:00:00",
    "reserva_id": 1  // Opcional, para edição
  }
  ```

#### 7. Listar Locais
- **GET** `/locais`
- **Descrição**: Retorna todos os locais únicos das reservas

#### 8. Listar Salas
- **GET** `/salas?local={local}`
- **Descrição**: Retorna todas as salas únicas (opcionalmente filtradas por local)

### Formato de Resposta

#### Sucesso
```json
{
  "mensagem": "Reserva criada com sucesso",
  "reserva": {
    "id": 1,
    "local": "Filial Centro",
    "sala": "Sala de Reunião A",
    "data_inicio": "2025-08-08T09:00:00",
    "data_fim": "2025-08-08T10:00:00",
    "responsavel": "João Silva",
    "cafe": true,
    "quantidade_pessoas": 5,
    "descricao": "Reunião de planejamento",
    "created_at": "2025-08-07T16:44:17.437150",
    "updated_at": "2025-08-07T16:44:17.437155"
  }
}
```

#### Erro
```json
{
  "erro": "Choque de horário detectado",
  "mensagem": "Esta sala já está reservada para este período",
  "conflito": {
    // Dados da reserva conflitante
  }
}
```

## 🔧 Configuração

### Variáveis de Ambiente
- `SECRET_KEY`: Chave secreta para sessões Flask
- `DATABASE_URL`: URL de conexão com o banco de dados (padrão: SQLite local)

### CORS
O CORS está configurado para aceitar requisições de qualquer origem durante o desenvolvimento. Para produção, configure adequadamente as origens permitidas.

## 🧪 Testes

### Testando com curl

```bash
# Listar reservas
curl -X GET http://localhost:5001/api/reservas

# Criar reserva
curl -X POST http://localhost:5001/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "local": "Filial Centro",
    "sala": "Sala A",
    "data_inicio": "2025-08-08T09:00:00",
    "data_fim": "2025-08-08T10:00:00",
    "responsavel": "João Silva",
    "cafe": false
  }'

# Atualizar reserva
curl -X PUT http://localhost:5001/api/reservas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Reunião atualizada"
  }'

# Excluir reserva
curl -X DELETE http://localhost:5001/api/reservas/1
```

## 🏗️ Arquitetura

### Padrões Utilizados
- **Blueprint**: Organização modular das rotas
- **ORM**: SQLAlchemy para abstração do banco de dados
- **Factory Pattern**: Configuração da aplicação Flask
- **RESTful API**: Seguindo convenções REST

### Validações Implementadas
- Validação de campos obrigatórios
- Validação de formato de data/hora
- Validação de conflito de horários
- Validação de regras de negócio (café + quantidade de pessoas)

## 🚀 Deploy

Para deploy em produção:

1. Configure um banco de dados PostgreSQL
2. Defina as variáveis de ambiente apropriadas
3. Use um servidor WSGI como Gunicorn
4. Configure CORS para as origens específicas do frontend

## 👥 Contribuição

Este projeto foi desenvolvido como parte de um teste técnico. Para contribuições:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido como parte do teste técnico para Desenvolvedor FullStack.

**Nota**: Este é um projeto de demonstração desenvolvido para fins de avaliação técnica.

