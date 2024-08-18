import { useState, useEffect } from "react";
import personService from "../services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Numbers from "./Numbers";
import Notification from "./Natification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const addPerson = (e) => {
    //TODO refactor(validateyi module yap ve kapsamını genişlet)
    e.preventDefault();
    const areInputsUnique = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (!areInputsUnique) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);

        setNotification([`${newName} added successfully`, "success"]);
      });
    } else {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find((p) => p.name == newName);
        personService
          .update(personToUpdate.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== personToUpdate.id ? p : updatedPerson
              )
            );
          });
        setNotification([`Number of ${newName} has been changed`, "success"]);
      }
    }
    setTimeout(() => {
      console.log("here");
      setNotification([]);
    }, 3000);
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, person) => {
    if (!confirm(`Delete ${person} ?`)) {
      return;
    }
    personService
      .remove(id)
      .then((deletedPerson) => {
        console.log(deletePerson);
        const newList = persons.filter((p) => p.id !== deletedPerson.id);
        setPersons(newList);
      })
      .catch(() => {
        setNotification([
          `Information of ${person} has already been removed from server. Please try refresh your page`,
          "error",
        ]);

        setTimeout(() => {
          console.log("here");
          setNotification([]);
        }, 3000);
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
      <Notification message={notification} />
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
