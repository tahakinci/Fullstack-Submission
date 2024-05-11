import Part from "./Part";
import Total from "./Total";

const Content = ({ parts, header }) => {
  return (
    <>
      <h3>{header}</h3>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.name} />
      ))}
      <Total parts={parts} />
    </>
  );
};

export default Content;
