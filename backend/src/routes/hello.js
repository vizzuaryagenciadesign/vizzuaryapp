const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Olá da API Vizzuary!' });
});

module.exports = router;