const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const authorsController = require('../controllers/authorsController');

router.post('/', (req, res) => {
  const newBook = req.body;
  const bookId = booksController.addBook(newBook);



  res.json({ message: 'Libro y autores agregados con éxito.', bookId });
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

router.get('/:bookId/averagePagesPerChapter', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const result = booksController.getAveragePagesPerChapterById(bookId);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});



module.exports = router;
