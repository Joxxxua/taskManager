# TaskManager - Sistema de Gerenciamento de Tarefas com Inteligência Artificial

## 📋 Descrição do Projeto

TaskManager é uma aplicação completa de gerenciamento de tarefas que integra funcionalidades tradicionais de CRUD com recursos avançados de inteligência artificial para melhorar a produtividade e organização.

## ✨ Funcionalidades Principais

### Gerenciamento de Usuários
- Registro de novos usuários
- Autenticação e login
- Recuperação de senha
- Listagem de usuários

### Gerenciamento de Tarefas
- Criação de tarefas
- Listagem de tarefas
- Exclusão de tarefas
- Categorização de tarefas

### Recursos de IA
- Análise inteligente de tarefas
- Sugestão de próximas tarefas prioritárias
- Chat assistente de produtividade
- Melhoria de descrições de tarefas

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- LangChain
- OpenAI

### Autenticação
- Bcrypt (para hash de senhas)
- JWT (para geração de tokens)

### Inteligência Artificial
- LangChain
- OpenAI
- Tavily Search API

## 📦 Pré-requisitos

- Node.js (v16 ou superior)
- MongoDB
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/Joxxxua/taskManager.git
cd taskManager
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3000
JWT_SECRET=sua_chave_secreta_jwt
OPENAI_API_KEY=sua_chave_openai
TAVILY_API_KEY=sua_chave_tavily
```

4. Inicie o servidor
```bash
npm run dev
```

## 🔐 Autenticação

Todas as rotas protegidas requerem um token JWT no header:
```
x-auth-token: seu_token_jwt
```

## 🌐 Endpoints

### Usuários
- `POST /register` - Registrar novo usuário
- `POST /login` - Autenticar usuário
- `POST /forgot-password` - Recuperar senha
- `POST /reset-password` - Redefinir senha

### Tarefas
- `POST /tasks` - Criar nova tarefa
- `GET /tasks` - Listar tarefas
- `DELETE /tasks/:id` - Excluir tarefa

### IA
- `POST /chat` - Interação com assistente de IA
- `POST /analyze-task` - Analisar tarefa

## 📡 Exemplo de Requisição (Postman)

### Criar Tarefa
- **Método**: POST
- **URL**: `http://localhost:5000/tasks`
- **Headers**: 
  - `Content-Type: application/json`
  - `x-auth-token: [seu_token]`
- **Body**:
```json
{
  "title": "Desenvolver frontend",
  "description": "Criar interface do usuário",
  "status": "pendente",
  "dueDate": "2024-07-30"
}
```

## 🤖 Recursos de IA

O TaskManager integra inteligência artificial para:
- Analisar a complexidade das tarefas
- Sugerir priorização
- Oferecer insights sobre gerenciamento de tempo
- Melhorar a descrição e escopo das tarefas

## 🛡️ Segurança

- Senhas criptografadas com Bcrypt
- Tokens JWT para autenticação
- Middleware de autenticação
- Validação de entrada

## 🔍 Próximos Passos

- [ ] Implementar testes unitários
- [ ] Adicionar suporte a subtarefas
- [ ] Implementar notificações
- [ ] Adicionar mais recursos de IA

## 💻 Contribuição

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 📞 Contato

[João Pedro Rodrigues] - [joaopedrosouzarodri@gmail.com]
