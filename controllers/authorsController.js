const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

const getAuthors = () => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);
    return data.authors || [];
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    return [];
  }
};

const addAuthor = (newAuthor) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    const authorId = data.authors.length + 1;
    newAuthor.id = authorId;

    data.authors.push(newAuthor);

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

    return authorId;
  } catch (error) {
    console.error('Error adding author:', error.message);
  }
};

module.exports = {
  getAuthors,
  addAuthor,
};
