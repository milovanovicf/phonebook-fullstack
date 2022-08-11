const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(cors());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const html = `
        <p>Phonebook has info for 2 people</p>
        <p>${new Date()}</p>
    `;
  response.send(html);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  person ? response.json(person) : response.status(404).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.name) {
    return response.status(404).json({ error: "content missing" }).end();
  }

  // persons.forEach((person) => {
  //   if (person.name.includes(body.name)) {
  //     return response.status(404).json({ error: "name must be unique" }).end();
  //   }
  // });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
