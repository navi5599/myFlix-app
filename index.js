const express = require('express'),
  morgan = require('morgan'),
  path = require('path');

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

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('This is my top 10 movies list');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// get the documentation.html with static-not working!!
//app.use(express.static('public'));

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

// error handling code
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('This app is running on port 8080');
});