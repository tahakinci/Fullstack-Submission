import { CoursePart } from "../App";
import Part from "./Part";

interface ContentPropTypes {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentPropTypes): JSX.Element => {
  return (
    <div>
      {courses.map((course) => (
        <Part course={course} key={course.name} />
      ))}
    </div>
  );
};

export default Content;
