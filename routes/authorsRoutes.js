const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.post('/', (req, res) => {
  const newAuthor = req.body;

  const authorId = authorsController.addAuthor(newAuthor);

  res.json({ message: 'Autor agregado con éxito.' });
});

router.get('/', (req, res) => {
  const authors = authorsController.getAuthors();
  res.header('Content-Type', 'application/json');
  res.json(authors);
});

module.exports = router;
