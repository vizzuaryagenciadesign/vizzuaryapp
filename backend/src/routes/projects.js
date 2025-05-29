const express = require('express');
const router = express.Router();
const { db } = require('../../config/firebase');
const verifyFirebaseToken = require('../../middleware/firebaseAuth');

// ✅ GET - Listar projetos
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).send('Erro ao buscar projetos');
  }
});

// ✅ POST - Criar projeto
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.uid; // associa projeto ao usuário autenticado
    const docRef = await db.collection('projects').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).send('Erro ao criar projeto');
  }
});

// ✅ PUT - Editar projeto
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const uid = req.user.uid;

  if (!nome || nome.trim().length < 3) {
    return res.status(400).json({ error: 'Nome inválido' });
  }

  try {
    const docRef = db.collection('projects').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    const project = doc.data();

    if (project.userId !== uid) {
      return res.status(403).json({ error: 'Não autorizado a editar este projeto' });
    }

    await docRef.update({ nome });
    res.status(200).json({ message: 'Projeto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao editar projeto:', error);
    res.status(500).json({ error: 'Erro ao editar projeto' });
  }
});

// ✅ DELETE - Excluir projeto
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  const { id } = req.params;
  const uid = req.user.uid;

  try {
    const docRef = db.collection('projects').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    const project = doc.data();

    if (project.userId !== uid) {
      return res.status(403).json({ error: 'Não autorizado a excluir este projeto' });
    }

    await docRef.delete();
    res.status(200).json({ message: 'Projeto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    res.status(500).json({ error: 'Erro ao excluir projeto' });
  }
});

module.exports = router;