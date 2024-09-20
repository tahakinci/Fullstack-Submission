import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispach = useDispatch();
  return (
    <>
      <input
        name="filter"
        onChange={(e) => dispach(filterChange(e.target.value))}
      />
    </>
  );
};

export default Filter;
