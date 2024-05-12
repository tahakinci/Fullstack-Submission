const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises).reduce((a, b) => a + b);
  return <p>Number of exercises {total} </p>;
};

export default Total;
