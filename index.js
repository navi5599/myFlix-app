const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  app = express();

let users = [
  {
    id: 1,
    name: "John",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Johanna",
    favoriteMovies: ["Venom"]
  },

]

let movies = [
  {
    "Title":"Venom",
    "Description":"A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.",
    "Genre": {
      "Name":"Action",
      "Description":"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
    },
    "Director": {
      "Name":"Ruben Fleischer",
      "Bio":"Ruben Fleischer was born on October 31, 1974 in Washington, District of Columbia, USA. He is a producer and director, known for Zombieland (2009), Gangster Squad (2013) and Venom (2018). He has been married to Holly Shakoor Fleischer since November 10, 2012."
    },
    "ImageURL":"https://i.postimg.cc/Cxgdf44X/venom.jpg",
    "Year":"2018"
  },
  {
    "Title":"Inception",
    "Description":"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "Genre": {
      "Name":"Sci-Fi",
      "Description":"Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies."
    },
    "Director": {
      "Name":"Christopher Nolan",
      "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
    },
    "ImageURL":"https://i.postimg.cc/d0nz9qcr/inc.webp",
    "Year":"2010"
  },
  {
    "Title":"Untouchable",
    "Description":"A look at the rise and fall of disgraced Hollywood producer Harvey Weinstein featuring interviews with former colleagues and those who accused him of sexual misconduct.",
    "Genre": {
      "Name":"Documentary",
      "Description":"Documentary film, motion picture that shapes and interprets factual material for purposes of education or entertainment. Documentaries have been made in one form or another in nearly every country and have contributed significantly to the development of realism in films."
    },
    "Director": {
      "Name":"Ursula Macfarlene",
      "Bio":"Ursula is an award-winning documentary and drama director and executive producer. Her body of high profile documentaries and docu-dramas showcases her ability to capture truthful and beautifully observed characters, combined with compelling storytelling and visual flair. Whether working with psychiatric patients (Notes From The Inside with James Rhodes), Broadway stars (West Side Stories), hostage-takers (Captive) or established actors (Warwick Davis), she is known for her humane touch, wit and psychological insight.",
    },
    "ImageURL":"https://i.postimg.cc/KYy03CKL/untouch.jpg",
    "Year":"2019"
  },
  {
    "Title":"Shutter Island",
    "Description":"In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
    "Genre": {
      "Name":"Mystery",
      "Description":"A mystery film is a genre of film that revolves around the solution of a problem or a crime. It focuses on the efforts of the detective, private investigator or amateur sleuth to solve the mysterious circumstances of an issue by means of clues, investigation, and clever deduction."
    },
    "Director": {
      "Name":"Martin Charles Scorsese",
      "Bio":"Martin Charles Scorsese was born on November 17, 1942 in Queens, New York City, to Catherine Scorsese (née Cappa) and Charles Scorsese, who both worked in Manhattan's garment district, and whose families both came from Palermo, Sicily. He was raised in the neighborhood of Little Italy, which later provided the inspiration for several of his films. Scorsese earned a B.S. degree in film communications in 1964, followed by an M.A. in the same field in 1966 at New York University's School of Film. During this time, he made numerous prize-winning short films including The Big Shave (1967), and directed his first feature film, Who's That Knocking at My Door (1967).",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/51WNf-jsuYL._AC_.jpg",
    "Year":"2010"
  },
  {
    "Title":"Trainspotting",
    "Description":"Renton, deeply immersed in the Edinburgh drug scene, tries to clean up and get out, despite the allure of the drugs and influence of friends.",
    "Genre": {
      "Name":"Drama",
      "Description":"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between."
    },
    "Director": {
      "Name":"Danny Boyle",
      "Bio":"Daniel Francis Boyle is a British filmmaker, producer and writer from Radcliffe, Greater Manchester. He is known for directing 28 Days Later, 127 Hours, Trainspotting, T2 Trainspotting, Slumdog Millionaire, Millions, Shallow Grave, The Beach, Yesterday and Steve Jobs. He won many awards for Slumdog Milliomaire.",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/71Nclw8LvIL._AC_SY606_.jpg",
    "Year":"1996"
  },
  {
    "Title":"Prisoners",
    "Description":"When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
    "Genre": {
      "Name":"Drama",
      "Description":"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between."
    },
    "Director": {
      "Name":"Denis Villeneuve",
      "Bio":"Denis Villeneuve is a French Canadian film director and writer. He was born in 1967, in Trois-Rivières, Québec, Canada. He started his career as a filmmaker at the National Film Board of Canada. He is best known for his feature films Arrival (2016), Sicario (2015), Prisoners (2013), Enemy (2013), and Incendies (2010).",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/71Gtj0HNMBL._SY679_.jpg",
    "Year":"2013"
  },
  {
    "Title":"Gone Girl",
    "Description":"With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    "Genre": {
      "Name":"Drama",
      "Description":"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between."
    },
    "Director": {
      "Name":"David Fincher",
      "Bio":"David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy.",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/41o5NY8NvKL._AC_.jpg",
    "Year":"2014"
  },
  {
    "Title":"Spotlight",
    "Description":"The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",
    "Genre": {
      "Name":"Biography",
      "Description":"A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used."
    },
    "Director": {
      "Name":"Tom McCarthy",
      "Bio":"Tom McCarthy is an American film director, screenwriter, and actor. He is best known for direct and write The Station Agent (2003), The Visitor (2007), Win Win (2011), and Spotlight (2015), for which he won the Academy Award for Best Original Screenplay, and was nominated for Best Director. ",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/71AV1wsS+0L._AC_SY606_.jpg",
    "Year":"2015"
  },
  {
    "Title":"Seven",
    "Description":"Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    "Genre": {
      "Name":"Crime",
      "Description":"Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection."
    },
    "Director": {
      "Name":"David Fincher",
      "Bio":"David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy.",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/51sxU14xvKL._AC_.jpg",
    "Year":"1995"
  },
  {
    "Title":"Fight Club",
    "Description":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    "Genre": {
      "Name":"Drama",
      "Description":"Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between."
    },
    "Director": {
      "Name":"David Fincher",
      "Bio":"David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy.",
    },
    "ImageURL":"https://m.media-amazon.com/images/I/91uFUdkDTwL._AC_SY679_.jpg",
    "Year":"1999"
  }

];

app.use(bodyParser.json());

app.use(express.static('public')); 

app.use(morgan('common'));

// CREATE
// Add new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('Users need names!');
  }
});

// UPDATE
// Update user name
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id ); //search user by id

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('No such user found!');
  }
});

// CREATE
// Add new movie to favorite movies array
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id ); //search user by id

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to ${user.name}'s array`);
  } else {
    res.status(400).send('No such user found!');
  }
});

// DELETE
// Remove movie from favorite movies array
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id ); //search user by id

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been Removed from ${user.name}'s array`);
  } else {
    res.status(400).send('No such user found!');
  }
});

// DELETE
// Remove user
app.delete('/users/:id/', (req, res) => {
  const { id } = req.params;
  
  let user = users.find( user => user.id == id ); //search user by id

  if (user) {
    users= users.filter( user => user.id != id);
    res.status(200).send(`${user.name}'s account has been deleted!`);
  } else {
    res.status(400).send('No such user found!');
  }
});


// READ
app.get('/', (req, res) => {
  res.send('This is my top 10 movies list');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

// READ
app.get('/movies/:title', (req, res) => {
  const {title} = req.params;
  const movie = movies.find( movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found');
  }
});

// READ
app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found');
  }
});

// READ
app.get('/movies/directors/:directorName', (req, res) => {
  const {directorName} = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found');
  }
});

// error handling code
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('This app is running on port 8080');
});