const { quotes } = require('./data');

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getQuoteById = id => {
  return quotes.find(elem => elem.id === id);
}

const deleteQuoteById = id => {
  const ind = parseInt(id) - 1;
  return quotes.splice(ind, 1);
}
 
module.exports = {
  getRandomElement,
  getQuoteById,
  deleteQuoteById
};
