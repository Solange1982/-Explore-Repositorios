const axios = require('axios');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

const redirectToGitHub = (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user`;
  return res.redirect(githubAuthUrl);
};

const handleGitHubCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Código não fornecido pelo GitHub.' });
  }

  try {
    // Trocar código por token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Obter informações do usuário
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id: githubId, name, avatar_url } = userResponse.data;

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

    const tokenJWT = jwt.sign(
      { userId: user.id, name: user.name, avatar: user.avatarUrl },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token: tokenJWT });
  } catch (error) {
    console.error('Erro durante autenticação com GitHub:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Falha na autenticação com o GitHub.' });
  }
};

module.exports = {
  redirectToGitHub,
  handleGitHubCallback,
};