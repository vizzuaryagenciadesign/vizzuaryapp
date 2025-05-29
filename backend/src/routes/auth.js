const express = require('express');
const router = express.Router();
const { db } = require('../../config/firebase');


// Registrar usuário no Firestore (dados extras)
router.post('/register', async (req, res) => {
  const { uid, nome, tipoConta } = req.body;

  try {
    await db.collection('users').doc(uid).set({
      nome,
      tipoConta,
      criadoEm: new Date()
    });

    res.status(200).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário: ' + error.message });
  }
});

// Buscar dados do usuário autenticado
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const idToken = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const userDoc = await db.collection('users').doc(decoded.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado no Firestore' });
    }

    res.status(200).json({ uid: decoded.uid, ...userDoc.data() });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
});

module.exports = router;
