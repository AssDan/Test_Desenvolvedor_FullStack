# Sistema de Reserva de Salas - Frontend

Interface web moderna desenvolvida em React para o sistema de gerenciamento de reservas de salas de reunião da empresa Banana Ltda.

## 📋 Sobre o Projeto

Este é o frontend do sistema de reserva de salas, desenvolvido como parte de um teste técnico para a posição de Desenvolvedor FullStack. A aplicação oferece uma interface intuitiva e responsiva para gerenciar reservas de salas de reunião, com funcionalidades completas de CRUD e validações em tempo real.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos e acessíveis
- **Lucide React** - Ícones SVG otimizados
- **JavaScript (JSX)** - Linguagem de programação

## ✨ Funcionalidades

### 📋 Listagem de Reservas
- Visualização de todas as reservas em cards organizados
- Informações detalhadas: local, sala, responsável, horário
- Indicadores visuais para café e quantidade de pessoas
- Botões de ação para editar e excluir

### ➕ Criação de Reservas
- Formulário completo com validações
- Campos obrigatórios: Local, Sala, Data/Hora, Responsável
- Opção de solicitar café com quantidade de pessoas
- Campo opcional para descrição da reunião
- Validação de conflito de horários em tempo real

### ✏️ Edição de Reservas
- Formulário pré-preenchido com dados existentes
- Mesmas validações da criação
- Atualização em tempo real na listagem

### 🗑️ Exclusão de Reservas
- Modal de confirmação com detalhes da reserva
- Prevenção de exclusões acidentais
- Feedback visual do processo

### 📱 Design Responsivo
- Interface adaptável para desktop, tablet e mobile
- Componentes otimizados para touch
- Layout flexível e moderno

## 📁 Estrutura do Projeto

```
banana-reservas-frontend/
├── public/
│   └── favicon.ico         # Ícone da aplicação
├── src/
│   ├── components/
│   │   ├── ui/            # Componentes shadcn/ui
│   │   ├── ReservaForm.jsx # Formulário de reserva
│   │   └── ConfirmDialog.jsx # Modal de confirmação
│   ├── assets/            # Recursos estáticos
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos principais
│   ├── main.jsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── package.json          # Dependências e scripts
├── vite.config.js        # Configuração do Vite
├── tailwind.config.js    # Configuração do Tailwind
└── README.md            # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18 ou superior
- pnpm (recomendado) ou npm

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd banana-reservas-frontend
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configure a URL da API**
   
   No arquivo `src/App.jsx`, ajuste a constante `API_BASE_URL`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5001/api'
   ```

4. **Execute a aplicação**
   ```bash
   pnpm run dev --host
   # ou
   npm run dev -- --host
   ```

A aplicação estará disponível em `http://localhost:5173`

## 🎨 Design System

### Cores
- **Primary**: Azul (#2563eb)
- **Secondary**: Cinza (#6b7280)
- **Success**: Verde (#10b981)
- **Danger**: Vermelho (#ef4444)
- **Background**: Cinza claro (#f9fafb)

### Componentes UI
Utilizamos a biblioteca **shadcn/ui** que oferece:
- Componentes acessíveis (ARIA)
- Temas dark/light
- Animações suaves
- Tipografia consistente

### Ícones
- **Lucide React** para ícones consistentes
- Ícones semânticos (Calendar, MapPin, User, Coffee, etc.)
- Tamanhos padronizados (16px, 20px, 24px)

## 🔧 Configuração da API

### Endpoints Utilizados

A aplicação consome os seguintes endpoints da API:

- `GET /api/reservas` - Listar reservas
- `POST /api/reservas` - Criar reserva
- `PUT /api/reservas/{id}` - Atualizar reserva
- `DELETE /api/reservas/{id}` - Excluir reserva

### Tratamento de Erros

- Mensagens de erro amigáveis ao usuário
- Validação de formulários em tempo real
- Feedback visual para operações assíncronas
- Tratamento de erros de rede

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações Mobile
- Layout em coluna única
- Botões otimizados para touch
- Formulários adaptados para telas pequenas
- Navegação simplificada

### Feedback Visual
- Campos com erro destacados em vermelho
- Mensagens de erro específicas
- Ícones de alerta
- Estados de loading durante submissão

## 🚀 Build e Deploy

### Build para Produção
```bash
pnpm run build
# ou
npm run build
```

### Preview da Build
```bash
pnpm run preview
# ou
npm run preview
```

### Deploy
O projeto pode ser deployado em qualquer serviço de hospedagem estática:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🔍 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview da build
pnpm run preview

# Linting
pnpm run lint
```

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Atendidos

1. **Listagem de Reservas**
   - ✅ Botão para cadastrar nova reserva
   - ✅ Listagem com todos os campos (exceto café e quantidade)
   - ✅ Botão de edição em cada registro
   - ✅ Botão de exclusão em cada registro
   - ✅ Modal de confirmação para exclusão

2. **Cadastro e Edição de Reserva**
   - ✅ Local/Filiais (obrigatório)
   - ✅ Sala (obrigatório)
   - ✅ Data e Hora de início (obrigatório)
   - ✅ Data e Hora de fim (obrigatório)
   - ✅ Responsável (obrigatório)
   - ✅ Café com quantidade de pessoas
   - ✅ Descrição opcional

3. **Validações**
   - ✅ Validação de choque de horários
   - ✅ Mensagens de erro informativas
   - ✅ Prevenção de cadastro com conflito

### 🎨 Melhorias Implementadas

- Interface moderna e intuitiva
- Design responsivo para mobile
- Animações e transições suaves
- Feedback visual em tempo real
- Componentes reutilizáveis
- Código bem estruturado e documentado

## 🐛 Problemas Conhecidos

- Pequeno problema com formato de data em alguns browsers (em correção)
- Validação de data no passado pode ser muito restritiva para testes

## 🔮 Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Filtros e busca na listagem
- [ ] Calendário visual para seleção de datas
- [ ] Notificações push
- [ ] Exportação de relatórios
- [ ] Temas personalizáveis
- [ ] Modo offline com sincronização

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

**Nota**: Este é um projeto de demonstração desenvolvido para fins de avaliação técnica, seguindo as melhores práticas de desenvolvimento React e UX/UI modernas.

