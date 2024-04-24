import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  let validate;

  const AddPerson = (e) => {
    e.preventDefault();
    checkInputSingularity();
    if (validate.isSuccess) {
      const newList = [...persons, { name: newName, number: newNumber }];
      setPersons(newList);
      setNewNumber("");
      setNewName("");
    }
    alert(validate.message);
  };

  const checkInputSingularity = () => {
    //TODO aynı numara yazıldığında numaranın güncellenmesini de içeren bir validation yaz.
    const isTaken = persons.some((person) => person.name === newName);
    isTaken
      ? (validate = {
          isSuccess: false,
          message: `${newName} is already added to phonebook`,
        })
      : (validate = {
          isSuccess: true,
          message: `${newName} added successfully`,
        });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    const filteredPeople = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
    console.log(filteredPeople);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input value={filter} onChange={(e) => handleFilter(e)} />
      <h3>add a new</h3>
      <form onSubmit={AddPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
