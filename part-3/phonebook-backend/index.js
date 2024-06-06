const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

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

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", (req, res) => JSON.stringify(req.body));

const loggerMiddleware = morgan(
  ":method :url :status - :response-time ms - :body"
);
app.use(loggerMiddleware);

//TODO ana sayfaya diğer routelere linkleyecek bir şey yaz

app.get("/info", (req, res) => {
  const html = `
  <div>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  </div>
  `;
  res.send(html);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id == id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id != id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const isNameUnique = persons.some((p) => p.name === body.name);
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }

  if (isNameUnique) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  res.json(person);
});
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 0;

  return maxId;
};

const PORT = 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);
