const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ShortURL = require('./models/shortURL');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mySecret = process.env['MONGO_URL'];
mongoose.connect(mySecret);

app.get('/', async(req, res) => {
  const shortURLs = await ShortURL.find();
  res.render('index', {shortURLs: shortURLs});
});

app.post('/shortURL', async(req, res) => {
  await ShortURL.create({full: req.body.fullURL});
  res.redirect('/');
});

app.get('/:shortURL', async(req, res) => {
  const shortURL = await ShortURL.findOne({short: req.params.shortURL});
  if(shortURL == null) return res.status(404).send('URL not found');
  res.redirect(shortURL.full);
});


app.listen(3000, () => {
  console.log('server started');
});
