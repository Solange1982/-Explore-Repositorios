const express = require('express');
const router = express.Router();
const { redirectToGitHub, handleGitHubCallback } = require('../controllers/authController');

// Inicia o login com GitHub
router.get('/auth/github', redirectToGitHub);

// Recebe o callback do GitHub com o "code"
router.get('/auth/callback', handleGitHubCallback);

module.exports = router;
