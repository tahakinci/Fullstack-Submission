import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);

  let validate;

  const addPerson = (e) => {
    e.preventDefault();
    checkInputSingularity();
    if (validate.isSuccess) {
      const newList = [
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ];
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
    let value = e.target.value;
    let regex = new RegExp(value, "i");
    let newArr = persons.filter((a) => regex.test(a.name));
    if (value) {
      setFiltered(newArr);
    } else setFiltered([]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filtered={filtered} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
