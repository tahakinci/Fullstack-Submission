const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
const Person = require("./models/person");

const loggerMiddleware = morgan(
  ":method :url :status - :response-time ms - :body"
);
app.use(loggerMiddleware);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

//TODO ana sayfaya diğer routelere linkleyecek bir şey yaz
app.get("/info", (req, res) => {
  const persons = Person.find({}).then((person) => person);
  const html = `
  <div>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  </div>
  `;
  res.send(html);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => next(e));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((e) => next(e));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  let isNameUnique;
  Person.find({ name: body.name }).then((result) => (isNameUnique = result));

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((returnedPerson) => {
      res.json(returnedPerson);
    })
    .catch((e) => next(e));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((returnedPerson) => res.json(returnedPerson))
    .catch((e) => next(e));
});

const PORT = 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);
