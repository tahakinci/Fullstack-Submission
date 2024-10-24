import { useState } from "react";
import { CoursePart } from "../App";

interface PartPropTypes {
  course: CoursePart;
}

const Part = ({ course }: PartPropTypes): JSX.Element => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const content = () => {
    switch (course.kind) {
      case "basic":
        return (
          <div>
            <p>
              <b>{course.name}</b> {course.exerciseCount}
            </p>
            {course.description}
          </div>
        );
      case "group":
        return (
          <div>
            <p>
              <b>{course.name}</b> {course.exerciseCount}
            </p>
            <p>Project exercises {course.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p>
              <b>{course.name}</b> {course.exerciseCount}
            </p>
            <p>{course.description}</p>
            <p>{course.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>
              <b>{course.name}</b> {course.exerciseCount}
            </p>
            <p>{course.description}</p>
            <p>required skills: {course.requirements.join(", ")}</p>
          </div>
        );
      default:
        assertNever(course);
        break;
    }
  };
  return <div>{content()}</div>;
};

export default Part;
