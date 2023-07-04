const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log('the error is', error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render('random-beer', { beer: beer[0] });
    })
    .catch(error => console.log('the error is', error));
});

app.get('beers/:id', (req, res) => {
  const beerId = req.params.id;
  punkAPI
    .getBeer(beerId)
    .then(beer => {
      res.render('random_beer', { beer: beer[0] });
    })
    .catch(error => console.log('the error is', error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
