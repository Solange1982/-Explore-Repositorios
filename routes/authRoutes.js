const express = require('express');
const router = express.Router();
const { redirectToGitHub, handleGitHubCallback } = require('../controllers/authController');

router.get('/auth/github', redirectToGitHub);
router.get('/auth/callback', handleGitHubCallback);

module.exports = router;