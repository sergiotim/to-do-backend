
# To-Do Backend

> API REST para gerenciamento de tarefas (to-do list) com autenticação JWT, construída com NestJS, Prisma e PostgreSQL.

> O frontend para este projeto está disponível em: [https://github.com/sergiotim/toDo](https://github.com/sergiotim/toDo)

## Descrição

Este projeto é uma API backend para um sistema de tarefas, permitindo que usuários se cadastrem, autentiquem e gerenciem suas tarefas pessoais. Utiliza NestJS como framework principal, Prisma ORM para acesso ao banco de dados PostgreSQL e autenticação baseada em JWT.

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação, listagem, atualização de status e remoção de tarefas
- Cada usuário só pode acessar e manipular suas próprias tarefas
- Proteção de rotas com JWT

## Estrutura das principais rotas

### Autenticação

- `POST /auth/register` — Cria um novo usuário
- `POST /auth/login` — Realiza login e retorna um token JWT
- `GET /auth/profile` — Retorna dados do usuário autenticado (requer JWT)

### Tarefas

- `POST /user/task/create` — Cria uma nova tarefa para o usuário autenticado
- `GET /user/task` — Lista todas as tarefas do usuário autenticado
- `PATCH /task/update` — Atualiza o status (concluída/não concluída) de uma tarefa
- `DELETE /task/delete/:id` — Remove uma tarefa pelo ID

## Modelos principais

### User
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}
```

### Task
```prisma
model Task {
  id        String   @id @default(uuid())
  name      String
  isChecked Boolean  @default(false)
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
}
```

## Instalação e uso

```bash
# Instale as dependências
npm install

# Rode as migrations do Prisma (ajuste o DATABASE_URL no .env)
npx prisma migrate deploy

# Inicie o servidor em modo desenvolvimento
npm run start:dev
```


## Tecnologias

- [NestJS](https://nestjs.com/) — Framework Node.js
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) para autenticação

## Observações

- É necessário um banco PostgreSQL configurado e a variável `DATABASE_URL` definida no arquivo `.env`.
- A documentação dos endpoints pode ser facilmente integrada via Swagger (veja decorators `@Api*` no código).

---
Projeto desenvolvido por [sergiotim](https://github.com/sergiotim).
