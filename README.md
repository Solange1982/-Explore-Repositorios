📚 GitHub Repositories App
Aplicação Full Stack que permite ao usuário:

🔍 Pesquisar repositórios públicos de qualquer usuário do GitHub

⭐ Marcar repositórios como favoritos

🔐 Fazer login com GitHub OAuth

➕ Criar repositórios (em breve)

💾 Armazenar favoritos em banco de dados

🛠 Tecnologias Utilizadas
Frontend
React

Vite

Tailwind CSS

Axios

Backend
Node.js

Express

Prisma ORM

PostgreSQL

JWT

GitHub OAuth

🧑‍💻 Como rodar localmente
Pré-requisitos
Node.js e npm instalados

PostgreSQL rodando localmente

Conta no GitHub com um OAuth App criado

1. Clone o repositório

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2. Configure o banco de dados

No arquivo .env no backend:

DATABASE_URL=postgresql://usuario:senha@localhost:5432/nomedobanco
CLIENT_ID=seu_client_id_do_github
CLIENT_SECRET=seu_client_secret_do_github
JWT_SECRET=uma_frase_secreta_segura

3. Instale e rode o backend

cd github-backend
npm install
npx prisma migrate dev --name init
npm run dev
4. Instale e rode o frontend

cd frontend
npm install
npm run dev

🚀 Funcionalidades

🔎 Busca de repositórios	
Pesquisa os repositórios de um usuário GitHub
🔐 Autenticação OAuth	
Login via GitHub com geração de JWT
⭐ Favoritos	
Armazena repositórios favoritos no banco via backend
➕ Criação de repositórios	(Em desenvolvimento)

📄 Licença
Este projeto está sob a licença MIT.