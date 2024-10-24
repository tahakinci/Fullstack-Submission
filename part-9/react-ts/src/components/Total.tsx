interface TotalPropTypes {
  total: number;
}

const Total = ({ total }: TotalPropTypes) => {
  return <div>Number of exercises {total}</div>;
};

export default Total;
