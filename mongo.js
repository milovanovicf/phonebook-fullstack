const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Provide password!");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://elonm:${password}@cluster0.omrajbo.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personShecma = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personShecma);

mongoose
  .connect(url)
  .then((result) => {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });
    return person.save();
  })
  .then(() => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
