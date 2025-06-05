const axios = require('axios');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

const redirectToGitHub = (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user`;
  res.redirect(redirectUrl);
};

const handleGitHubCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code não fornecido' });
  }

  try {
    console.log("Código recebido:", code);
    // Trocar code por access_token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: "http://localhost:4000/auth/callback",
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Buscar dados do usuário
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { id: githubId, name, avatar_url } = userResponse.data;

    // Verifica se o usuário já existe no banco
    let user = await prisma.user.findUnique({
      where: { githubId: String(githubId) },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: String(githubId),
          name,
          avatarUrl: avatar_url,
          token: accessToken,
        },
      });
    } else {
      await prisma.user.update({
        where: { githubId: String(githubId) },
        data: { token: accessToken },
      });
    }

    // Criar token JWT
    const jwtToken = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        avatar: user.avatarUrl,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Responde com o token (pode trocar por redirecionamento depois)
    const frontendRedirectUrl = `http://localhost:5173/?token=${jwtToken}`;
res.redirect(frontendRedirectUrl);

  } catch (err) {
  console.error("Erro na autenticação:", err.response?.data || err.message || err);
  res.status(500).json({ error: "Falha na autenticação com GitHub" });
}

  }
;

module.exports = {
  redirectToGitHub,
  handleGitHubCallback,
};