import { useState, useEffect } from "react";
import personService from "../services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  let validate;

  const addPerson = (e) => {
    //TODO refactor(validateyi module yap ve kapsamını genişlet)
    e.preventDefault();
    checkInputSingularity();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (validate.isSuccess) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewNumber("");
        setNewName("");
      });
    } else {
      if (
        !confirm(
          `${newName} ${validate.message}, replace the old number with a new one`
        )
      )
        return;
      const personToUpdate = persons.find((p) => p.name == newName);
      personService
        .update(personToUpdate.id, newPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== personToUpdate.id ? p : updatedPerson))
          );
        });
    }
  };

  const deletePerson = (id, person) => {
    if (!confirm(`Delete ${person} ?`)) {
      return;
    }
    personService.remove(id).then((deletedPerson) => {
      const newList = persons.filter((p) => p.id !== deletedPerson.id);
      setPersons(newList);
    });
  };

  const checkInputSingularity = () => {
    //TODO aynı numara yazıldığında numaranın güncellenmesini veya aynı numara geldiğinde numaranın değişmesi içeren bir validation yaz.
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
      <Numbers persons={persons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
