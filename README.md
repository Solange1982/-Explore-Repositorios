# 🔍 GitHub Repositories App

Aplicação Full Stack que permite ao usuário:

- 🔎 Pesquisar repositórios públicos de qualquer usuário do GitHub
- 🔐 Fazer login com o GitHub via OAuth
- ⭐ Marcar repositórios como favoritos
- ➕ Criar repositórios (em breve)
- 💾 Armazenar favoritos no banco de dados

---

## 🛠 Tecnologias Utilizadas

### 🔧 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- GitHub OAuth
- Dotenv

### 🎨 Frontend
- React
- Vite
- Tailwind CSS
- Axios

---

## 🚀 Como rodar localmente

### ✅ Pré-requisitos
- Node.js e npm instalados
- PostgreSQL rodando localmente
- Conta no GitHub com um OAuth App criado

### 📥 Clone o projeto

```bash
git clone https://github.com/Solange1982/-Explore-Repositorios
cd github-backend
```

### ⚙️ Configure o arquivo `.env` no backend:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nomedobanco
GITHUB_CLIENT_ID=seu_client_id
GITHUB_CLIENT_SECRET=seu_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/auth/callback
JWT_SECRET=sua_chave_super_secreta
```

### 📦 Instale e rode o backend

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

### 🌐 Rode o frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Funcionalidades

- 🔐 **Login com GitHub OAuth**  
- 🔎 **Busca de repositórios**  
- ⭐ **Favoritar repositórios**  
- 🧩 **Exibição dinâmica com ordenação por estrelas**  
- 📡 **Integração total com backend e frontend local**  

---

## 📌 Observação

Hoje, implementei toda a estrutura de autenticação com GitHub, ajustes no schema do Prisma, comunicação entre frontend e backend, e correções de sintaxe no React.

**E, logo mais, subirei as sugeridas pelo console/problemas. Vai dar certo!** 💪🚀

---

## 📄 Licença

Este projeto está sob a licença MIT.
