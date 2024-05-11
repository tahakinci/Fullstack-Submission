import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <div>
      <h2>Web development curriculum</h2>
      {courses.map((course) => (
        <Content key={course.id} parts={course.parts} header={course.name} />
      ))}
    </div>
  );
};

export default Course;
