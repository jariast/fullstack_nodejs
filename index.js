const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
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

const generateRandomId = () => {
  min = Math.ceil(0);
  max = Math.floor(9999999);
  return Math.floor(Math.random() * (max - min)) + min;
};

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
  res.json(persons);
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

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateRandomId(),
    date: new Date(),
  };
  console.log('New Person: ', newPerson);
  console.log('Persons B4 insertion: ', persons);

  persons = persons.concat(newPerson);

  console.log('Persons After insertion: ', persons);

  res.json(newPerson);
});

app.get('/api/persons/:id', (req, res) => {
  console.log('----****Getting by ID****----****----****----');
  const personId = Number(req.params.id);
  console.log('PersonId: ', personId);
  const person = persons.find((person) => person.id === personId);
  console.log('Person: ', person);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  console.log('----****DELETE****----****----****----');
  const personId = Number(req.params.id);
  console.log('PersonId: ', personId);
  console.log('Persons B4 deletion: ', persons);
  persons = persons.filter((person) => person.id !== personId);
  console.log('Persons after deletion: ', persons);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
