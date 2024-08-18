const Filter = ({ filtered, handleFilter }) => {
  return (
    <>
      Filter: <input type="text" onChange={handleFilter} />
      <ul>
        {filtered.map((person, i) => (
          <li key={i}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Filter;
