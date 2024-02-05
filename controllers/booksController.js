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

const getAveragePagesPerChapter = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    const totalBooks = data.books.length;

    if (totalBooks === 0) {
      return null;
    }

    const totalPages = data.books.reduce((acc, book) => acc + book.pages, 0);
    const totalChapters = data.books.reduce((acc, book) => acc + book.chapters, 0);

    const averagePagesPerChapter = (totalPages / totalChapters).toFixed(2);

    return {
      totalBooks,
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
  getAveragePagesPerChapter,
};
