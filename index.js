const express = require('express'),
  morgan = require('morgan');
  
const app = express();

let topMovies = [
  {
    title:'Venom'
  },
  {
    title:'Inception'
  },
  {
    title:'Untouchable'
  },
  {
    title:'Shutter Island'
  },
  {
    title:'Trainspotting'
  },
  {
    title:'Prisoners'
  },
  {
    title:'Gone Girl'
  },
  {
    title:'Spotlight'
  },
  {
    title:'Seven'
  },
  {
    title:'Fight Club'
  }

];

app.use(express.static('public'));

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('This is my top 10 movies list');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// error handling code
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('This app is running on port 8080');
});