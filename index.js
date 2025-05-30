const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

dotenv.config(); // Carrega as variáveis de ambiente do .env

const app = express();
const prisma = new PrismaClient(); // Instancia o Prisma Client
const PORT = process.env.PORT || 4000;

// Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// --- Middlewares Globais ---
// A ordem é importante! CORS e express.json() devem vir antes das suas rotas.

// Habilita o CORS para permitir requisições de diferentes origens (importante para o frontend)
app.use(cors());
// Habilita o parsing de JSON para ler corpos de requisição JSON
app.use(express.json());

// --- Definição de Rotas ---

// Monta as rotas de autenticação sob o caminho raiz
app.use("/", authRoutes);

// Rota de teste simples para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});