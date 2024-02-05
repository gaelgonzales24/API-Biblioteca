const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/books/bookAuthorRelations', booksRoutes);
app.use('/books/averagePagesPerChapter', booksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
