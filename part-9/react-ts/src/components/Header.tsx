import React from "react";
interface HeaderPropTypes {
  name: string;
}

const Header = ({ name }: HeaderPropTypes): JSX.Element => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Header;
