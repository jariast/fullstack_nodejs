const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0-yyg0j.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model('Person', personSchema);

console.log('Name: ', name);
console.log('NUmber: ', number);
if (name && number) {
  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  });

  person.save().then((result) => {
    console.log(`Added "${name}" with number: ${number} to the DB`);
    mongoose.connection.close();
  });
} else {
  console.log('Phonebook: ');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
      mongoose.connection.close();
    });
  });
}

// const person = new Person({
//   name: 'Arto Hellas',
//   number: 040 - 123456,
//   date: new Date(),
// });

// person.save().then((result) => {
//   console.log('Person saved!');
//   mongoose.connection.close();
// });
