const express = require('express');
const router = express.Router();
const { db } = require('../../config/firebase');
const verifyFirebaseToken = require('../../middleware/firebaseAuth');

// ✅ Protegendo rota GET
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).send('Erro ao buscar projetos');
  }
});

// ✅ Protegendo rota POST
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('projects').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).send('Erro ao criar projeto');
  }
});

module.exports = router;