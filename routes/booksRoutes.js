const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const authorsController = require('../controllers/authorsController');

router.post('/', (req, res) => {
  const newBook = req.body;
  const authorsIds = newBook.authors;
  const bookId = booksController.addBook(newBook);

  if (authorsIds && Array.isArray(authorsIds)) {
    authorsIds.forEach((authorId) => {
      booksController.addBookAuthorRelation(bookId, authorId);
    });
  }

  res.json({ message: 'Libro y autores agregados con éxito.' });
});

router.get('/', (req, res) => {
  const books = booksController.getBooks();
  res.header('Content-Type', 'application/json');
  res.json(books);
});

router.get('/bookAuthorRelations', (req, res) => {
  const bookAuthorRelations = booksController.getBookAuthorRelations();
  res.header('Content-Type', 'application/json');
  res.json(bookAuthorRelations);
});

router.get('/averagePagesPerChapter', (req, res) => {
  const result = booksController.getAveragePagesPerChapter();

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: 'No hay libros para calcular el promedio' });
  }
});


module.exports = router;
