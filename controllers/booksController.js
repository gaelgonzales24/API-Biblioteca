const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

const getBooks = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);
    return data.books || [];
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    return [];
  }
};

const addBook = (newBook) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    const bookId = data.books.length + 1;
    newBook.id = bookId;

    data.books.push(newBook);

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

    return bookId;
  } catch (error) {
    console.error('Error adding book:', error.message);
  }
};

const addBookAuthorRelation = (bookId, authorId) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    data.bookAuthorRelations.push({
      bookId: bookId,
      authorId: authorId,
    });

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error adding book-author relation:', error.message);
  }
};

const getBookAuthorRelations = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    const authorsAndBooks = data.books.map(book => ({
      author: book.nameAuthor,
      book: book.title,
    }));

    return authorsAndBooks || [];
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    return [];
  }
};

module.exports = {
  getBooks,
  addBook,
  addBookAuthorRelation,
  getBookAuthorRelations,
};
