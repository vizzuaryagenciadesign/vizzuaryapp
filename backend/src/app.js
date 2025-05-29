const express = require('express');
const cors = require('cors');
const { db } = require('../config/firebase.js');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// Rota teste Firestore
app.post('/api/test-firestore', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('test').add(data);
    res.status(200).send(`Documento criado com ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send('Erro ao gravar no Firestore: ' + error.message);
  }
});

app.get('/api/test-firestore', async (req, res) => {
  try {
    const snapshot = await db.collection('test').get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).send('Erro ao ler do Firestore: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('API Vizzuary está online');
});

module.exports = app;
