const express = require('express');
const router = express.Router();
const { db } = require('../../config/firebase');
const verifyFirebaseToken = require('../../middleware/firebaseAuth');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
});

module.exports = router;
