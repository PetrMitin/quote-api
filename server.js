const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getQuoteById, deleteQuoteById } = require('./utils');

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

//Get all quotes
app.get('/api/quotes', (req, res) => {
    const person = req.query.person;
    if (person) {
        const certainQuotes = quotes.filter(value => value.person === person);
        res.send({quotes: certainQuotes});
    } else {
        res.send({quotes: quotes});
    }
});

//Get random quote
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = {
        quote: getRandomElement(quotes)
    };
    res.send(randomQuote);
});

//Create quote
app.post('/api/quotes', (req, res) => {
    const quote = req.query.quote;
    const person = req.query.person;
    const previousId = quotes[quotes.length - 1].id;
    const intId = parseInt(previousId) + 1;
    if(quote && person) {
        const newQuote = {
            quote: quote,
            person: person,
            id: intId.toString() 
        };
        quotes.push(newQuote);
        console.log(quotes);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});

//Update existing quote by id
app.put('/api/quotes/:id', (req, res) => {
    const person = req.query.person;
    const quote = req.query.quote;
    const id = req.params.id;
    const quoteToUpdate = getQuoteById(id);
    if(quoteToUpdate) {
        quoteToUpdate.person = person ? person : quoteToUpdate.person;
        quoteToUpdate.quote = quote ? quote : quoteToUpdate.quote;
        res.send({quote: quoteToUpdate});
    } else {
        res.status(404).send();
    }
});

//Delete quote
app.delete('/api/quotes/:id', (req, res) => {
    getQuoteById(req.params.id) ? deleteQuoteById(req.params.id) : res.status(404).send();
    res.status(204).send();
});

app.listen(PORT, (req, res) => {
    console.log(`Running on port ${PORT}`);
});

