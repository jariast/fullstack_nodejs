const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/people');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(
  morgan('tiny', {
    skip: (req, res) => req.method === 'POST',
  })
);

morgan.token('type', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :type',
    {
      skip: (req, res) => req.method !== 'POST',
    }
  )
);

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>IDK man</>');
});

app.get('/info', (req, res) => {
  const personsCount = `<p>Phonebook has info for ${persons.length} people</p>`;
  const date = `<p>${new Date()}</p>`;
  res.send(personsCount + date);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post('/api/persons/', (req, res) => {
  console.log('----****POSTING NEW ITEM****----****----****----');
  console.log('Request body: ', req.body);

  const body = req.body;

  if (!body.name) {
    console.log('Missing Name');
    return res.status(400).json({
      error: 'Name missing',
    });
  }

  const isDuplicate = persons.some(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (isDuplicate) {
    console.log('Duplicate Name');
    return res.status(400).json({
      error: 'Name must be unique',
    });
  }

  if (!body.number) {
    console.log('Missing Number');
    return res.status(400).json({
      error: 'Number missing',
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });
  console.log('New Person: ', newPerson);
  console.log('Persons B4 insertion: ', persons);

  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });

  console.log('Persons After insertion: ', persons);
});

app.get('/api/persons/:id', (req, res, next) => {
  console.log('----****Getting by ID****----****----****----');
  // const personId = Number(req.params.id);
  const id = req.params.id;
  console.log('PersonId: ', id);

  const person = Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        console.log('Person not found');
        res.json.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  console.log('----****DELETE****----****----****----');
  const personId = req.params.id;
  console.log('PersonId: ', personId);
  console.log('Persons B4 deletion: ', persons);
  // persons = persons.filter((person) => person.id !== personId);
  Person.findByIdAndRemove(personId)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
  console.log('Persons after deletion: ', persons);
});

const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknowEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log('Error in error handler', error.name);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Wrongly formatted ID' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
