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

const getAveragePagesPerChapterById = (bookId) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    const book = data.books.find((book) => book.id === bookId);

    if (!book) {
      return null;
    }

    const averagePagesPerChapter = (book.pages / book.chapters).toFixed(2);

    return {
      bookId: book.id,
      averagePagesPerChapter: averagePagesPerChapter.toString(),
    };
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    return null;
  }
};


module.exports = {
  getBooks,
  addBook,
  getBookAuthorRelations,
  getAveragePagesPerChapterById,
};
