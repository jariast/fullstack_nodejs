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

app.get('/', (req, res) => {
  res.send('<h1>IDK man</>');
});

app.get('/info', (req, res) => {
  Person.find({})
    .then((persons) => {
      const personsCount = `<p>Phonebook has info for ${persons.length} people</p>`;
      const date = `<p>${new Date()}</p>`;
      res.send(personsCount + date);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.post('/api/persons/', (req, res, next) => {
  console.log('----****POSTING NEW ITEM****----****----****----');
  console.log('Request body: ', req.body);

  const body = req.body;

  if (!body.name) {
    console.log('Missing Name');
    next({ name: 'NameMissing' });
    return;
  }

  if (!body.number) {
    console.log('Missing Number');
    next({ name: 'NumberMissing' });
    return;
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
      console.log('Saved Person: ', newPerson);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  console.log('----****Getting by ID****----****----****----');
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
  Person.findByIdAndRemove(personId)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  console.log('----****PUT****----****----****----');
  console.log('Request body: ', req.body);
  const personId = req.params.id;
  const body = req.body;
  const options = { new: true, runValidators: true };
  Person.findByIdAndUpdate(personId, { number: body.number }, options)
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        next({ name: 'NotFound' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknowEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Wrongly formatted ID' });
  }

  if (error.name === 'NameMissing') {
    return res.status(400).send({ error: 'Name is missing, fix it!' });
  }

  if (error.name === 'NumberMissing') {
    return res.status(400).send({ error: 'Number is missing, fix it!' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  if (error.name === 'NotFound') {
    return res.status(404).send({ error: 'Person no longer exists' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
